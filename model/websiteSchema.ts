import { Schema, InferSchemaType, model } from "mongoose";

const websiteSchema = new Schema(
  {
    url_name: {
      type: String,
      required: [true, "This is requied"],
      unique: true,
    },
    deploy_status: { type: String, required: [true, "This is requied"] },
    users: { type: String, required: [true, "This is requied"] },
    role: { type: String, required: [true, "This is requied"] },
  },
  { timestamps: true }
);

type WebsiteProps = InferSchemaType<typeof websiteSchema>;
export default model<WebsiteProps>("Website", websiteSchema);
