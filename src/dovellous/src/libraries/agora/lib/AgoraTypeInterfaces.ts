interface AgoraConfigInterface {

  voiceCall: any,
  
}

interface AgoraErrorInterface {
  status: number;
  message: string;
  messageDescription: string;
  error: Error
}

interface VoiceCallConfigInterface {
  defaultChannel: string;
}

interface VoiceCallErrorInterface {
  throwError: Function;
  composeError: Function;
}


export { 
  AgoraConfigInterface, 
  AgoraErrorInterface, 
  VoiceCallErrorInterface, 
  VoiceCallConfigInterface 
} 