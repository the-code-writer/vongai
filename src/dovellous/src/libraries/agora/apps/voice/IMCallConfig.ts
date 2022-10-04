import * as AgoraTypeInterfaces from "../../lib/AgoraTypeInterfaces";

export class IMCallConfig implements AgoraTypeInterfaces.IMCallConfigInterface {
  cameraId: string;  
  audioSettings: AgoraTypeInterfaces.IMCallEncoderConfigInterface ;
  localAudioTrack: AgoraTypeInterfaces.IMCallLocalAudioTrackConfigInterface;
  remoteAudioTrack: AgoraTypeInterfaces.IMCallRemoteAudioTrackConfigInterface;
  videoSettings: AgoraTypeInterfaces.VideoCallEncoderConfigInterface;
  constructor(
    _audioSettings: AgoraTypeInterfaces.IMCallEncoderConfigInterface | AgoraTypeInterfaces.IMCallConfigInterface,
    _localAudioTrack?: AgoraTypeInterfaces.IMCallLocalAudioTrackConfigInterface,
    _remoteAudioTrack?: AgoraTypeInterfaces.IMCallRemoteAudioTrackConfigInterface,
    _videoSettings?: AgoraTypeInterfaces.VideoCallEncoderConfigInterface,
    
  ) {

    if( typeof _audioSettings === "object" && _audioSettings.hasOwnProperty('videoSettings')){
      const imCallConfigSettings: AgoraTypeInterfaces.IMCallEncoderConfigInterface | AgoraTypeInterfaces.IMCallConfigInterface = _audioSettings;
      this.audioSettings    = imCallConfigSettings.audioSettings;
      this.localAudioTrack  = imCallConfigSettings.localAudioTrack;
      this.remoteAudioTrack = imCallConfigSettings.remoteAudioTrack;
      this.videoSettings    = imCallConfigSettings.videoSettings;
    }else{
      this.audioSettings    = _audioSettings;
      this.localAudioTrack  = _localAudioTrack;
      this.remoteAudioTrack = _remoteAudioTrack;
      this.videoSettings    = _videoSettings;
    }
    
  }

}
