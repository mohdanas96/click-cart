interface ApiResponseType {
  statusCode: number;
  data: object;
  message: string;
}
class ApiResponse {
  constructor({ statusCode, data, message = "Success" }: ApiResponseType) {
    (this.statusCode = statusCode),
      (this.data = data),
      (this.message = message);
  }

  statusCode: number;
  data: object;
  message: string;
}

export { ApiResponse };
