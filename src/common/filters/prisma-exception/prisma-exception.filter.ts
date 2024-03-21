import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '../base-exception.filter';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  public catch(_exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const contextResponse = context.getResponse();

    const contextRequest = context.getRequest();

    this.responseException(contextResponse, {
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      errorCode: `E${HttpStatus.SERVICE_UNAVAILABLE}`,
      message: 'Service unavailable.',
      path: contextRequest.url,
    });
  }
}
