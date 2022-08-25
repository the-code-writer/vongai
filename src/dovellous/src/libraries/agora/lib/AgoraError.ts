export class AgoraError extends Error {

  statusCode: number = 0;

  constructor(status: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, AgoraError.prototype);
    this.statusCode = status;
  }

  getErrorMessage(errorMessage: any) {

    return `${this.message.toString()}:${errorMessage.toString()}`;

  }

  fetchError(errorCode: number, errorMessage: any) {

    return `${errorCode.toString()}:${errorMessage.toString()}`;

  }

}
