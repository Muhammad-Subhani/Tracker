const { ApiResponse } = require("../Helper/helperfunctions.js");

class GetCalendardata {
  static Checkparams(req, res) {
    const params = req.params.id;
    if (!params) {
      ApiResponse.failure(res, "There is no ID in the params ", 400);
      return null;
    }
    else return params;
  }
  static CheckUser(req, res) {
    const reqUser = req.user;
    if (!reqUser) {
      ApiResponse.failure(res, "Cant Find the User Who requested !!", 500);
      return null;
    }
    else return reqUser;
  }
}
class CreateHelper {
  static Checkparams(req, res) {
    const params = req.params.id;
    if (!params) {
      ApiResponse.failure(res, "There is no ID in the params ", 400);
      return null;
    }
    else return params;
  }
  static CheckUser(req, res) {
    const reqUser = req.user;
    if (!reqUser) {
      ApiResponse.failure(res, "Cant Find the User Who requested !!", 500);
      return null;
    }
    else return reqUser;
  }
  static ValidateFields(req, res) {
    const { title, date, month, year, dayno, startingminutes, endingminutes } = req.body;
    if (!title ||
      date == null ||
      month == null ||
      year == null ||
      dayno == null ||
      startingminutes < 0 || startingminutes >= 1440 ||
      endingminutes < 0 || endingminutes >= 1440) {
      ApiResponse.failure(res, "Missing required fields", 400);
      return null;
    }
    return { title, date, month, year, dayno, startingminutes, endingminutes };
  }
}
module.exports = {
  GetCalendardata,
  CreateHelper
}
