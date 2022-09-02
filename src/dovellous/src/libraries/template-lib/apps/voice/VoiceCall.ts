import {K, Snippets} from "../../../app/helpers";
import * as ModuleBaseClasses from "../../../app/module-base-classes";

import { IMCallError } from "./IMCallErrors";
import { Config, IMCallConfig } from "./IMCallConfig";

// Parent constructor
class IMCall {

  config: IMCallConfig;

  framework7Component: any;

	constructor(eventsLibrary: ModuleBaseClasses.DovellousLibraryEvent, framework7Component: any, defaultChannel: any | Config) {
    if (defaultChannel instanceof Config) {
      this.config = defaultChannel;
    } else {
      this.config = new Config(defaultChannel);
    }
    this.framework7Component = framework7Component;
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

export {IMCallConfig, IMCall}

