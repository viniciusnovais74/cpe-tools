import mongoose, { Schema, Document } from "mongoose";

interface IEvents extends Document {
  serialNumber: string;
  envelopeTemplate: string;
  referId: string;
}

const EventSchema = new Schema<IEvents>({
  serialNumber: { type: String, required: true },
  envelopeTemplate: { type: String, required: true },
  referId: { type: String, required: true },
});

export default mongoose.models.EVENT ||
  mongoose.model<IEvents>("EVENT", EventSchema);
