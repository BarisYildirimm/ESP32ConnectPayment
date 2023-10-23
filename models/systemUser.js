import mongoose from "mongoose";

const systemUserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("systemUser", systemUserSchema);
export default User;
