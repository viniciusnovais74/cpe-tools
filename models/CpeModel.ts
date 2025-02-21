import { Document, model, models, Schema } from "mongoose";

interface ICpeModel extends Document {
  modelName: string;
  parametersName: { name: string }[];
}

const CpeModel = new Schema<ICpeModel>({
  modelName: { type: String, unique: true, required: true },
  parametersName: { type: [{ name: String }], default: [] },
});

export default models.CpeModel || model<ICpeModel>("CpeModel",CpeModel)