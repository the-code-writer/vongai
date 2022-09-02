import {Snippets} from "../../../app/helpers";

import * as AgoraTypeInterfaces from "../../lib/AgoraTypeInterfaces";

import {AgoraError} from "../../lib/AgoraError";

const IMCallError: AgoraTypeInterfaces.IMCallErrorInterface = {

  throwError: (errorMessage: any) : void => {

    throw new Error(`IM Call Error: ${errorMessage}`);

  },

  composeError: (errorCode: number, errorMessage: any, args:any) : AgoraTypeInterfaces.AgoraErrorInterface => {

    const agoraError = Snippets.errors.getErrorFromCode(errorCode);

    const err = new AgoraError(errorCode, agoraError);

    const imCallError: AgoraTypeInterfaces.AgoraErrorInterface = {
      status: err.statusCode,
      message: err.message,
      messageDescription: Array.isArray(args)?
        Snippets.strings.format(err.getErrorMessage(errorMessage), args):
        err.getErrorMessage(errorMessage),
      error: err
    }

    return imCallError;

  }

}

export { IMCallError }
