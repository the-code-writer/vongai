import {K} from "../../../app/helpers";

export interface IMCallConfig {
  defaultChannel: string;
}

export class Config implements IMCallConfig {
  defaultChannel: string;
  constructor(defaultChannel: string = K.Events.Modules.Agora.AgoraDefaults.DEFAULT_IMCALL_CHANNEL) {
    this.defaultChannel = defaultChannel;
  }
}
