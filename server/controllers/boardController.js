import boardService from "../services/boardService.js";

const uploadBoardPath = '/uploads/boards/';

class BoardController {
  async createBoard(req, res) {
    const boardData = req.body;    
    if (!boardData.title) {
      return res.status(400).json({ error: "Title is required" });
    }
    const userId = req.user.id;
    boardData.userId = userId;
    const titleWithoutSpaces = boardData.title.replace(/ /g, "%20");
    boardData.image = `https://placehold.co/600x400/EEE/31343C?font=raleway&text=${titleWithoutSpaces}`;
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
      result.boards = result.boards.map((board) => {
        if (board.image && !board.image.includes('placehold.co')) {
          board.image = req.protocol + '://' + req.get('host') + uploadBoardPath + board.image;
        }
        return board;
      });
      return res.status(200).json(result.boards);
    }
    return res.status(400).json({ error: result.message });
  }

  async updateBoard(req, res) {
    const boardId = req.params.id;
    const updateData = req.body;
    if (!updateData.title || !boardId) {
      return res.status(400).json({ error: "Title and Board ID are required" });
    }
    if (req.file) {
      updateData.image = req.file.filename; 
    }

    const result = await boardService.updateBoard(boardId, updateData);
    if (result.success) {
      if (result.board.image && !result.board.image.includes('placehold.co')) {
        result.board.image =
          req.protocol + "://" + req.get("host") + uploadBoardPath + result.board.image;
      }
      return res.status(200).json(result.board);
    }
    return res.status(400).json({ error: result.message });
  }

  async deleteBoard(req, res) {
    const boardId = req.params.id;
    if (!boardId) {
      return res.status(400).json({ error: "Board ID is required" });
    }
    const result = await boardService.deleteBoard(boardId);
    if (result.success) {
      return res.status(200).json({ message: result.message });
    }
    return res.status(400).json({ error: result.message });
  }

  async getBoardById(req, res) {
    const boardId = req.params.id;
    const userId = req.user.id;

    if (!boardId) {
      return res.status(400).json({ error: "Board ID is required" });
    }
    const result = await boardService.getBoardById(boardId, userId);
    if (result.success) {
        if (result.board.image && !result.board.image.includes('placehold.co')) {
          result.board.image = req.protocol + '://' + req.get('host') + uploadBoardPath + result.board.image;
        }
      return res.status(200).json(result.board);
    }
    return res.status(404).json({ error: result.message });
  }

  async addListsToBoard(req, res) {
    const boardId = req.params.id;
    const listData = req.body;

    if (!boardId) {
      return res.status(400).json({ error: "Board ID is required" });
    }
    if (!listData || !listData.title) {
      return res
        .status(400)
        .json({ error: "Lists data with title is required" });
    }

    const result = await boardService.addListsToBoard(boardId, listData);
    if (result.success) {
      return res.status(201).json(result.list);
    }
    return res.status(400).json({ error: result.message });
  }

  async listsOrderUpdate(req, res) {
    const boardId = req.params.id;
    const { listData } = req.body;
    if (!listData || !boardId) {
      return res
        .status(400)
        .json({ error: "listData and boardId are required" });
    }

    const orderedListIds = listData;
    const result = await boardService.listsOrderUpdate(boardId, orderedListIds);
    if (result.success) {
      return res
        .status(200)
        .json({ message: "Lists order updated successfully" });
    }
    return res.status(400).json({ error: result.message });
  }

  async addTaskToList(req, res) {
    const listId = req.params.listId;
    const boardId = req.params.id;
    const taskData = req.body;
    if (!listId || !boardId) {
      return res
        .status(400)
        .json({ error: "List ID and Board ID are required" });
    }
    if (!taskData || !taskData.title) {
      return res
        .status(400)
        .json({ error: "Task data with title is required" });
    }
    const result = await boardService.addTaskToList(listId, boardId, taskData);
    if (result.success) {
      return res.status(201).json(result.task);
    }
    return res.status(400).json({ error: result.message });
  }

  async deleteListfromBoard(req, res) {
    const listId = req.params.listId;
    const boardId = req.params.id;
    if (!listId || !boardId) {
      return res
        .status(400)
        .json({ error: "List ID and Board ID are required" });
    }
    const result = await boardService.deleteListfromBoard(listId, boardId);
    if (result.success) {
      return res.status(200).json({ message: result.message });
    }
    return res.status(400).json({ error: result.message });
  }

  async updateListInBoard(req, res) {
    const listId = req.params.listId;
    const boardId = req.params.id;
    const updateData = req.body;
    if (!listId || !boardId) {
      return res
        .status(400)
        .json({ error: "List ID and Board ID are required" });
    }
    if (!updateData) {
      return res
        .status(400)
        .json({ error: "Update data with title is required" });
    }
    const result = await boardService.updateListInBoard(
      listId,
      boardId,
      updateData
    );
    if (result.success) {
      return res.status(200).json(result.list);
    }
    return res.status(400).json({ error: result.message });
  }

  async moveAndOrderTasks(req, res) {
    const { sourceListId, destListId, destOrderedTaskIds, movedTaskId } =
      req.body;
    if (
      !sourceListId ||
      !destListId ||
      !Array.isArray(destOrderedTaskIds) ||
      !movedTaskId
    ) {
      return res
        .status(400)
        .json({
          error:
            "sourceListId, destListId, destOrderedTaskIds, and movedTaskId are required",
        });
    }
    try {
      const result = await boardService.moveAndOrderTasks(
        sourceListId,
        destListId,
        destOrderedTaskIds,
        movedTaskId
      );
      if (result.success) {
        return res.status(200).json({ message: result.message });
      }
      return res.status(400).json({ error: result.message });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async deleteTaskfromList(req, res) {
    const listId = req.params.listId;
    const taskId = req.params.taskId;
    const boardId = req.params.id;
    if (!listId || !taskId || !boardId) {
      return res
        .status(400)
        .json({ error: "List ID, Task ID, and Board ID are required" });
    }
    const result = await boardService.deleteTaskfromList(taskId, listId);
    if (result.success) {
      return res.status(200).json({ message: result.message });
    }
    return res.status(400).json({ error: result.message });
  }

  async updateTask(req, res) {
    const taskId = req.params.taskId;
    const listId = req.params.listId;
    const boardId = req.params.id;
    const updateData = req.body;
    if (!taskId || !listId || !boardId) {
      return res
        .status(400)
        .json({ error: "Task ID, List ID, and Board ID are required" });
    }
    const result = await boardService.updateTask(taskId, listId, updateData);
    if (result.success) {
      return res.status(200).json(result.task);
    }
    return res.status(400).json({ error: result.message });
  }
}

export default new BoardController();
