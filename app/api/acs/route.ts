// import { NextRequest } from "next/server";
// import { parseStringPromise } from "xml2js";

// export async function POST(request: NextRequest) {
//   try {
//     // Obtém o corpo da requisição em formato de texto (XML)
//     const body = await request.text();

//     // Converte o XML para um objeto JSON
//     const xml = await parseStringPromise(body);

//     console.log(xml['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['cwmp:Inform'][0]['ParameterList'][0]['ParameterValueStruct'][5]['Value'][0].$);
//     // Verifica se o XML contém os dados esperados (aqui, estamos buscando o nome do SSID)
//     const ssid = xml['SOAP-ENV:Envelope']?.['SOAP-ENV:Body']?.[0]?.['cwmp:SetParameterValues']?.[0]?.['ParameterList']?.[0]?.['ParameterValueStruct']?.[0]?.['Value']?.[0];

//     // if (!ssid) {
//     //   return new Response(JSON.stringify({ error: "SSID não encontrado no XML" }), {
//     //     status: 400,
//     //     headers: { "content-type": "application/json" },
//     //   });
//     // }

//     // Aqui você pode adicionar a lógica para aplicar a configuração no dispositivo CPE
//     console.log(`Nome da rede Wi-Fi recebido: ${ssid}`);

//     const newSSID = "MinhaNovaRedeWiFi";  // O nome desejado para o SSID

//     // Gera a resposta com a alteração do SSID
//     const responseXML = `
//       <?xml version="1.0" encoding="UTF-8"?>
//       <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
//                          xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/"
//                          xmlns:xsd="http://www.w3.org/2001/XMLSchema"
//                          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
//                          xmlns:cwmp="urn:dslforum-org:cwmp-1-0">
//         <SOAP-ENV:Header/>
//         <SOAP-ENV:Body>
//           <cwmp:SetParameterValuesResponse>
//             <ParameterList>
//               <ParameterValueStruct>
//                 <Name>Device.WiFi.SSID.1.SSID</Name>
//                 <Value xsi:type="xsd:string">${newSSID}</Value>
//               </ParameterValueStruct>
//             </ParameterList>
//           </cwmp:SetParameterValuesResponse>
//         </SOAP-ENV:Body>
//       </SOAP-ENV:Envelope>
//     `;
    
//     // Retorna a resposta SOAP de sucesso
//     return new Response(responseXML, {
//       headers: { "content-type": "application/xml" },
//     });

//   } catch (error) {
//     // Caso ocorra um erro durante o processamento do XML
//     return new Response(JSON.stringify({ error: "Invalid XML" }), {
//       status: 400,
//       headers: { "content-type": "application/json" },
//     });
//   }
// }
