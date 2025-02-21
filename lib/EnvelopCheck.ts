import { soap } from "@/envelop/soap";
import { findValueByPath, sanitizeSoapData } from "./sanitizer";
import event from "@/models/event";
import cpe from "@/models/cpe";
import connectDB from "./mongodb";
import { parseStringPromise } from "xml2js";

export default class EnvelopCheck {
  envelop?: string;
  parsed: any = {};
  id?: any;
  constructor(envelop?: string) {
    this.envelop = envelop;
    this.id = "";
    connectDB();
  }

  async start(id?: string) {
    this.id = id;
    if (!this.envelop) return "";

    this.parsed = await sanitizeSoapData(this.envelop);
    const match = this.envelop?.match(/<cwmp:ID[^>]*>(.*?)<\/cwmp:ID>/);
    const cwmpID = match ? match[1] : "0"; // Se não encontrar, usa "0"

    const md = this.parsed?.Envelope?.Body;
    if (md) {
      const princ = Object.entries(md)[0][0].toLowerCase();
      console.log(princ);
      switch (princ) {
        case "inform":
          this.checkIfExists(md, id);
          return "soap";
        case "getparametervaluesresponse":
          this.createParameters();
          return "soap";
        case "rebootresponse":
          return "NotResponse"
        default:
          return "soap"
      }
    }

    return "";
  }

  async checkIfExists(envelop: any, id: string) {
    console.log(id);
    const informData = envelop?.Inform;
    const cpeData = {
      serialNumber: informData.DeviceId?.SerialNumber || "Desc",
      hardwareVersion:
        findValueByPath(
          this.parsed,
          "InternetGatewayDevice.DeviceInfo.HardwareVersion"
        )._ || "Desc",
      softwareVersion:
        findValueByPath(
          this.parsed,
          "InternetGatewayDevice.DeviceInfo.SoftwareVersion"
        )._ || "Desc",
      event: informData.Event?.EventCode || "None",
    };
    if (!(await cpe.findById(id))) {
      await cpe.create({ _id: id, ...cpeData });
    }
  }

  async createParameters() {
    const result = await parseStringPromise(this.envelop);
    
    const paramList =
      result["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0][
        "cwmp:GetParameterValuesResponse"
      ][0]["ParameterList"][0]["ParameterValueStruct"];


    const paramArray = Array.isArray(paramList) ? paramList : [paramList];
    const parametros = paramArray.map((param) => ({
      chave: param.Name[0],
      valor: param.Value[0]?._ || "",
    }));


    await cpe.findOneAndUpdate(
      {
        _id: this.id,
      },
      { parametros }
    );
  }

  async command(id: string) {
    const command = await event.find({ referId: id });
    if (!(command.length > 0)) return;
    const template = command[0].envelopeTemplate;
    await event.findOneAndDelete({ referId: id });
    return template;
  }
}
