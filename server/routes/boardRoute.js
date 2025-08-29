import boardController from "../controllers/boardController.js";
import express from "express";
const router = express.Router();
import authDecode from "../middlewares/authDecode.js";
import authorizeBoardOwner from "../middlewares/authorizeBoardOwner.js";

router.get("/me", authDecode, boardController.getBoardsByUserId);
router.get("/me/:id", authDecode, authorizeBoardOwner, boardController.getBoardById);
router.post("/create", authDecode, boardController.createBoard);
router.put("/update", authDecode, authorizeBoardOwner, boardController.updateBoard);

router.post("/:id/list/add", authDecode, authorizeBoardOwner, boardController.addListsToBoard);
router.delete("/:id/list/:listId", authDecode, authorizeBoardOwner, boardController.deleteListfromBoard);
router.put("/:id/lists/order", authDecode, authorizeBoardOwner, boardController.listsOrderUpdate); 
router.put("/:id/list/:listId/update", authDecode, authorizeBoardOwner, boardController.updateListInBoard);

router.post("/:id/list/:listId/task/add", authDecode, authorizeBoardOwner, boardController.addTaskToList);

export default router;
