const TodoModel = require("../Models/ToDos.js");
const {
  ApiResponse
} = require("../Helper/helperfunctions.js")
const {
  Checkuser,
  CheckParams,
  CheckContent,
} = require("../Helper/todohelper.js")
async function CreateNewTodo(req, res) {
  try {
    const reqUser = Checkuser(req, res);
    if (!reqUser) return;
    const todoContent = CheckContent(req, res);
    if (!todoContent) return;
    const todoEntry = TodoModel.create({
      user_id: reqUser._id,
      todoContent: todoContent,
      isComplete: false,
    })
    ApiResponse.success(res, "Created Todo ", 200, { Todo: todoEntry });
  } catch (error) {
    console.error("Error Ocurred !!", error);
    const errmsg = error.message || "Unknown  Error ! ";
    ApiResponse.failure(res, errmsg, 500);
  }
}
async function DeleteParticular(req, res) {
try {
   const reqUser = Checkuser(req, res);
  if (!reqUser) return;
  const params = CheckParams(req, res);
  if (!params) return;
  const deletedCount = await TodoModel.deleteOne({_id : params , user_id : reqUser._id });
  if(deletedCount >0) return ApiResponse.success(res , "deleted this todo " , 200 , {noofdeletions : deletedCount});
  else return ApiResponse.failure(res , "NO such todo " , 401);
 
} catch (error) {
   console.error("Error Ocurred !!", error);
    const errmsg = error.message || "Unknown  Error ! ";
    ApiResponse.failure(res, errmsg, 500);
}
}
async function DeleteAll(req , res) {
  try {
    const reqUser = Checkuser(req, res);
  if (!reqUser) return;
    const deletedCount = await TodoModel.deleteMany({user_id : reqUser._id})
    if(deletedCount >0) return ApiResponse.success(res , "deleted this todo " , 200 , {noofdeletions : deletedCount});
  else return ApiResponse.failure(res , "NO such todo " , 401);
  } catch (error) {
   console.error("Error Ocurred !!", error);
    const errmsg = error.message || "Unknown  Error ! ";
    ApiResponse.failure(res, errmsg, 500);  
  }
}
async function CompletionStatus(req , res) {
  try {
    const reqUser = Checkuser(req, res);
  if (!reqUser) return;
  const params = CheckParams(req, res);
  if (!params) return;
  const updatedObj = await TodoModel.findOneAndUpdate({_id : params , user_id : reqUser._id}, 
    {isComplete : !isComplete} , 
    {new : true }
  )
  if(updatedObj) return ApiResponse.success(res , "Updated Todo" , 200 , {Todo : updatedObj} )
    else return ApiResponse.failure(res , "Didnt find one " , 401);
  } catch (error) {
     console.error("Error Ocurred !!", error);
    const errmsg = error.message || "Unknown  Error ! ";
    ApiResponse.failure(res, errmsg, 500);
  }
}
module.exports = {
  CreateNewTodo,
  DeleteParticular,
  DeleteAll,
}

