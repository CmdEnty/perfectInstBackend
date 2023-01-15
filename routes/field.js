import express from "express";
import { getFields, addfield, fieldSearch } from "../controllers/field.js";

const router = express.Router();

router.get("/", getFields);
router.get("/search/:fieldName", fieldSearch);
router.post("/addfield", addfield);

export default router;
