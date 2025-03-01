import mongoose from "mongoose";

const ParametroSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true }
});

const EnvelopeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  parametros: [ParametroSchema]
});

export default mongoose.models.Envelope || mongoose.model("Envelope", EnvelopeSchema);
