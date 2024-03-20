import { RequestHandler } from "express";
import Website from "../model/websiteSchema";

export const addWebsite: RequestHandler = async (req, res, next) => {
  try {
    const { url_name, deploy_status, users } = req.body;

    const website = await Website.create({
      url_name,
      deploy_status,
      users,
    });

    res.status(200).json(website);
  } catch (error: unknown) {
    if (error) {
      next(error);
    }
  }
};

export const getWebsite: RequestHandler = async (req, res, next) => {
  try {
    const website = await Website.find().exec();
    res.status(200).json(website);
  } catch (error) {
    if (error) {
      next(error);
    }
  }
};

export const deleteWebsite: RequestHandler = async (req, res, next) => {
  try {
    const { deleteId } = req.params;
    await Website.findByIdAndDelete(deleteId).exec();
    res.status(200).json({ message: "Successful delete" });
  } catch (error) {
    if (error) {
      next(error);
    }
  }
};

export const editWebsite: RequestHandler = async (req, res, next) => {
  try {
    const { url_name, deploy_status, users } = req.body;
    const { websiteId } = req.params;
    const editedWebsite = await Website.findByIdAndUpdate(websiteId, {
      url_name,
      deploy_status,
      users,
    });
    res.status(200).json(editedWebsite);
  } catch (error) {
    if (error) {
      next(error);
    }
  }
};
