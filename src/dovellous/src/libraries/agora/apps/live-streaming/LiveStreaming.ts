import {K, Snippets} from "../../../app/helpers";

import * as ModuleBaseClasses from "../../../app/module-base-classes";

import { LiveStreamingConfigClass } from "./LiveStreamingConfig";

import { LiveStreamingError } from "./LiveStreamingErrors";

interface LiveStreamingConfigInterface {
  defaultChannel: string;
}

// Parent constructor
class LiveStreaming {

  liveStreamingError: LiveStreamingError;

  config: LiveStreamingConfigInterface;

  framework7Component: any;

	constructor(
    eventsLibrary: ModuleBaseClasses.DovellousLibraryEvent, 
    framework7: any, 
    defaultChannel: any | LiveStreamingConfigClass
  ) {

    this.liveStreamingError = new LiveStreamingError('', 0);

    if (defaultChannel instanceof LiveStreamingConfigClass) {

      this.config = defaultChannel;

    } else {

      this.config = new LiveStreamingConfigClass(defaultChannel);

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

export {LiveStreamingConfigInterface, LiveStreaming}

