
interface VoiceCallConfigInterface {
  defaultChannel: string;
}

interface AgoraConfigInterface {
  voiceCallConfig: any,  
}

interface AgoraInterface {
	voiceCallConfig: VoiceCallConfigInterface,
}

interface AgoraErrorInterface {
  status: number;
  message: string;
  messageDescription: string;
  error: Error
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