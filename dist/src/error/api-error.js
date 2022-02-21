"use strict";
var ApiError = /** @class */ (function () {
    function ApiError(code, message) {
        this.message = message;
        this.code = code;
    }
    ApiError.badRequest = function (msg) {
        return new ApiError(400, msg);
    };
    return ApiError;
}());
module.exports = ApiError;
