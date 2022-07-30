import {K} from "../../../app/helpers";

export interface InstantMessagingConfig {
  defaultChannel: string;
}

export class Config implements InstantMessagingConfig {
  defaultChannel: string;
  constructor(defaultChannel: string = K.Events.Modules.Agora.AgoraDefaults.DEFAULT_INSTANT_MESSAGING_CHANNEL) {
    this.defaultChannel = defaultChannel;
  }
}
