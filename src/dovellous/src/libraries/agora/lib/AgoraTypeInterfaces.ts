
interface IMCallEncoderConfigInterface {
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

interface IMCallLocalAudioTrackConfigInterface {
  volume: number;
}

interface IMCallRemoteAudioTrackConfigInterface {
  volume: number;
}

interface VideoCallConfigInterface {
  encoder: VideoCallEncoderConfigInterface;
}

interface IMCallConfigInterface {
  encoder: IMCallEncoderConfigInterface;
  localAudioTrack: IMCallLocalAudioTrackConfigInterface;
  remoteAudioTrack: IMCallRemoteAudioTrackConfigInterface;
  videoCallConfig: {
    encoder: VideoCallEncoderConfigInterface | string; //720p_1
  }
}

interface AgoraConfigInterface {
  appId: any;
	primaryCertificate?: any;
	channels?: any;
	defaultChannel?: any;
	imCallConfig?: IMCallConfigInterface; 
}

interface AgoraErrorInterface {
  status: number;
  message: string;
  messageDescription: string;
  error: Error
}

interface IMCallErrorInterface {
  throwError: Function;
  composeError: Function;
}

interface RTCInterface {
  client: IAgoraRTCClient | null,
  localAudioTrack: any,
  localVideoTrack: any
}

export { 
  AgoraConfigInterface, 
  AgoraErrorInterface,
  IMCallEncoderConfigInterface,
  IMCallLocalAudioTrackConfigInterface,
  IMCallRemoteAudioTrackConfigInterface,
  VideoCallEncoderConfigInterface,
  IMCallErrorInterface, 
  IMCallConfigInterface,
  VideoCallConfigInterface,
  RTCInterface,
} 