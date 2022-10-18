import {Snippets} from "../../../app/helpers";

import * as FirebaseTypeInterfaces from "../../lib/FirebaseTypeInterfaces";

import {FirebaseError} from "../../lib/FirebaseError";

const RealtimeDatabaseError: FirebaseTypeInterfaces.RealtimeDatabaseErrorInterface = {

  throwError: (errorMessage: any) : void => {

    throw new Error(`IM Call Error: ${errorMessage}`);

  },

  composeError: (errorCode: number, errorMessage: any, args:any) : FirebaseTypeInterfaces.FirebaseErrorInterface => {

    const firebaseError = Snippets.errors.getErrorFromCode(errorCode);

    const err = new FirebaseError(errorCode, firebaseError);

    const realtimeDatabaseError: FirebaseTypeInterfaces.FirebaseErrorInterface = {
      status: err.statusCode,
      message: err.message,
      messageDescription: Array.isArray(args)?
        Snippets.strings.format(err.getErrorMessage(errorMessage), args):
        err.getErrorMessage(errorMessage),
      error: err
    }

    return realtimeDatabaseError;

  }

}

export { RealtimeDatabaseError }
