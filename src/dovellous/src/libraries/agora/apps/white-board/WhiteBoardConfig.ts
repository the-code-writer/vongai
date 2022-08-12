import {K} from "../../../app/helpers";

export interface WhiteBoardConfig {
  defaultChannel: string;
}

export class Config implements WhiteBoardConfig {
  defaultChannel: string;
  constructor(defaultChannel: string = K.Events.Modules.Agora.AgoraDefaults.DEFAULT_WHITEBOARD_CHANNEL) {
    this.defaultChannel = defaultChannel;
  }
}
