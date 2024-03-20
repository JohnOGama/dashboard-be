import express from "express";
import * as Website from "../controller/website";

const router = express.Router();

router.post("/add-website", Website.addWebsite);
router.get("/get-all-website", Website.getWebsite);
router.delete("/delete-website/:deleteId", Website.deleteWebsite);
router.put("/update-website/:websiteId", Website.editWebsite);

export default router;
