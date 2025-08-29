import Board from '../models/boardSchema.js';

const authorizeBoardOwner = async (req, res, next) => {
  try {
    const boardId = req.params.id || req.body.boardId;
    if (!boardId) {
      return res.status(400).json({ message: 'Board ID is required' });
    }
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    if (board.userId.toString() !== req.user.id && board.userId.toString() !== req.user._id) {
      return res.status(403).json({ message: 'You are not authorized to access this board' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Authorization error', error: error.message });
  }
};

export default authorizeBoardOwner;
