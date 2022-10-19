import * as FirebaseTypeInterfaces from "../../lib/FirebaseTypeInterfaces";

export class AuthConfig implements FirebaseTypeInterfaces.AuthConfigInterface {
  cameraId: string;  
  audioSettings: FirebaseTypeInterfaces.AuthEncoderConfigInterface ;
  localAudioTrack: FirebaseTypeInterfaces.AuthLocalAudioTrackConfigInterface;
  remoteAudioTrack: FirebaseTypeInterfaces.AuthRemoteAudioTrackConfigInterface;
  videoSettings: FirebaseTypeInterfaces.VideoCallEncoderConfigInterface;
  constructor(
    _audioSettings: FirebaseTypeInterfaces.AuthEncoderConfigInterface | FirebaseTypeInterfaces.AuthConfigInterface,
    _localAudioTrack?: FirebaseTypeInterfaces.AuthLocalAudioTrackConfigInterface,
    _remoteAudioTrack?: FirebaseTypeInterfaces.AuthRemoteAudioTrackConfigInterface,
    _videoSettings?: FirebaseTypeInterfaces.VideoCallEncoderConfigInterface,
    
  ) {

    if( typeof _audioSettings === "object" && _audioSettings.hasOwnProperty('videoSettings')){
      const imCallConfigSettings: FirebaseTypeInterfaces.AuthEncoderConfigInterface | FirebaseTypeInterfaces.AuthConfigInterface = _audioSettings;
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
