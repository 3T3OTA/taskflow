import boardService from "../services/boardService.js";

class BoardController {
  async createBoard(req, res) {
    const boardData = req.body;
    if (!boardData.title) {
      return res.status(400).json({ error: "Title is required" });
    }
    const userId = req.user.id;
    boardData.userId = userId;
    const result = await boardService.createBoard(boardData);
    if (result.success) {
      return res.status(201).json(result.board);
    }
    return res.status(400).json({ error: result.message });
  }

  async getBoardsByUserId(req, res) {
    const userId = req.user.id;
    const result = await boardService.getBoardsByUserId(userId);
    if (result.success) {
      return res.status(200).json(result.boards);
    }
    return res.status(400).json({ error: result.message });
  }


  async updateBoard(req, res) {
    const updateData = req.body;
    if (!updateData.title || !updateData.boardId) {
      return res.status(400).json({ error: "Title and Board ID are required" });
    }
    
    const boardId = updateData.boardId;
    delete updateData.boardId

    console.log("Update Data:", updateData);
    const result = await boardService.updateBoard(boardId, updateData);
    if (result.success) {
      return res.status(200).json(result.board);
    }
    return res.status(400).json({ error: result.message });
  }
}

export default new BoardController();
