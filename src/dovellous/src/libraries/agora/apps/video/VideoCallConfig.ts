import {K} from "../../../app/helpers";

export interface VideoCallConfigInterface {
  defaultChannel: string;
}

export class VideoCallConfigClass implements VideoCallConfigInterface {
  defaultChannel: string;
  constructor(defaultChannel: string = K.Events.Modules.Agora.AgoraDefaults.DEFAULT_VIDEOCALL_CHANNEL) {
    this.defaultChannel = defaultChannel;
  }
}
