import {K} from "../../../app/helpers";

export interface VoiceCallConfig {
  defaultChannel: string;
}

export class Config implements VoiceCallConfig {
  defaultChannel: string;
  constructor(defaultChannel: string = K.Events.Modules.Agora.AgoraDefaults.DEFAULT_VOICECALL_CHANNEL) {
    this.defaultChannel = defaultChannel;
  }
}
