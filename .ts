// // import { parseStringPromise } from "xml2js";

// import { parseStringPromise } from "xml2js";
// import CWMPManager from "@/lib/Node-CWMP/cwmp";
// const cwmp = new CWMPManager();



// // export async function POST(request: Request) {
// //   const body = await request.text();
// //   const xml = await parseStringPromise(body);
// //   console.log(xml);
// //   // console.log(xml['soap-env:Envelope']['soap-env:Header'][0]['cwmp:ID'][0]);
// //   if (xml == (null || undefined)) {
// //     //     const a = `
// //     //     <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
// //     //                   xmlns:cwmp="urn:dslforum-org:cwmp-1-2">
// //     //   <soapenv:Header>
// //     //     <cwmp:ID soapenv:mustUnderstand="1"></cwmp:ID>
// //     //   </soapenv:Header>
// //     //   <soapenv:Body>
// //     //     <cwmp:GetParameterValues>
// //     //       <ParameterNames>
// //     //         <string>InternetGatewayDevice.LANDevice.1.WLANConfiguration.1.SSID</string>
// //     //       </ParameterNames>
// //     //     </cwmp:GetParameterValues>
// //     //   </soapenv:Body>
// //     // </soapenv:Envelope>

// //     //     `;
// //     return Response.json(a, {
// //       status: 200,
// //       headers: { "Content-Type": "text/xml" },
// //     });
// //   }
// //   console.log(
// //     xml["soap-env:Envelope"]["soap-env:Body"][0][
// //       "cwmp:GetParameterValuesResponse"
// //     ]?.[0]["ParameterList"]?.[0]["ParameterValueStruct"]?.[0]["Value"]?.[0]
// //   );
// //   return Response.json("OK", { status: 200 });
// //   // console.log(xml);
// //   // const normalizeKeys = (obj) => {
// //   //   console.log(obj);
// //   //   if (Array.isArray(obj)) {
// //   //     return obj.map(normalizeKeys);
// //   //   } else if (typeof obj === "object" && obj !== null) {
// //   //     return Object.keys(obj).reduce((acc, key) => {
// //   //       acc[key.toLowerCase()] = normalizeKeys(obj[key]);
// //   //       return acc;
// //   //     }, {});
// //   //   }
// //   //   return obj;
// //   // };
// //   // console.log(xml['soap-env:Envelope'])
// //   // if (!xml || typeof xml !== 'object') {
// //   //   throw new Error('Erro ao processar XML: Estrutura inválida');
// //   // }

// //   // const normalizedXml = await normalizeKeys(xml);
// //   // console.log(normalizedXml['soap-env:envelope']['soap-env:body'][0]['cwmp:inform'][0]['parameterlist'][0]['parametervaluestruct'][5]['value'][0].$);
// //   // return new Response(JSON.stringify({ error: "SSID não encontrado no XML" }), {
// //   //   status: 200,
// //   //   headers: { "content-type": "application/json" },
// //   // });
// // }

// // export function GET(req: Request) {
// //   console.log(req);
// // }

// // export function PUT(req: Request) {
// //   console.log(req);
// // }

// // export function DELETE(req: Request) {
// //   console.log(req);
// // }

// // // export async function POST(request: Request) {

// function GetAllParameters() {}

// export async function POST(request: Request) {
//   console.log("AQUI")
//   cwmp.add_task('DEVICE_ID', 'get_param', { param_name: '.' }, (param) => {
//     console.log('Received Parameter:', param);
//   });
//   try {
//     const xmlData = await request.text();
//     const json = await parseStringPromise(xmlData, { explicitArray: false });

//     // Extrair informações básicas do dispositivo
//     const inform = json["SOAP-ENV:Envelope"]["SOAP-ENV:Body"]["cwmp:Inform"];
//     console.log(json["SOAP-ENV:Envelope"]["SOAP-ENV:Header"]["cwmp:ID"]);
//     const serialNumber = inform.DeviceId.SerialNumber;
//     const oui = inform.DeviceId.OUI;
//     const productClass = inform.DeviceId.ProductClass;
//     console.log(inform.ParameterList.ParameterValueStruct);
//     console.log(`Novo Inform recebido - Serial: ${serialNumber}`);
//     const match = xmlData.match(/<cwmp:ID[^>]*>(.*?)<\/cwmp:ID>/);
//     const cwmpID = match ? match[1] : "0";
//     // Responder corretamente para o CPE continuar o fluxo
//     const responseXml = `
//       <?xml version="1.0" encoding="UTF-8"?>
//     <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
//         xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/"
//         xmlns:xsd="http://www.w3.org/2001/XMLSchema"
//         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
//         xmlns:cwmp="urn:dslforum-org:cwmp-1-0">
//         <SOAP-ENV:Header>
//             <cwmp:ID SOAP-ENV:mustUnderstand="1">${cwmpID}</cwmp:ID>
//         </SOAP-ENV:Header>
//         <SOAP-ENV:Body>
//             <cwmp:InformResponse>
//                 <MaxEnvelopes>1</MaxEnvelopes>
//             </cwmp:InformResponse>
//         </SOAP-ENV:Body>
//     </SOAP-ENV:Envelope>
//             `;

//     return Response.json(responseXml, {
//       status: 200,
//       headers: { "Content-Type": "text/xml" },
//     });
//   } catch (error) {
//     console.error("Erro ao processar SOAP:", error);
//     return Response.json("Erro ao processar SOAP", { status: 500 });
//   }
//   // const body = await request.text();
//   // const xml = await parseStringPromise(body);
//   // console.log(xml['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['cwmp:Inform'][0]['ParameterList'][0]['$']);
//   // const soap = `
//   // <SOAP-ENV:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cwmp="urn:dslforum-org:cwmp-1-2">
//   //   <SOAP-ENV:Header>
//   //     <cwmp:ID SOAP-ENV:mustUnderstand="1">37</cwmp:ID>
//   //   </SOAP-ENV:Header>
//   //   <SOAP-ENV:Body>
//   //     <cwmp:GetParameterValues>
//   //       <ParameterNames>
//   //         <string>.</string>
//   //       </ParameterNames>
//   //     </cwmp:GetParameterValues>
//   //   </SOAP-ENV:Body>
//   // </SOAP-ENV:Envelope>`;
//   // if(xml == (null || undefined)){
//   //   return Response.json(soap, {
//   //     status: 200,
//   //     headers: { "Content-Type": "text/xml" },
//   //   });
//   // }
//   // return Response.json(soap, { status: 200, headers: { "Content-Type": "text/xml" } });
// }

// export function GET(req: Request) {
//   console.log(req);
// }

// export function PUT(req: Request) {
//   console.log(req);
// }

// export function DELETE(req: Request) {
//   console.log(req);
// }

// export function PATCH(req: Request) {
//   console.log(req);
// }
