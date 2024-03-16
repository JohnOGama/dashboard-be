import { RequestHandler } from "express";
import Post from "../model/postSchema";

export const post: RequestHandler = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      res.status(400).json({ message: "All fields are required" });
    }

    const post = await Post.create({
      title,
      description,
    });

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const getAll: RequestHandler = async (req, res, next) => {
  try {
    const post = await Post.find().exec();
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const getSingle: RequestHandler = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const singlePost = await Post.findById(postId).exec();
    res.status(200).json(singlePost);
  } catch (error) {
    next(error);
  }
};

export const deletePost: RequestHandler = async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      res.status(400);
      throw new Error("Something wrong in deleting post");
    }

    const post = Post.findByIdAndDelete(postId).exec();

    res.status(200).json({ message: `${postId} is deleted` });
  } catch (error) {
    next(error);
  }
};

export const updatePost: RequestHandler = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { postId } = req.params;
    if (!postId) {
      res.status(400);
      throw new Error("Error in updating post");
    }

    await Post.findByIdAndUpdate(postId, {
      title,
      description,
    });
    res.status(200).json(`Post ${postId} is updated`);
  } catch (error) {
    next(error);
  }
};
