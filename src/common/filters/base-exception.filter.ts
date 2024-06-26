import { ResponseExceptionInputDto } from './dtos/response-exception-input.dto';

export class BaseExceptionFilter {
  public responseException(
    contextResponse: any,
    responseExceptionInputDto: ResponseExceptionInputDto,
  ): void {
    contextResponse.status(responseExceptionInputDto.statusCode).json({
      errorCode: responseExceptionInputDto.errorCode,
      message: responseExceptionInputDto.message,
      path: responseExceptionInputDto.path,
      dateTime: new Date(),
    });
  }
}
