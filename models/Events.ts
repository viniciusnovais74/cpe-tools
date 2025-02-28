import mongoose, { Schema, Document } from "mongoose";

interface IEvents extends Document {
  serialNumber: string;
  envelopeTemplate: string;
  referId: string;
  executed: boolean;
}

const EventSchema = new Schema<IEvents>({
  serialNumber: { type: String, required: true },
  envelopeTemplate: { type: String, required: true },
  referId: { type: String, required: true },
  executed: { type: Boolean, required: false },
});

export default mongoose.models.EVENT ||
  mongoose.model<IEvents>("EVENT", EventSchema);
