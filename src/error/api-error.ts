class ApiError {
    message: any;
    code: any;
    constructor(code: any, message: any){
        this.message = message;
        this.code = code;
    }
    static badRequest(msg: any){
        return new ApiError(400, msg);
    }
}
export = ApiError;