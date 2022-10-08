import { K, Snippets } from "../../../app/helpers";

import AgoraRTC, { IAgoraRTCClient, IAgoraRTCRemoteUser, MicrophoneAudioTrackInitConfig, CameraVideoTrackInitConfig, IMicrophoneAudioTrack, ICameraVideoTrack, ILocalVideoTrack, ILocalAudioTrack } from 'agora-rtc-sdk-ng';

import Dom7 from 'dom7';

import * as ModuleBaseClasses from "../../../app/module-base-classes";

import * as AgoraTypeInterfaces from "../../lib/AgoraTypeInterfaces";

import { IMCallConfig } from "./IMCallConfig";

import { IMCallError } from "./IMCallErrors";

// Parent constructor
class IMCall {

  Framework7Instance: any;

  AgoraInstance: any;

  imCallEvents: ModuleBaseClasses.DovellousLibraryEvent;

  imCallError:  AgoraTypeInterfaces.IMCallErrorInterface;

  imCallconfig: AgoraTypeInterfaces.IMCallConfigInterface;

  constructor( Framework7: any, Agora: any ) {

    this.Framework7Instance = Framework7;

    this.AgoraInstance = Agora;

    this.imCallEvents = Agora.events;

    this.imCallError = IMCallError;

    if (
      this.AgoraInstance.agoraConfig.hasOwnProperty('imCallConfig') &&
      Object.keys(this.AgoraInstance.agoraConfig.imCallConfig).length > 0
    ) {

      if(
        this.AgoraInstance.agoraConfig.imCallConfig.hasOwnProperty('audioSettings') &&
        this.AgoraInstance.agoraConfig.imCallConfig.hasOwnProperty('videoSettings')
        ){

        this.imCallconfig = new IMCallConfig(this.AgoraInstance.agoraConfig.imCallConfig);

      }else{

        this.imCallconfig = this.loadDefaultConfig();

      }

    } else {

      this.imCallconfig = this.loadDefaultConfig();

    }

  }

  loadDefaultConfig(){

    const imCallConfigInterfaceObject: any = new Object();

    Object.defineProperties(imCallConfigInterfaceObject, {
      "audioSettings": {
        value: {
          sampleRate: 48000,
          stereo: true,
          bitrate: 128,
        },
        writable: false,
        enumerable: true,
        configurable: true
      },
      "videoSettings": {
        value: {
          width: {
            ideal: Math.ceil(Dom7('html').width() * .75),
            min: Math.ceil(Dom7('html').width() * .5),
            max: Math.ceil(Dom7('html').width()),
          },
          height: {
            ideal: Math.ceil(Dom7('html').height() * .75),
            min: Math.ceil(Dom7('html').height() * .5),
            max: Math.ceil(Dom7('html').height()),
          },
          frameRate: 15,
          bitrateMin: 600,
          bitrateMax: 1000,
        },
        writable: false,
        enumerable: true,
        configurable: true
      },
      "localAudioTrack": {
        value: {
          volume: 50,
        },
        writable: false,
        enumerable: true,
        configurable: true
      },
      "remoteAudioTrack": {
        value: {
          volume: 50,
        },
        writable: false,
        enumerable: true,
        configurable: true
      },
    });

    const imCallConfigSettingsObject: AgoraTypeInterfaces.IMCallConfigInterface = imCallConfigInterfaceObject;

    return new IMCallConfig(imCallConfigSettingsObject);

  }

  generateVideoTrackConfig(cameraId: any){

    const videoTrackConfig: any = {
      cameraId: cameraId,
      encoderConfig: {
        width: this.imCallconfig.videoSettings.width,
        height: this.imCallconfig.videoSettings.height,
        frameRate: this.imCallconfig.videoSettings.frameRate,
        bitrateMin: this.imCallconfig.videoSettings.bitrateMin,
        bitrateMax: this.imCallconfig.videoSettings.bitrateMax,
      },
    }

    console.warn("... #################### generateVideoTrackConfig #################### ...", videoTrackConfig);

    return videoTrackConfig;

  }

  generateAudioTrackConfig(microphoneId: any){
    const audioTrackConfig: any = { 
      microphoneId: microphoneId,
      encoderConfig: {
        sampleRate: this.imCallconfig.audioSettings.sampleRate,
        stereo: this.imCallconfig.audioSettings.stereo,
        bitrate: this.imCallconfig.audioSettings.bitrate,
      }
    }
    
    console.warn("... #################### generateAudioTrackConfig #################### ...", audioTrackConfig);

    return audioTrackConfig;

  }

  throwError(message: string): void {

    this.imCallError.throwError(message);

  }

  invokeError(code: number, message: string, output: string | null | boolean, ...args: any): AgoraTypeInterfaces.AgoraErrorInterface {

    const err = this.imCallError.composeError(code, message, args);

    if (output && output !== null) {

      switch (output.toString().toLowerCase()) {

        case 'error': {
          console.error(err);
          break;
        }

        case 'warn': {
          console.warn(err);
          break;
        }

        case 'log': {
          console.log(err);
          break;
        }

        case 'info': {
          console.info(err);
          break;
        }

        default: {
          console.log(err);
          break;
        }

      }

    }

    return err;

  }

}

export { IMCall, IMCallConfig, IMCallError }

