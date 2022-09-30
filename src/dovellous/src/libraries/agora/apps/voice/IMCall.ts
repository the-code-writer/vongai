import { K, Snippets } from "../../../app/helpers";

import Dom7 from 'dom7';

import * as ModuleBaseClasses from "../../../app/module-base-classes";

import * as AgoraTypeInterfaces from "../../lib/AgoraTypeInterfaces";

import { IMCallConfig } from "./IMCallConfig";

import { IMCallError } from "./IMCallErrors";

import AgoraRTC from "agora-rtc-sdk-ng";
import { AgoraConfig } from '../../../firebase/lib/AgoraConfig';

// Parent constructor
class IMCall {

  framework7: any;

  imCallEvents: ModuleBaseClasses.DovellousLibraryEvent;

  imCallError:  AgoraTypeInterfaces.IMCallErrorInterface;

  imCallconfig: AgoraTypeInterfaces.IMCallConfigInterface;

  AgoraInstance: any;

  constructor(
    Framework7: any,
    Agora: any
  ) {

    this.framework7 = Framework7;

    this.AgoraInstance = Agora;

    this.imCallEvents = Agora.events;

    this.imCallError = IMCallError;

    if (Object.keys(this.AgoraInstance.agoraConfig.imCallConfig).length > 0 &&
    this.AgoraInstance.agoraConfig.imCallConfig.hasOwnProperty('encoder') && 
    this.AgoraInstance.agoraConfig.imCallConfig instanceof IMCallConfig
    ) {

      if(this.AgoraInstance.agoraConfig.imCallConfig.hasOwnProperty('videoSettings')){

        this.imCallconfig = this.AgoraInstance.agoraConfig.imCallConfig;

      }else{

        this.imCallconfig = this.loadDefaultConfig();

      }

    } else {

      this.imCallconfig = this.loadDefaultConfig();

    }

    this.init();

  }

  loadDefaultConfig(){

      const _imCallConfig: AgoraTypeInterfaces.IMCallConfigInterface | any = new Object();

      Object.defineProperties(_imCallConfig, {
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
              ideal: Dom7('html').width() * .75,
              min: Dom7('html').width() * .5,
              max: Dom7('html').width(),
            },
            height: {
              ideal: Dom7('html').height() * .75,
              min: Dom7('html').height() * .5,
              max: Dom7('html').height(),
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

      return new IMCallConfig(_imCallConfig);

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
        codec: "vp8"
      }
    );
    

  }

