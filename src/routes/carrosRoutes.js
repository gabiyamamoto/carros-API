import express from "express";
import { getAllCarros, getCarroById } from "../controllers/carrosController.js";

const router = express.Router();

router.get("/", getAllCarros);
router.get("/:id", getCarroById);

export default router;