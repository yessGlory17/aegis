import mongoose, { models, Schema } from "mongoose";

const VaultSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Vault || mongoose.model("Vault", VaultSchema);