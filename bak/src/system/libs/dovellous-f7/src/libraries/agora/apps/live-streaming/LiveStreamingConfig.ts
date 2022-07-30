import {K} from "../../../app/helpers";

export interface LiveStreamingConfig {
  defaultChannel: string;
}

export class Config implements LiveStreamingConfig {
  defaultChannel: string;
  constructor(defaultChannel: string = K.Events.Modules.Agora.AgoraDefaults.DEFAULT_LIVE_STREAMING_CHANNEL) {
    this.defaultChannel = defaultChannel;
  }
}
