import {K, Snippets} from "../../../app/helpers";

import * as ModuleBaseClasses from "../../../app/module-base-classes";

import { InstantMessagingConfigClass } from "./InstantMessagingConfig";

import { InstantMessagingError } from "./InstantMessagingErrors";

interface InstantMessagingConfigInterface {
  defaultChannel: string;
}

// Parent constructor
class InstantMessaging {

  instantMessagingError: InstantMessagingError;

  config: InstantMessagingConfigInterface;

  framework7Component: any;

	constructor(
    eventsLibrary: ModuleBaseClasses.DovellousLibraryEvent, 
    framework7: any, 
    defaultChannel: any | InstantMessagingConfigClass
  ) {

    this.instantMessagingError = new InstantMessagingError('', 0);

    if (defaultChannel instanceof InstantMessagingConfigClass) {

      this.config = defaultChannel;

    } else {

      this.config = new InstantMessagingConfigClass(defaultChannel);

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

export {InstantMessagingConfigInterface, InstantMessaging}

