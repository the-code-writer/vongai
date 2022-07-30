import {K} from "../../../app/helpers";

export interface VideoCallConfig {
  defaultChannel: string;
}

export class Config implements VideoCallConfig {
  defaultChannel: string;
  constructor(defaultChannel: string = K.Events.Modules.Agora.AgoraDefaults.DEFAULT_VIDEOCALL_CHANNEL) {
    this.defaultChannel = defaultChannel;
  }
}
