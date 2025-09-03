import boardController from "../controllers/boardController.js";
import express from "express";
const router = express.Router();
import authDecode from "../middlewares/authDecode.js";
import authorizeBoardOwner from "../middlewares/authorizeBoardOwner.js";
import uploadBoard from "../utils/uploadBoard.js";



router.get("/me", authDecode, boardController.getBoardsByUserId);
router.get("/me/:id", authDecode, authorizeBoardOwner, boardController.getBoardById);
router.post("/create", authDecode, boardController.createBoard);
router.put("/:id/update", authDecode, authorizeBoardOwner, uploadBoard.single("image"), boardController.updateBoard);
router.delete("/:id/delete", authDecode, authorizeBoardOwner, boardController.deleteBoard);

router.post("/:id/list/add", authDecode, authorizeBoardOwner, boardController.addListsToBoard);
router.delete("/:id/list/:listId", authDecode, authorizeBoardOwner, boardController.deleteListfromBoard);
router.put("/:id/lists/order", authDecode, authorizeBoardOwner, boardController.listsOrderUpdate); 
router.put("/:id/list/:listId/update", authDecode, authorizeBoardOwner, boardController.updateListInBoard);

router.post("/:id/list/:listId/task/add", authDecode, authorizeBoardOwner, boardController.addTaskToList);

router.put("/:id/task/move", authDecode, authorizeBoardOwner, boardController.moveAndOrderTasks);
router.delete("/:id/list/:listId/task/:taskId", authDecode, authorizeBoardOwner, boardController.deleteTaskfromList);
router.put("/:id/list/:listId/task/:taskId/update", authDecode, authorizeBoardOwner, boardController.updateTask);

export default router;
