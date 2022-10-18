import { K, Snippets } from "../../app/helpers";

import Dom7 from 'dom7';

import * as ModuleBaseClasses from "../../app/module-base-classes";

import * as FirebaseTypeInterfaces from "../lib/FirebaseTypeInterfaces";

import { FirebaseConfig } from "../lib/FirebaseConfig";

import { FirebaseError } from "../lib/FirebaseError";

// Parent constructor
class RealtimeDatabase {

  Framework7Instance: any;

  FirebaseInstance: any;

  firebaseEvents: ModuleBaseClasses.DovellousLibraryEvent;

  firebaseError:  FirebaseTypeInterfaces.FirebaseErrorInterface;

  firebaseconfig: FirebaseTypeInterfaces.FirebaseConfigInterface;

  constructor( Firebase: any ) {

    this.FirebaseInstance = Firebase;

    this.firebaseEvents = Firebase.events;

    this.firebaseError = FirebaseError;

    if (
      this.FirebaseInstance.firebaseConfig.hasOwnProperty('firebaseConfig') &&
      Object.keys(this.FirebaseInstance.firebaseConfig).length > 0
    ) {

      if(
        this.FirebaseInstance.firebaseConfig.hasOwnProperty('audioSettings') &&
        this.FirebaseInstance.firebaseConfig.hasOwnProperty('videoSettings')
        ){

        this.firebaseconfig = new FirebaseConfig(this.FirebaseInstance.firebaseConfig);

      }else{

        this.firebaseconfig = this.loadDefaultConfig();

      }

    } else {

      this.firebaseconfig = this.loadDefaultConfig();

    }

  }

  loadDefaultConfig(){

    const firebaseConfigInterfaceObject: any = new Object();

    Object.defineProperties(firebaseConfigInterfaceObject, {
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

    const firebaseConfigSettingsObject: FirebaseTypeInterfaces.FirebaseConfigInterface = firebaseConfigInterfaceObject;

    return new FirebaseConfig(firebaseConfigSettingsObject);

  }

  generateVideoTrackConfig(cameraId: any){

    const videoTrackConfig: any = {
      cameraId: cameraId,
      encoderConfig: {
        width: this.firebaseconfig.videoSettings.width,
        height: this.firebaseconfig.videoSettings.height,
        frameRate: this.firebaseconfig.videoSettings.frameRate,
        bitrateMin: this.firebaseconfig.videoSettings.bitrateMin,
        bitrateMax: this.firebaseconfig.videoSettings.bitrateMax,
      },
    }

    console.warn("... #################### generateVideoTrackConfig #################### ...", videoTrackConfig);

    return videoTrackConfig;

  }

  throwError(message: string): void {

    this.firebaseError.throwError(message);

  }

  invokeError(code: number, message: string, output: string | null | boolean, ...args: any): FirebaseTypeInterfaces.FirebaseErrorInterface {

    const err = this.firebaseError.composeError(code, message, args);

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

export { RealtimeDatabase, FirebaseConfig, FirebaseError }

