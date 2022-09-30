import * as AgoraTypeInterfaces from "../../lib/AgoraTypeInterfaces";

export class IMCallConfig implements AgoraTypeInterfaces.IMCallConfigInterface {
  encoder: AgoraTypeInterfaces.IMCallEncoderConfigInterface ;
  localAudioTrack: AgoraTypeInterfaces.IMCallLocalAudioTrackConfigInterface;
  remoteAudioTrack: AgoraTypeInterfaces.IMCallRemoteAudioTrackConfigInterface;
  videoSettings: {
    encoder: AgoraTypeInterfaces.VideoCallEncoderConfigInterface | string;
  }
  constructor(
    _encoder: AgoraTypeInterfaces.IMCallEncoderConfigInterface | AgoraTypeInterfaces.IMCallConfigInterface,
    _localAudioTrack?: AgoraTypeInterfaces.IMCallLocalAudioTrackConfigInterface,
    _remoteAudioTrack?: AgoraTypeInterfaces.IMCallRemoteAudioTrackConfigInterface,
    _videoSettings?: AgoraTypeInterfaces.VideoCallConfigInterface,
  ) {

    if( typeof _encoder === "object" && _encoder.hasOwnProperty('encoder')){
      const _config: AgoraTypeInterfaces.IMCallConfigInterface = _encoder;
      this.encoder = _config.encoder;
      this.localAudioTrack = _config.localAudioTrack;
      this.remoteAudioTrack = _config.remoteAudioTrack;
      this.videoSettings = _config.videoSettings;
    }else{
      this.encoder = _encoder;
      this.localAudioTrack = _localAudioTrack;
      this.remoteAudioTrack = _remoteAudioTrack;
      this.videoSettings = _videoSettings;
    }
    
  }

}
