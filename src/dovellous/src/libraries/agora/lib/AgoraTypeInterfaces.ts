
interface VoiceCallEncoderConfigInterface {
  sampleRate:  number;
  stereo: boolean;    
  bitrate: number;
}

interface VideoCallEncoderConfigInterface {
  width: { 
    ideal: number, 
    min: number, 
    max: number 
  },
  height: { 
    ideal: number, 
    min: number, 
    max: number 
  },
  frameRate: number,
  bitrateMin: number, 
  bitrateMax: number,
}

interface VoiceCallLocalAudioTrackConfigInterface {
  volume: number;
}

interface VoiceCallRemoteAudioTrackConfigInterface {
  volume: number;
}

interface VideoCallConfigInterface {
  encoder: VideoCallEncoderConfigInterface;
}

interface VoiceCallConfigInterface {
  encoder: VoiceCallEncoderConfigInterface;
  localAudioTrack: VoiceCallLocalAudioTrackConfigInterface;
  remoteAudioTrack: VoiceCallRemoteAudioTrackConfigInterface;
  videoCallConfig: {
    encoder: VideoCallEncoderConfigInterface | string; //720p_1
  }
}

interface AgoraConfigInterface {
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
  VoiceCallEncoderConfigInterface,
  VoiceCallLocalAudioTrackConfigInterface,
  VoiceCallRemoteAudioTrackConfigInterface,
  VideoCallEncoderConfigInterface,
  VoiceCallErrorInterface, 
  VoiceCallConfigInterface,
  VideoCallConfigInterface,
} 