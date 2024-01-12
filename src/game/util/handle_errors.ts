import { HttpException, HttpStatus } from '@nestjs/common';

export function handleError(error: Error): never {
  if (error instanceof HttpException) {
    throw error;
  } else {
    throw new HttpException(
      'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
