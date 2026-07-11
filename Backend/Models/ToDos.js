const mongoose = require("mongoose");
const TodoSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user_model",
  },
  todoContent: {
    type: String,
    required: ["Whats the Todo Task ?", true]
  },
  isComplete: {
    type: Boolean,
    required: ["whats the status of todos", true]
  }
}, { timestamps: true });
const TodoModel = mongoose.model("TodoModel", TodoSchema);
module.exports = TodoModel;
