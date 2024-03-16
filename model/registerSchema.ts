import { InferSchemaType, Schema, model } from "mongoose";

const registerSchema = new Schema(
  {
    username: { type: String, required: [true, "username is required"] },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required"],
    },
    password: { type: String, required: [true, "password is required"] },
  },
  {
    timestamps: true,
  }
);

type User = InferSchemaType<typeof registerSchema>;

export default model<User>("User", registerSchema);
