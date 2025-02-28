import { parseStringPromise } from "xml2js";

/**
 * Remove namespaces (ex: SOAP-ENV, cwmp) e converte XML para JSON padronizado
 */

export function cleanKeys(obj: any): any {
  if (typeof obj !== "object" || obj === null) return obj;

  return Object.keys(obj).reduce((acc: Record<string, any>, key) => {
    const cleanKey = key.replace(/^.*:/, ""); // Remove namespace (ex: "SOAP-ENV:Body" → "Body")
    acc[cleanKey] = cleanKeys(obj[key]); // Recursão para limpar sub-objetos
    return acc;
  }, {});
}

export async function sanitizeSoapData(
  xml: string
): Promise<Record<string, any>> {
  try {
    // Converte XML para JSON
    const rawJson = await parseStringPromise(xml, { explicitArray: false });

    // Remove namespaces (ex: "SOAP-ENV:Envelope" → "Envelope")
    // Sanitiza o JSON
    return cleanKeys(rawJson);
  } catch (error) {
    console.error("Erro ao converter XML:", error);
    return {};
  }
}

/**
 * Busca um valor dentro do JSON utilizando um caminho especificado, ex: "InternetGatewayDevice.DeviceInfo.HardwareVersion"
 */
export function findValueByPath(obj: Record<string, any>, path: string): any {
  if (typeof obj !== "object" || obj === null) {
    return undefined;
  }

  // Se for um array, procuramos recursivamente em cada item
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const result = findValueByPath(item, path);
      if (result !== undefined) {
        return result;
      }
    }
  }

  // Se for um objeto, procuramos pelo Name que contém o caminho
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Verifica se o "Name" do objeto contém o caminho desejado
      if (obj[key]?.Name === path) {
        return obj[key]?.Value;  // Retorna o valor correspondente ao "Name"
      }

      // Caso contrário, tentamos buscar no valor da chave
      const result = findValueByPath(obj[key], path);
      if (result !== undefined) {
        return result;
      }
    }
  }

  return undefined;
}

export async function extractParameters(xmlString: string) {
  try {
    const result = await parseStringPromise(xmlString, { explicitArray: false });

    // Navega até a lista de parâmetros
    const paramList =
      result["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["cwmp:GetParameterNamesResponse"]["ParameterList"]["ParameterInfoStruct"];

    // Garante que a lista seja um array, mesmo que tenha apenas um elemento
    const paramArray = Array.isArray(paramList) ? paramList : [paramList];
    
    return paramArray.map((param) => [({
      name: param.Name,
      writable: param.Writable === "true" || param.Writable === "1",
    })]);
  } catch (error) {
    console.error("Erro ao processar XML:", error);
    return [];
  }
}
