interface AgoraErrorInterface {
  status: number;
  message: string;
  messageDescription: string;
  error: Error
}

interface VoiceCallConfigInterface {
  defaultChannel: string;
}

export { AgoraErrorInterface, VoiceCallConfigInterface } 