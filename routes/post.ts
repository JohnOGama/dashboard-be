import express from "express";
import * as Note from "../controller/post";

const router = express.Router();

router.post("/create-post", Note.post);
router.get("/get-all-post", Note.getAll);
router.get("/get-single-post/:postId", Note.getSingle);
router.delete("/delete-post/:postId", Note.deletePost);
router.put("/update-post/:postId", Note.updatePost);

export default router;
