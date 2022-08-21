import {K} from "../../../app/helpers";

export interface InstantMessagingConfigInterface {
  defaultChannel: string;
}

export class InstantMessagingConfigClass implements InstantMessagingConfigInterface {
  defaultChannel: string;
  constructor(defaultChannel: string = K.Events.Modules.Agora.AgoraDefaults.DEFAULT_INSTANT_MESSAGING_CHANNEL) {
    this.defaultChannel = defaultChannel;
  }
}
