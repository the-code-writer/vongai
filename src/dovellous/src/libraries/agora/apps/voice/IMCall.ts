import { K, Snippets } from "../../../app/helpers";

import Dom7 from 'dom7';

import * as ModuleBaseClasses from "../../../app/module-base-classes";

import * as AgoraTypeInterfaces from "../../lib/AgoraTypeInterfaces";

import { IMCallConfig } from "./IMCallConfig";

import { IMCallError } from "./IMCallErrors";

// Parent constructor
class IMCall {

  imCallEvents: ModuleBaseClasses.DovellousLibraryEvent;

  imCallError:  AgoraTypeInterfaces.IMCallErrorInterface;

  imCallconfig: AgoraTypeInterfaces.IMCallConfigInterface;

  AgoraInstance: any;

  constructor(
    Agora: any,
    ...imCallconfigSettings: Array<any>
  ) {

    this.imCallEvents = Agora.events;

    this.imCallError = IMCallError;

    if (
      Array.isArray(imCallconfigSettings) && 
      imCallconfigSettings.length > 0 && 
      imCallconfigSettings[0] instanceof IMCallConfig
    ) {

      this.imCallconfig = imCallconfigSettings[0];

    } else {

      const _imCallConfig:IMCallConfig = new Object();

      Object.defineProperties(_imCallConfig, {
        "encoder": {
          value: {
            sampleRate:  48000,
            stereo: true,    
            bitrate: 128,
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
        "videoCallConfig": {
          value: {
            encoding: {
              width: { 
                ideal: Dom7('html').width()*.75, 
                min: Dom7('html').width()*.5, 
                max: Dom7('html').width(),
              },
              height: { 
                ideal: Dom7('html').height()*.75, 
                min: Dom7('html').height()*.5, 
                max: Dom7('html').height(),
              },
              frameRate: 15,
              bitrateMin: 600, 
              bitrateMax: 1000,
            }
          },
          writable: false,
          enumerable: true,
          configurable: true
        },
      });

      this.imCallconfig = new IMCallConfig( _imCallConfig );

    }

    this.AgoraInstance = Agora;

  }
  
  /**
   * Initiates a simple call
   * param destinationId string - The destination uuid of the callee
   * return null
   */
  async init(callData) {

    this.AgoraInstance.xxx.agoraRTC.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
    
  }
  
  /**
   * Initiates a simple call
   * param destinationId string - The destination uuid of the callee
   * return null
   */
  async connect(callData) {

    
    const uid = this.AgoraInstance.xxx.agoraRTC.client.join(options.appId, options.channel, options.token, null).then(async (uid)=>{

      console.error(":::::: AGORA UID :::::: ", uid);
      
      // Create an audio track from the audio sampled by a microphone.
      
      this.AgoraInstance.xxx.agoraRTC.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack(
        {
          encoderConfig: {
            sampleRate: 48000,
            stereo: true,
            bitrate: 128,
          },
        }
      );
      
      // Create a video track from the video captured by a camera.
      this.AgoraInstance.xxx.agoraRTC.localVideoTrack = await AgoraRTC.createCameraVideoTrack(
        {
          encoderConfig: {
            width: { 
              ideal: Dom7('html').width()*.75, 
              min: Dom7('html').width()*.5, 
              max: Dom7('html').width() 
            },
            height: { 
              ideal: Dom7('html').height()*.75, 
              min: Dom7('html').height()*.5, 
              max: Dom7('html').height() 
            },
            frameRate: 15,
            bitrateMin: 600,
            bitrateMax: 1000,
          },
        }
      );

    });


  }

  async disconnect() {
    // Destroy the local audio and video tracks.
    this.AgoraInstance.xxx.agoraRTC.localAudioTrack.close();
    this.AgoraInstance.xxx.agoraRTC.localVideoTrack.close();
  
    // Traverse all remote users.
    this.AgoraInstance.xxx.agoraRTC.client.remoteUsers.forEach(user => {
      // Destroy the dynamically created DIV container.
      const playerContainer = document.getElementById(user.uid);
      playerContainer && playerContainer.remove();
    });
  
    // Leave the channel.
    await this.AgoraInstance.xxx.agoraRTC.client.leave();
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

