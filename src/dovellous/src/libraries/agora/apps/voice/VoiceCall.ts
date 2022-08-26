import { K, Snippets } from "../../../app/helpers";

import * as ModuleBaseClasses from "../../../app/module-base-classes";

import * as AgoraTypeInterfaces from "../../lib/AgoraTypeInterfaces";

import { VoiceCallConfig } from "./VoiceCallConfig";

import { VoiceCallError } from "./VoiceCallErrors";

// Parent constructor
class VoiceCall {

  voiceCallEvents: ModuleBaseClasses.DovellousLibraryEvent;

  voiceCallError: AgoraTypeInterfaces.VoiceCallErrorInterface;

  voiceCallconfig: AgoraTypeInterfaces.VoiceCallConfigInterface;

  Framework7AppInstance: any;

  constructor(
    DovellousEvents: ModuleBaseClasses.DovellousLibraryEvent,
    Framework7App: any,
    defaultChannel: any | VoiceCallConfig
  ) {

    this.voiceCallEvents = DovellousEvents;

    this.voiceCallError = VoiceCallError;

    if (defaultChannel instanceof VoiceCallConfig) {

      this.voiceCallconfig = defaultChannel;

    } else {

      this.voiceCallconfig = new VoiceCallConfig(defaultChannel);

    }

    this.Framework7AppInstance = Framework7App;

  }
  /**
   * Initiates a simple call
   * param destinationId string - The destination uuid of the callee
   * return null
   */
  async start(destinationId, isGroupCall) {

    const sourceId = "26772128622";
    const sourceTitle = "Douglas Maposa";
    const sourceSubTitle = "Technical Engineer";

    let _data = {
      source: {
        callerNumber: sourceId,
        callerTitle: sourceTitle,
        callerSubTitle: sourceSubTitle,
      },
      destination: {
        calleeNumber: destinationId,
        calleeTitle: "",
        calleeSubTitle: "",
      },
      payload: {
        params: arguments,
      }
    };

    this.invokeError(3456, 'This is a mesage to test the error function', null);

    return _data;

  }

  throwError(message: string): void {

    this.voiceCallError.throwError(message);

  }

  invokeError(code: number, message: string, output: string | null | boolean, ...args: any): AgoraTypeInterfaces.AgoraErrorInterface {

    const err = this.voiceCallError.composeError(code, message, args);

    if (output && output !== null) {

      switch (output.toString().toLowerCase()) {

        case 'error': {
          console.error(err);
          break;
        }

        case 'warn': {
          console.warn(err);
          break;
        }

        case 'log': {
          console.log(err);
          break;
        }

        case 'info': {
          console.info(err);
          break;
        }

        default: {
          console.log(err);
          break;
        }

      }

    }

    return err;

  }

}

export { VoiceCall, VoiceCallConfig, VoiceCallError }

