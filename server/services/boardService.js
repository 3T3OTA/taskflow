import Board from "../models/boardSchema.js";
import List from "../models/listSchema.js";
import Task from "../models/taskSchema.js";

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
      if (!boards || boards.length === 0) {
        return { success: false, message: "No boards found for this user" };
      }

      const formattedBoards = boards.map((board) => {
        const obj = board.toObject();
        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;
        return obj;
      });

      return { success: true, boards: formattedBoards };
    } catch (error) {
      return {
        success: false,
        message: `Error retrieving boards: ${error.message}`,
      };
    }
  }

  async updateBoard(boardId, updateData) {
    try {
      const board = await Board.findByIdAndUpdate(boardId, updateData, {
        new: true,
      });
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

  async getBoardById(boardId, userId) {
    try {
      const board = await Board.findById(boardId).sort({ order: 1 });
      if (!board) {
        return { success: false, message: "Board not found" };
      }
      const obj = board.toObject();
      obj.id = obj._id;
      delete obj._id;
      delete obj.__v;

      if (obj.userId != userId) {
        return { success: false, message: "Unauthorized access to this board" };
      }

      const lists = await this.getListsByBoardId(boardId);
      if (lists.success) {
        obj.lists = lists.lists;
      }

      return { success: true, board: obj };
    } catch (error) {
      return {
        success: false,
        message: `Error retrieving board: ${error.message}`,
      };
    }
  }

  async addListsToBoard(boardId, listData) {
    try {
      const board = await Board.findById(boardId);
      if (!board) {
        return { success: false, message: "Board not found" };
      }
      const lastList = await List.findOne({ boardId }).sort({ order: -1 });
      const nextOrder = lastList ? lastList.order + 1 : 0;
      const list = new List({ ...listData, boardId, order: nextOrder });
      const savedLists = await list.save();
      return { success: true, list: savedLists };
    } catch (error) {
      return {
        success: false,
        message: `Error creating list: ${error.message}`,
      };
    }
  }

  async getListsByBoardId(boardId) {
    try {
      const lists = await List.find({ boardId }).sort({ order: 1 });
      if (!lists || lists.length === 0) {
        return { success: false, message: "No lists found for this board" };
      }

      const formattedLists = lists.map((list) => {
        const obj = list.toObject();
        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;
        return obj;
      });
      
      const listsWithTasks = await Promise.all(
        formattedLists.map(async (list) => {
          const tasksResult = await this.getTasksByListId(list.id);
          if (tasksResult.success) {
            list.tasks = tasksResult.tasks;
          } else {
            list.tasks = [];
          }
          return list;
        })
      );
      return { success: true, lists: listsWithTasks };
    } catch (error) {
      return {
        success: false,
        message: `Error retrieving lists: ${error.message}`,
      };
    }
  }

  async deleteListfromBoard(listId, boardId) {
    try {
      const list = await List.findById(listId);
      if (!list) {
        return { success: false, message: "List not found" };
      }
      if (list.boardId.toString() !== boardId) {
        return { success: false, message: "List does not belong to this board" };
      }
      await List.findByIdAndDelete(listId);
      await Task.deleteMany({ listId });
      return { success: true, message: "List deleted successfully" };
    } catch (error) {
      return {
        success: false,
        message: `Error deleting list: ${error.message}`,
      };
    }
  }

  async deleteBoard(boardId) {
    try {
      const board = await Board.findByIdAndDelete(boardId);
      if (!board) {
        return { success: false, message: "Board not found" };
      }
      await List.deleteMany({ boardId });
      return {
        success: true,
        message: "Board and associated lists deleted successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: `Error deleting board: ${error.message}`,
      };
    }
  }

  async listsOrderUpdate(boardId, orderedListIds) {
    try {
      const lists = await List.find({ boardId });
      if (!lists || lists.length === 0) {
        return { success: false, message: "No lists found for this board" };
      }

      const listMap = {};
      lists.forEach((list) => {
        listMap[list._id.toString()] = list;
      });

      for (let i = 0; i < orderedListIds.length; i++) {
        const listId = orderedListIds[i];
        if (listMap[listId]) {
          listMap[listId].order = i;
          await listMap[listId].save();
        }
      }

      let nextOrder = orderedListIds.length;
      for (const list of lists) {
        if (!orderedListIds.includes(list._id.toString())) {
          list.order = nextOrder++;
          await list.save();
        }
      }

      return { success: true, message: "List order updated successfully" };
    } catch (error) {
      return {
        success: false,
        message: `Error updating lists order: ${error.message}`,
      };
    }
  }

  async addTaskToList(listId, boardId, taskData) {
    try {
      const list = await List.findById(listId);
      if (!list) {
        return { success: false, message: "List not found" };
      }
      if (list.boardId.toString() !== boardId) {
        return { success: false, message: "List does not belong to this board" };
      }
      const lastTask = await Task.findOne({ listId }).sort({ order: -1 });
      const nextOrder = lastTask ? lastTask.order + 1 : 0;
      const task = new Task({ ...taskData, listId, order: nextOrder });
      const savedTask = await task.save();
      return { success: true, task: savedTask };
    } catch (error) {
      return {
        success: false,
        message: `Error creating task: ${error.message}`,
      };
    }
  }

  async getTasksByListId(listId) {
    try {
      const tasks = await Task.find({ listId }).sort({ order: 1 });
      if (!tasks || tasks.length === 0) {
        return { success: false, message: "No tasks found for this list" };
      }
      const formattedTasks = tasks.map((task) => {
        const obj = task.toObject();
        obj.id = obj._id;
        delete obj._id;
        delete obj.__v;
        return obj;
      });
      return { success: true, tasks: formattedTasks };
    } catch (error) {
      return {
        success: false,
        message: `Error retrieving tasks: ${error.message}`,
      };
    }
  }

  async updateListInBoard(listId, boardId, updateData) {
    try {
      const list = await List.findById(listId);
      if (!list) {
        return { success: false, message: "List not found" };
      }
      if (list.boardId.toString() !== boardId) {
        return { success: false, message: "List does not belong to this board" };
      }

      const title = updateData
      const updatedList = await List.findByIdAndUpdate(listId, title, { new: true } );
      return { success: true, list: updatedList };
    } catch (error) {
      return {
        success: false,
        message: `Error updating list: ${error.message}`,
      };
    }
  }
}

export default new BoardService();
