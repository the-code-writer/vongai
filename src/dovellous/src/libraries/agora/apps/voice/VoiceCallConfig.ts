import {K} from "../../../app/helpers";

export interface VoiceCallConfigInterface {
  defaultChannel: string;
}

export class VoiceCallConfigClass implements VoiceCallConfigInterface {
  defaultChannel: string;
  constructor(defaultChannel: string = K.Events.Modules.Agora.AgoraDefaults.DEFAULT_VOICECALL_CHANNEL) {
    this.defaultChannel = defaultChannel;
  }
}
