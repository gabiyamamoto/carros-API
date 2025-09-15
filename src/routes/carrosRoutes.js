import express from "express";
import { getAllCarros, getCarroById, createCarro, updateCarro } from "../controllers/carrosController.js";

const router = express.Router();

router.get("/", getAllCarros);
router.get("/:id", getCarroById);
router.post("/", createCarro);
router.put("/:id", updateCarro)

export default router;