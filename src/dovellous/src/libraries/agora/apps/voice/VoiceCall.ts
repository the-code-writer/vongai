import {K, Snippets} from "../../../app/helpers";

import * as ModuleBaseClasses from "../../../app/module-base-classes";

import * as AgoraTypeInterfaces from "../../lib/AgoraTypeInterfaces";

import { VoiceCallConfig} from "./VoiceCallConfig";

import { VoiceCallError } from "./VoiceCallErrors";

// Parent constructor
class VoiceCall {

  voiceCallError: any;

  voiceCallconfig: AgoraTypeInterfaces.VoiceCallConfigInterface;

  framework7Component: any;

	constructor(
    eventsLibrary: ModuleBaseClasses.DovellousLibraryEvent, 
    framework7: any, 
    defaultChannel: any | VoiceCallConfig
  ) {

    this.voiceCallError = VoiceCallError;

    if (defaultChannel instanceof VoiceCallConfig) {

      this.voiceCallconfig = defaultChannel;

    } else {

      this.voiceCallconfig = new VoiceCallConfig(defaultChannel);

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

export { VoiceCall, VoiceCallConfig, VoiceCallError }

