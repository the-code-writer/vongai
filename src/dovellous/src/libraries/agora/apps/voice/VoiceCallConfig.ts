import * as AgoraTypeInterfaces from "../../lib/AgoraTypeInterfaces";

export class VoiceCallConfig implements AgoraTypeInterfaces.VoiceCallConfigInterface {
  encoder: AgoraTypeInterfaces.VoiceCallEncoderConfigInterface ;
  localAudioTrack: AgoraTypeInterfaces.VoiceCallLocalAudioTrackConfigInterface;
  remoteAudioTrack: AgoraTypeInterfaces.VoiceCallRemoteAudioTrackConfigInterface;
  videoCallConfig: {
    encoder: AgoraTypeInterfaces.VideoCallEncoderConfigInterface | string;
  }
  constructor(
    _encoder: AgoraTypeInterfaces.VoiceCallEncoderConfigInterface | AgoraTypeInterfaces.VoiceCallConfigInterface,
    _localAudioTrack?: AgoraTypeInterfaces.VoiceCallLocalAudioTrackConfigInterface,
    _remoteAudioTrack?: AgoraTypeInterfaces.VoiceCallRemoteAudioTrackConfigInterface,
    _videoCallConfig?: AgoraTypeInterfaces.VideoCallConfigInterface,
  ) {

    if( typeof _encoder === "object" && _encoder.hasOwnProperty('encoder')){
      const _config: AgoraTypeInterfaces.VoiceCallConfigInterface = _encoder;
      this.encoder = _config.encoder;
      this.localAudioTrack = _config.localAudioTrack;
      this.remoteAudioTrack = _config.remoteAudioTrack;
      this.videoCallConfig = _config.videoCallConfig;
    }else{
      this.encoder = _encoder;
      this.localAudioTrack = _localAudioTrack;
      this.remoteAudioTrack = _remoteAudioTrack;
      this.videoCallConfig = _videoCallConfig;
    }
    
  }

}
