import mongoose, { Schema, Document } from "mongoose";

export interface Icpe extends Document {
  serialNumber: string;
  hardwareVersion: string;
  softwareVersion: string;
  event: string;
  lastUpdated: Date;
  parametros: { chave: string; valor: any }[];
}

const CPESchema = new Schema<Icpe>({
  serialNumber: { type: String, required: true, unique: true },
  hardwareVersion: { type: String, required: true },
  softwareVersion: { type: String, required: true },
  event: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },
  parametros: { type: [{ name: String, value: Schema.Types.Mixed }], default: [] }, // Array de objetos
});

export default mongoose.models.CPE || mongoose.model<Icpe>("CPE",CPESchema);