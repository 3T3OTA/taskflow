import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/150",
  }
});

const Board = mongoose.model("Board", boardSchema);

export default Board;
