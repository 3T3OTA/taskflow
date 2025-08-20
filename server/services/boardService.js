import Board from "../models/boardSchema.js";

class BoardService {
  async createBoard(boardData) {
    try {
      const board = new Board(boardData);
      const savedBoard = await board.save();
      return { success: true, board: savedBoard };
    } catch (error) {
      return {
        success: false,
        message: `Error creating board: ${error.message}`,
      };
    }
  }

  async getBoardsByUserId(userId) {
    try {
      const boards = await Board.find({ userId });
      return { success: true, boards };
    } catch (error) {
      return {
        success: false,
        message: `Error retrieving boards: ${error.message}`,
      };
    }
  }

    async updateBoard(boardId, updateData) {
        try {
        const board = await Board.findByIdAndUpdate(boardId, updateData, { new: true });
        if (!board) {
            return { success: false, message: "Board not found" };
        }
        return { success: true, board };
    } catch (error) {
        return {
            success: false,
            message: `Error updating board: ${error.message}`,
        };
    }
    
}

}

export default new BoardService();
