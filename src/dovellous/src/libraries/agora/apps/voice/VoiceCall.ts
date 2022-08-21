import {K, Snippets} from "../../../app/helpers";

import * as ModuleBaseClasses from "../../../app/module-base-classes";

import { VoiceCallConfigClass } from "./VoiceCallConfig";

import { VoiceCallError } from "./VoiceCallErrors";

interface VoiceCallConfigInterface {
  defaultChannel: string;
}

// Parent constructor
class VoiceCall {

  voiceCallError: VoiceCallError;

  config: VoiceCallConfigInterface;

  framework7Component: any;

	constructor(
    eventsLibrary: ModuleBaseClasses.DovellousLibraryEvent, 
    framework7: any, 
    defaultChannel: any | VoiceCallConfigClass
  ) {

    this.voiceCallError = new VoiceCallError('', 0);

    if (defaultChannel instanceof VoiceCallConfigClass) {

      this.config = defaultChannel;

    } else {

      this.config = new VoiceCallConfigClass(defaultChannel);

    }

    this.framework7Component = framework7;

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

		return _data;

	}
                    
}

export {VoiceCallConfigInterface, VoiceCall}

