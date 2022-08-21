import {K} from "../../../app/helpers";

export interface WhiteBoardConfigInterface {
  defaultChannel: string;
}

export class WhiteBoardConfigClass implements WhiteBoardConfigInterface {
  defaultChannel: string;
  constructor(defaultChannel: string = K.Events.Modules.Agora.AgoraDefaults.DEFAULT_WHITEBOARD_CHANNEL) {
    this.defaultChannel = defaultChannel;
  }
}