import {K, Snippets} from "../../../app/helpers";

import * as AgoraTypeInterfaces from "../../lib/AgoraTypeInterfaces";

import {AgoraError} from "../../lib/AgoraError";

const VoiceCallError = {

  throwError: (errorMessage: any) => {

    throw new Error(errorMessage);

  },

  composeError: (errorCode: number, errorMessage: any, ...args:any) => {

    const agoraError = Snippets.errors.getErrorFromCode(errorCode);

    const err = new AgoraError(errorCode, agoraError);

    const voiceCallError: AgoraTypeInterfaces.AgoraErrorInterface = {
      status: err.statusCode,
      message: err.message,
      messageDescription: Array.isArray(args)?Snippets.strings.format(err.getErrorMessage(errorMessage), args):err.getErrorMessage(errorMessage),
      error: err
    }

    return voiceCallError;

  }

}

export { VoiceCallError }
