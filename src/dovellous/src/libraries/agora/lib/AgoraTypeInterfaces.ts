import { IAgoraRTCClient } from "agora-rtc-sdk-ng";

interface IMCallEncoderConfigInterface {
  microphoneId?: string;
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

interface IMCallConfigInterface {
  cameraId?: string;
  audioSettings: IMCallEncoderConfigInterface;
  localAudioTrack: IMCallLocalAudioTrackConfigInterface;
  remoteAudioTrack: IMCallRemoteAudioTrackConfigInterface;
  videoSettings: VideoCallEncoderConfigInterface; //720p_1
}

interface AgoraConfigInterface {
  appId: any;
	primaryCertificate?: any;
  clientCodec?: string;
  clientMode?: string;
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
  RTCInterface,
} 