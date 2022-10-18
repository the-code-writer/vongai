import * as FirebaseTypeInterfaces from "../../lib/FirebaseTypeInterfaces";

export class RealtimeDatabaseConfig implements FirebaseTypeInterfaces.RealtimeDatabaseConfigInterface {
  cameraId: string;  
  audioSettings: FirebaseTypeInterfaces.RealtimeDatabaseEncoderConfigInterface ;
  localAudioTrack: FirebaseTypeInterfaces.RealtimeDatabaseLocalAudioTrackConfigInterface;
  remoteAudioTrack: FirebaseTypeInterfaces.RealtimeDatabaseRemoteAudioTrackConfigInterface;
  videoSettings: FirebaseTypeInterfaces.VideoCallEncoderConfigInterface;
  constructor(
    _audioSettings: FirebaseTypeInterfaces.RealtimeDatabaseEncoderConfigInterface | FirebaseTypeInterfaces.RealtimeDatabaseConfigInterface,
    _localAudioTrack?: FirebaseTypeInterfaces.RealtimeDatabaseLocalAudioTrackConfigInterface,
    _remoteAudioTrack?: FirebaseTypeInterfaces.RealtimeDatabaseRemoteAudioTrackConfigInterface,
    _videoSettings?: FirebaseTypeInterfaces.VideoCallEncoderConfigInterface,
    
  ) {

    if( typeof _audioSettings === "object" && _audioSettings.hasOwnProperty('videoSettings')){
      const imCallConfigSettings: FirebaseTypeInterfaces.RealtimeDatabaseEncoderConfigInterface | FirebaseTypeInterfaces.RealtimeDatabaseConfigInterface = _audioSettings;
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
