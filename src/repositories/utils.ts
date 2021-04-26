import {BaseError, InternalError} from "../error-handling/base";

export function getProcessedError(error: Error): BaseError {
  if (error == null) {
    return null;
  }

  let processedError: BaseError;

  switch (error.constructor) {
    // case (EntityNotFoundError):
    //   processedError = new RecordNotFoundError(error.message, error.stack);
    //   break;
    //
    // case (QueryFailedError):
    //   processedError = new DBQueryFailedError(error.message, error.stack);
    //   break;

    default :
      processedError = new InternalError(error.message, error.stack);
  }

  return processedError;
}
