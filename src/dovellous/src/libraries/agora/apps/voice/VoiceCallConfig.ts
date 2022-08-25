import {K} from "../../../app/helpers";
import * as AgoraTypeInterfaces from "../../lib/AgoraTypeInterfaces";

export class VoiceCallConfig implements AgoraTypeInterfaces.VoiceCallConfigInterface {
  defaultChannel: string;
  constructor(defaultChannel: string = K.Events.Modules.Agora.AgoraDefaults.DEFAULT_VOICECALL_CHANNEL) {
    this.defaultChannel = defaultChannel;
  }
}
