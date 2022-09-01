import { K, Snippets } from "../../../app/helpers";

import * as ModuleBaseClasses from "../../../app/module-base-classes";

import * as AgoraTypeInterfaces from "../../lib/AgoraTypeInterfaces";

import { VoiceCallConfig } from "./VoiceCallConfig";

import { VoiceCallError } from "./VoiceCallErrors";
import Dom7 from 'dom7';

// Parent constructor
class VoiceCall {

  voiceCallEvents: ModuleBaseClasses.DovellousLibraryEvent;

  voiceCallError: AgoraTypeInterfaces.VoiceCallErrorInterface;

  voiceCallconfig: AgoraTypeInterfaces.VoiceCallConfigInterface;

  Framework7AppInstance: any;

  constructor(
    DovellousEvents: ModuleBaseClasses.DovellousLibraryEvent,
    Framework7App: any,
    ...voiceCallconfigSettings: Array<any>
  ) {

    this.voiceCallEvents = DovellousEvents;

    this.voiceCallError = VoiceCallError;

    if (
      Array.isArray(voiceCallconfigSettings) && 
      voiceCallconfigSettings.length > 0 && 
      voiceCallconfigSettings[0] instanceof VoiceCallConfig
    ) {

      this.voiceCallconfig = voiceCallconfigSettings[0];

    } else {

      const _voiceCallConfig:VoiceCallConfig = {};

      Object.defineProperties(_voiceCallConfig, {
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

      this.voiceCallconfig = new VoiceCallConfig( _voiceCallConfig );

    }

    this.Framework7AppInstance = Framework7App;

  }
  /**
   * Initiates a simple call
   * param destinationId string - The destination uuid of the callee
   * return null
   */
  async start(callData) {

    

  }

  throwError(message: string): void {

    this.voiceCallError.throwError(message);

  }

  invokeError(code: number, message: string, output: string | null | boolean, ...args: any): AgoraTypeInterfaces.AgoraErrorInterface {

    const err = this.voiceCallError.composeError(code, message, args);

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

export { VoiceCall, VoiceCallConfig, VoiceCallError }

