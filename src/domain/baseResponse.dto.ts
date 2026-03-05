export class BaseResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T | undefined;
  error?: string | undefined;

  constructor(success: boolean, message: string, data?: T, error?: string) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.error = error;
  }

  static success<T>(data: T, message = 'Success'): BaseResponse<T> {
    return new BaseResponse(true, message, data);
  }

  static error(message: string, error?: string): BaseResponse {
    return new BaseResponse(false, message, undefined, error);
  }
}
