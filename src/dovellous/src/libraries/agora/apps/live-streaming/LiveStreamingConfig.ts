import {K} from "../../../app/helpers";

export interface LiveStreamingConfigInterface {
  defaultChannel: string;
}

export class LiveStreamingConfigClass implements LiveStreamingConfigInterface {
  defaultChannel: string;
  constructor(defaultChannel: string = K.Events.Modules.Agora.AgoraDefaults.DEFAULT_LIVE_STREAMING_CHANNEL) {
    this.defaultChannel = defaultChannel;
  }
}