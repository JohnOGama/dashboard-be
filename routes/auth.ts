import express from "express";
import * as Auth from "../controller/auth";
import validateToken from "../middleware/valdiateToken";

const router = express.Router();

router.post("/register", Auth.registerUser);
router.post("/login", Auth.loginUser);
router.get("/user", validateToken, Auth.getUser);

export default router;
