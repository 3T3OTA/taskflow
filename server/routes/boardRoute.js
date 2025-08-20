import boardController from "../controllers/boardController.js";
import express from "express";
const router = express.Router();
import authDecode from "../middlewares/authDecode.js";

router.get("/me", authDecode, boardController.getBoardsByUserId);
router.post("/create", authDecode, boardController.createBoard);
router.put("/update", authDecode, boardController.updateBoard);

export default router;
