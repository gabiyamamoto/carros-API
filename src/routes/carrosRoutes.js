import express from "express";
import { getAllCarros, getCarroById, createCarro, updateCarro, deleteCarro } from "../controllers/carrosController.js";

const router = express.Router();

router.get("/", getAllCarros);
router.get("/:id", getCarroById);
router.post("/", createCarro);
router.put("/:id", updateCarro);
router.delete("/:id", deleteCarro);

export default router;