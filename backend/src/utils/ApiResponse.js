class ApiResponse {
  constructor(success, message, data = {}, errors = []) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.errors = errors;
  }

  static success(res, { statusCode = 200, message = "Success", data = {} }) {
    return res.status(statusCode).json(new ApiResponse(true, message, data, []));
  }

  static error(res, { statusCode = 500, message = "Something went wrong", errors = [] }) {
    return res.status(statusCode).json(new ApiResponse(false, message, {}, errors));
  }
}

module.exports = ApiResponse;
