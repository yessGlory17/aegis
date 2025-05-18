import mongoose, { models, Schema } from "mongoose";

const PasswordSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    vault: { type: Schema.Types.ObjectId, ref: "Vault", required: true },
    title: { type: String, required: true },
    service: { type: String, required: true }, // Örneğin “Gmail”
    username: { type: String, required: true }, // Hizmet kullanıcı adı
    encryptedPassword: { type: String, required: true },
    iv: { type: String, required: true }, // Initial vector
    tag: { type: String, required: true }, // Authentication tag (GCM için)
  },
  { timestamps: true }
);

export default models.Password || mongoose.model("Password", PasswordSchema);
