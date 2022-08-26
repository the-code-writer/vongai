import { VoiceCallConfig } from "../apps/voice/VoiceCallConfig";

export interface AgoraConfigInterface {

  voiceCall: VoiceCallConfig,
  
}

export class Config implements AgoraConfigInterface {

  voiceCall: VoiceCallConfig;

  constructor(

    voiceCall: VoiceCallConfig,

  ) {
    
    this.voiceCall = voiceCall;

  }

}
