import crypto from "crypto";
const ALGO = "aes-256-gcm";
const KEY = Buffer.from(process.env.CRYPTO_KEY!, "hex");

export function encrypt(text: string) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGO, KEY, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const tag = cipher.getAuthTag();
  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted,
    tag: tag.toString("hex"),
  };
}

export function decrypt({
  iv,
  encryptedData,
  tag,
}: {
  iv: string;
  encryptedData: string;
  tag: string;
}) {
  const decipher = crypto.createDecipheriv(ALGO, KEY, Buffer.from(iv, "hex"));
  decipher.setAuthTag(Buffer.from(tag, "hex"));
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
