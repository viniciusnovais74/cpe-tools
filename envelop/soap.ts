const envelopeContinue = (cwmpID: string) => {
  return `
    <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:cwmp="urn:dslforum-org:cwmp-1-0">
      <SOAP-ENV:Header>
        <cwmp:ID SOAP-ENV:mustUnderstand="1">${cwmpID}</cwmp:ID>
      </SOAP-ENV:Header>
      <SOAP-ENV:Body>
        <cwmp:InformResponse>
          <MaxEnvelopes>1</MaxEnvelopes>
        </cwmp:InformResponse>
      </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>
  `;
};

const Reboot = (cwmpID: string) => {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cwmp="urn:dslforum-org:cwmp-1-2">
      <soapenv:Header>
        <cwmp:ID soapenv:mustUnderstand="1">${cwmpID}</cwmp:ID>
      </soapenv:Header>
      <soapenv:Body>
        <cwmp:Reboot>
          <CommandKey>RebootCommand</CommandKey>
        </cwmp:Reboot>
      </soapenv:Body>
    </soapenv:Envelope>  
  `;
};

const getAllParameters = (cwmpID: string) => {
  return `
   <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" 
                       xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" 
                       xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                       xmlns:cwmp="urn:dslforum-org:cwmp-1-0">
      <SOAP-ENV:Header>
        <cwmp:ID SOAP-ENV:mustUnderstand="1">${cwmpID}</cwmp:ID>
      </SOAP-ENV:Header>
      <SOAP-ENV:Body>
        <cwmp:GetParameterValues>
          <ParameterNames SOAP-ENC:arrayType="xsd:string[1]">
            <string>InternetGatewayDevice.</string>
          </ParameterNames>
        </cwmp:GetParameterValues>
      </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>
 `;

  return `
    <SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:cwmp="urn:dslforum-org:cwmp-1-0">
      <SOAP-ENV:Header>
        <cwmp:ID SOAP-ENV:mustUnderstand="1">${cwmpID}</cwmp:ID> 
      </SOAP-ENV:Header>
      <SOAP-ENV:Body>
        <cwmp:GetParameterNames>
          <ParameterPath>InternetGatewayDevice.</ParameterPath>
          <NextLevel>false</NextLevel>
        </cwmp:GetParameterNames>
      </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>
  `;
};

const setUrlConnection = (cwmpID: string, url: string) => {
  return `
    <SOAP-ENV:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cwmp="urn:dslforum-org:cwmp-1-2">
      <SOAP-ENV:Header>
        <cwmp:ID SOAP-ENV:mustUnderstand="1">${cwmpID}</cwmp:ID>
      </SOAP-ENV:Header>
      <SOAP-ENV:Body>
        <cwmp:SetParameterValues>
          <ParameterList SOAP-ENC:arrayType="cwmp:ParameterValueStruct[1]" xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/">
          <ParameterValueStruct>
          <Name>InternetGatewayDevice.ManagementServer.URL</Name>
          <Value xsi:type="xsd:string">${url}</Value>
          </ParameterValueStruct>
          </ParameterList>
          <ParameterKey>config_update_001</ParameterKey>
        </cwmp:SetParameterValues>
      </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>

  `;
};

const soapFunctions: Record<
  string,
  (cwmpID: string, ...args: any[]) => string
> = {
  soap: envelopeContinue,
  getAllParameters: getAllParameters,
  setUrlConnection: setUrlConnection,
  Reboot: Reboot,
};

export default soapFunctions