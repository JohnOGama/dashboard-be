import { InferSchemaType, Schema, model } from "mongoose";

const postSchema = new Schema({
  title: { type: String, required: [true, "title is required"] },
  description: { type: String, required: [true, "title is required"] },
});

type Post = InferSchemaType<typeof postSchema>;

export default model<Post>("Post", postSchema);
