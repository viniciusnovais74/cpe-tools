import { findValueByPath as fVBP, sanitizeSoapData } from "./sanitizerParams";
import event from "@/models/Events";
import cpe from "../models/cpe";
import connectDB from "./mongodb";
import { parseStringPromise } from "xml2js";
import { changeUrlSoap, initSoap } from "@/envelop/soap";

export default class EnvelopeQueue {
  envelope: string;
  id?: string;
  cwmpID: string;
  constructor(envelope: string) {
    this.envelope = envelope;
    const match = this.envelope?.match(/<cwmp:ID[^>]*>(.*?)<\/cwmp:ID>/);
    this.cwmpID = match ? match[1] : "0"; // Se não encontrar, usa "0"
    connectDB();
  }

  private caseExecutation() {
    switch (this.id) {
      case "inform":
        break;
      case "getparametervaluesresponse":
        break;
      case "rebootresponse":
        break;
      default:
        break;
    }
  }

  async start(id?: string) {
    this.id = id;
    if (!this.envelope) return "";

    this.parsed = await sanitizeSoapData(this.envelope);

    const md = this.parsed?.Envelope?.Body;
    if (md) {
      const princ = Object.entries(md)[0][0].toLowerCase();
      switch (princ) {
        case "inform":
          this.checkIfExists(md, id);
          return "soap";
        case "getparametervaluesresponse":
          this.createParameters();
          return "soap";
        case "rebootresponse":
          return "NotResponse";
        default:
          return "soap";
      }
    }
    return "";
  }

  async checkIfExists(envelop: any, id: any) {
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
    const result = await parseStringPromise(this.envelope);

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

  // Só é executado quando não se existe um envelope e talvez possa existir um id
  async updateOrCreate() {
    let informCpe: object;
    if (!this.id && !this.envelope) {
      informCpe = {
        serialNumber: "Desc",
        hardwareVersion: "Desc",
        softwareVersion: "Desc",
        event: "Desc",
      };
      const response = await cpe.create({ ...informCpe });
      return changeUrlSoap(
        Math.random().toString(),
        `${process.env.HOSTNAME}/devices/${response._id.toString()}`
      );
    }
    if (!this.envelope) return "";
    const textToXml = await sanitizeSoapData(this.envelope);
    const informData = textToXml.Envelope.Body?.Inform;
    if (informData) {
      informCpe = {
        serialNumber: informData.DeviceId?.SerialNumber,
        hardwareVersion: fVBP(
          textToXml,
          "InternetGatewayDevice.DeviceInfo.HardwareVersion"
        )._,
        softwareVersion: fVBP(
          textToXml,
          "InternetGatewayDevice.DeviceInfo.SoftwareVersion"
        )._,
        event: informData.Event?.EventCode||'null',
      };
      if(!await cpe.findById(this.id)) await cpe.create({...informCpe});
      await cpe.findOneAndUpdate({ _id: this.id }, { ...informCpe });
    }
    return "";
  }

  async processValidation() {
    let newCommand: string;
    newCommand = await this.updateOrCreate();
    if (newCommand) return newCommand;
    if (!this.envelope) return "";

    const textToXml = await sanitizeSoapData(this.envelope);
    if (textToXml.Envelope.Body?.Inform) {
      const soap = initSoap(this.cwmpID);
      return soap;
    }

    if (!this.id) {
    }
  }

  async init(id?: string) {
    // Se o envelope for Vazio mas a CPE estiver utilizando uma rota com ID
    if (!this.envelope && id) return "";
    this.id = id;
    const xml = await this.processValidation();
    return xml;
  }
}
