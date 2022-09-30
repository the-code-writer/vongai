import * as AgoraTypeInterfaces from "../../lib/AgoraTypeInterfaces";

export class IMCallConfig implements AgoraTypeInterfaces.IMCallConfigInterface {
  audioSettings: AgoraTypeInterfaces.IMCallEncoderConfigInterface ;
  localAudioTrack: AgoraTypeInterfaces.IMCallLocalAudioTrackConfigInterface;
  remoteAudioTrack: AgoraTypeInterfaces.IMCallRemoteAudioTrackConfigInterface;
  videoSettings: AgoraTypeInterfaces.VideoCallEncoderConfigInterface | string;
  constructor(
    _audioSettings: AgoraTypeInterfaces.IMCallEncoderConfigInterface | AgoraTypeInterfaces.IMCallConfigInterface,
    _localAudioTrack?: AgoraTypeInterfaces.IMCallLocalAudioTrackConfigInterface,
    _remoteAudioTrack?: AgoraTypeInterfaces.IMCallRemoteAudioTrackConfigInterface,
    _videoSettings?: AgoraTypeInterfaces.VideoCallEncoderConfigInterface,
    
  ) {

    if( typeof _audioSettings === "object" && _audioSettings.hasOwnProperty('videoSettings')){
      const _config: AgoraTypeInterfaces.IMCallConfigInterface = _audioSettings;
      this.audioSettings = _config.audioSettings;
      this.localAudioTrack = _config.localAudioTrack;
      this.remoteAudioTrack = _config.remoteAudioTrack;
      this.videoSettings = _config.videoSettings;
    }else{
      this.audioSettings = _audioSettings;
      this.localAudioTrack = _localAudioTrack;
      this.remoteAudioTrack = _remoteAudioTrack;
      this.videoSettings = _videoSettings;
    }
    
  }

}
