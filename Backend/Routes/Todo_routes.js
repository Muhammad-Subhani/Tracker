const express = require("express")
const TodoRouter = express.Router();
const { FunctionValidation } = require("../middlewares/userVerification.js")
const {
  CreateNewTodo,
  DeleteParticular,
  DeleteAll ,
} = require("../Controller/todo.js")
// /api/todo/...
TodoRouter.post("/create", FunctionValidation, CreateNewTodo);
 TodoRouter.delete("/deleteone/:id", FunctionValidation, DeleteParticular);
 TodoRouter.delete("/deleteAll", FunctionValidation, DeleteAll);
// TodoRouter.patch("/completionstatus/:id", FunctionValidation, CompletionStatus);
module.exports = { TodoRouter }
