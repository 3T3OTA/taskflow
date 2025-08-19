import mongoose from "mongoose";

const columnSchema = new mongoose.Schema({
  boardId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const Column = mongoose.model("Column", columnSchema);

export default Column;
