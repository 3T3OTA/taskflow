import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
  boardId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
    default: 0,
  },
});

const List = mongoose.model("List", listSchema);

export default List;
