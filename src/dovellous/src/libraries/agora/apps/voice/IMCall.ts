import { K, Snippets } from "../../../app/helpers";

import Dom7 from 'dom7';

import * as ModuleBaseClasses from "../../../app/module-base-classes";

import * as AgoraTypeInterfaces from "../../lib/AgoraTypeInterfaces";

import { IMCallConfig } from "./IMCallConfig";

import { IMCallError } from "./IMCallErrors";
import AgoraRTC from "agora-rtc-sdk-ng";

// Parent constructor
class IMCall {

  framework7: any;

  imCallEvents: ModuleBaseClasses.DovellousLibraryEvent;

  imCallError:  AgoraTypeInterfaces.IMCallErrorInterface;

  imCallconfig: AgoraTypeInterfaces.IMCallConfigInterface;

  AgoraInstance: any;

  constructor(
    Framework7: any,
    Agora: any,
    ...imCallconfigSettings: Array<any>
  ) {

    this.framework7 = Framework7;

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
        "videoSettings": {
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

    this.init();

  }
  
  /**
   * Initiates a simple call
   * param destinationId string - The destination uuid of the callee
   * return null
   */
  async init() {

    this.AgoraInstance.agoraRTC.client = AgoraRTC.createClient(
      { 
        mode: "rtc", 
        codec: "h264" 
      }
    );
    
  }
  
  /**
   * Initiates a simple call
   * param destinationId string - The destination uuid of the callee
   * return null
   */
  async connect(callData: any, callID: any, callToken: any) {

      console.error(":::::: AGORA UID :::::: ", callData, Snippets.encryption.md5(callID), callToken, this.AgoraInstance.agoraOptions);
      
    this.AgoraInstance.agoraRTC.client.join(
      this.AgoraInstance.agoraOptions.config.appId, 
      this.AgoraInstance.agoraOptions.config.channelDefault, 
      callToken ?? null, 
      Snippets.encryption.md5(callID) ?? null
    ).then(async (uid)=>{

      // Create an audio track from the audio sampled by a microphone.
 
      this.AgoraInstance.agoraRTC.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack(
        {
          encoderConfig: {
            sampleRate: this.imCallconfig.encoder.sampleRate,
            stereo: this.imCallconfig.encoder.stereo,
            bitrate: this.imCallconfig.encoder.bitrate,
          },
        }
      );

      if(callData.isVideo){
      
        // Create a video track from the video captured by a camera.
        this.AgoraInstance.agoraRTC.localVideoTrack = await AgoraRTC.createCameraVideoTrack(
          {
            encoderConfig: {
              width: { 
                ideal: this.imCallconfig.videoSettings.encoding.width*.75, 
                min: this.imCallconfig.videoSettings.encoding.width*.5, 
                max: this.imCallconfig.videoSettings.encoding.width 
              },
              height: { 
                ideal: this.imCallconfig.videoSettings.encoding.height*.75, 
                min: this.imCallconfig.videoSettings.encoding.height*.5, 
                max: this.imCallconfig.videoSettings.encoding.height
              },
              frameRate: this.imCallconfig.videoSettings.encoding.frameRate,
              bitrateMin: this.imCallconfig.videoSettings.encoding.bitrateMin,
              bitrateMax: this.imCallconfig.videoSettings.encoding.bitrateMax,
            },
          }
        );

      }

      this.framework7.emit(
        K.ModuleComponentsLibs.im.callScreen.CONNECTED,
        {
          uid: uid,
          callData: callData,
          localAudioTrack: this.AgoraInstance.agoraRTC.localAudioTrack,
          localVideoTrack: callData.isVideo ? this.AgoraInstance.agoraRTC.localVideoTrack : null,
        }
      );

    });


  }

  async disconnect() {
    // Destroy the local audio and video tracks.
    this.AgoraInstance.agoraRTC.localAudioTrack !== null ? this.AgoraInstance.agoraRTC.localAudioTrack.close() : null;
    this.AgoraInstance.agoraRTC.localVideoTrack !== null ? this.AgoraInstance.agoraRTC.localVideoTrack.close() : null;
  
    // Traverse all remote users.
    this.AgoraInstance.agoraRTC.client.remoteUsers.forEach(user => {
      // Destroy the dynamically created DIV container.
      const playerContainer = document.getElementById(user.uid);
      playerContainer && playerContainer.remove();
    });
  
    // Leave the channel.
    await this.AgoraInstance.agoraRTC.client.leave();

    this.framework7.emit(
      K.ModuleComponentsLibs.im.callScreen.DISCONNECTED,
    );

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

