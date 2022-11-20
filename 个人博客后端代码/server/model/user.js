const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
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
  role: {
    type: String,
    required: true,
  },
  //0启用状态
  //1禁用状态
  state: {
    type: Number,
    default: 0,
  },
});
const User = mongoose.model("Users", userSchema);
module.exports=User

