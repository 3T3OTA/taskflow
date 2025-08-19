import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const Board = mongoose.model("Board", boardSchema);

export default Board;