  /**
   * Initiates a simple call
   * param destinationId string - The destination uuid of the callee
   * return null
   */
  async connect(callData: any) {

    const self = this;

    console.warn(
      ":::::: AGORA CONNECT CALL :::::: ",
      callData,
      this.AgoraInstance.agoraOptions
    );

    this.framework7.emit(
      K.ModuleComponentsLibs.im.callScreen.CONNECTING,
      callData
    );

    this.AgoraInstance.agoraRTC.client.join(
      this.AgoraInstance.agoraOptions.config.appId,
      callData.callChannel,
      callData.callToken,
      callData.callID
    ).then(async (uid: any) => {

      try {
        
        // Create an audio track from the audio sampled by a microphone.

        this.AgoraInstance.agoraRTC.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack(
          this.generateAudioTrackConfig(callData.microponeID)
        );

        if (callData.isVideo) {

          // Create a video track from the video captured by a camera.
          this.AgoraInstance.agoraRTC.localVideoTrack = await AgoraRTC.createCameraVideoTrack(
            this.generateVideoTrackConfig(callData.cameraID)
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

          
      } catch (error) {
        
      self.connectionError(error, callData);

      }


    }).catch((error:any)=>{
      
      self.connectionError(error, callData);

    });

  }

  generateVideoTrackConfig(cameraId: any){

    console.warn("...IM CONFIG...", this );

    return {
      cameraId: cameraId,
      encoderConfig: {
        width: {
          ideal: this.imCallconfig.videoSettings.width * .75,
          min: this.imCallconfig.videoSettings.width * .5,
          max: this.imCallconfig.videoSettings.width
        },
        height: {
          ideal: this.imCallconfig.videoSettings.height * .75,
          min: this.imCallconfig.videoSettings.height * .5,
          max: this.imCallconfig.videoSettings.height
        },
        frameRate: this.imCallconfig.videoSettings.frameRate,
        bitrateMin: this.imCallconfig.videoSettings.bitrateMin,
        bitrateMax: this.imCallconfig.videoSettings.bitrateMax,
      },
    }
  }

  generateAudioTrackConfig(microphoneId: any){
    return { 
      microphoneId: microphoneId,
      encoderConfig: {
        sampleRate: this.imCallconfig.audioSettings.sampleRate,
        stereo: this.imCallconfig.audioSettings.stereo,
        bitrate: this.imCallconfig.audioSettings.bitrate,
      }
    }
  }

  connectionError(error: any, callData: any){

    this.framework7.emit(
      K.ModuleComponentsLibs.im.callScreen.CONNECTION_ERROR,
      {
        callData: callData,
        error: error,
      }
    );

    this.throwError("connectionError: ");

  }

  async disconnect() {
    // Destroy the local audio and video tracks.
    this.AgoraInstance.agoraRTC.localAudioTrack !== null ? this.AgoraInstance.agoraRTC.localAudioTrack.close() : null;
    this.AgoraInstance.agoraRTC.localVideoTrack !== null ? this.AgoraInstance.agoraRTC.localVideoTrack.close() : null;

    // Traverse all remote users.
    this.AgoraInstance.agoraRTC.client.remoteUsers.forEach((user: any) => {
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

  async switchVideoDevice(cameraId: any, callBackFunction: any){

    const cameraVideoTrack = await AgoraRTC.createCameraVideoTrack(
      this.generateVideoTrackConfig(cameraId)
    );

    this.AgoraInstance.agoraRTC.localVideoTrack = cameraVideoTrack;
    
    callBackFunction( cameraVideoTrack );

    this.framework7.emit(
      K.ModuleComponentsLibs.im.callScreen.SWITCHED_VIDEO_DEVICE,
      cameraVideoTrack
    );

  }

  async organizeDevices(deviceInfos: any, callBackFunction: any): Promise<void>{

    const mediaDevices = {
        audio: {
            input: {},
            output: {}
        },
        video: {
            input: {},
            output: {}
        },
        other: {}
    }

    deviceInfos.map((deviceInfo: any): void => {

        if (deviceInfo.kind === 'audioinput') {
            deviceInfo["name"] = deviceInfo.label || `Microphone ${Object.keys(mediaDevices.audio.input).length + 1}`;
            mediaDevices.audio.input[deviceInfo.deviceId] = deviceInfo;
        } else if (deviceInfo.kind === 'audiooutput') {
            deviceInfo["name"] = deviceInfo.label || `Speaker ${Object.keys(mediaDevices.audio.input).length + 1}`;
            mediaDevices.audio.output[deviceInfo.deviceId] = deviceInfo;
        } else if (deviceInfo.kind === 'videoinput') {
            deviceInfo["name"] = deviceInfo.label || `Camera ${Object.keys(mediaDevices.video.input).length + 1}`;
            mediaDevices.video.input[deviceInfo.deviceId] = deviceInfo;
        } else {
            deviceInfo["name"] = deviceInfo.label || `Media ${Object.keys(mediaDevices.other[deviceInfo.kind??'type']).length + 1}`;
            mediaDevices.other[deviceInfo.deviceId] = deviceInfo;
        }

    });

    const audioDevicesMicrophones = deviceInfos.filter(function (device: any) {
      return device.kind === "audioinput";
    });

    const audioDevicesSpeakers = deviceInfos.filter(function (device: any) {
      return device.kind === "audiooutput";
    });

    const videoDevices = deviceInfos.filter(function (device: any) {
      return device.kind === "videoinput";
    });

    var selectedMicrophoneId = audioDevicesMicrophones.length > 0 ? audioDevicesMicrophones[0].deviceId : null;
    var selectedSpeakerId = audioDevicesSpeakers.length > 0 ? audioDevicesSpeakers[0].deviceId : null;
    var selectedCameraId = videoDevices.length > 0 ? videoDevices[0].deviceId : null;

    const cameraVideoTrack = await AgoraRTC.createCameraVideoTrack(
      this.generateVideoTrackConfig(selectedCameraId)
    )

    const microphoneAudioTrack = await AgoraRTC.createMicrophoneAudioTrack(
      this.generateAudioTrackConfig(selectedMicrophoneId)
    );

    const result = {
      cameraVideoTrack: cameraVideoTrack,
      microphoneAudioTrack: microphoneAudioTrack,
      cameraId: selectedCameraId,
      microphoneId: selectedMicrophoneId,
      speakerId: selectedSpeakerId,
      mediaDevices: mediaDevices
    };

    callBackFunction(result);
  
  }

  async enumerateDevices(callBackFunction: any) {

    const self = this;

    // Get all audio and video devices.
    await AgoraRTC.getDevices()
      .then((deviceInfos: any) => {

        self.organizeDevices(deviceInfos, callBackFunction);

      })
      .catch((error: any) => {
        
        window.navigator.mediaDevices
                .enumerateDevices()
                .then((deviceInfos)=>{

                self.organizeDevices(deviceInfos, callBackFunction);

                }).catch((streamHandleError)=>{
                  
                  console.warn("::: enumerateDevices :::", error, streamHandleError);

                  self.throwError("::: streamHandleError :::");

                });

      });

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

