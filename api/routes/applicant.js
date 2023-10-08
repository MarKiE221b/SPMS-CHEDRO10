import express from "express";
import { application } from "../controllers/applicant.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../api/public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/application",
  upload.array("files"),
  application
);

export default router;
