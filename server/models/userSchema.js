import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
    default: "https://i.ibb.co/LzyV2rWb/ec747a688a5d6232663caaf114bad1c3.png",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
