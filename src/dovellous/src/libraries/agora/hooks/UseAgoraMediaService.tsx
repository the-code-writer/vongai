import { useState, useEffect, useCallback } from 'react';
import AgoraRTC, {
  IAgoraRTCClient, IAgoraRTCRemoteUser, MicrophoneAudioTrackInitConfig, CameraVideoTrackInitConfig, IMicrophoneAudioTrack, ICameraVideoTrack, ILocalVideoTrack, ILocalAudioTrack, ILocalTrack, SDK_CODEC, SDK_MODE, UID
} from 'agora-rtc-sdk-ng';
import K from '../../app/konstants';

import * as IMCallTypeInterfaces from "../apps/voice/IMCallTypeInterfaces";

import AIDenoiserEnabler from "./AIDenoiserEnabler";
import { f7 } from 'framework7-react';

export default function useAgoraMediaService(
  Framework7Instance: any,
  onUserPublished: Function,
  onUserUnpublished: Function,
  onUserJoined: Function,
  onUserLeft: Function,
  onHostJoined: Function,
)
  : {
    client:IAgoraRTCClient | undefined,
    localAudioTrack: ILocalAudioTrack | undefined,
    localVideoTrack: ILocalVideoTrack | undefined,
    localClientUID: any,
    localClientChannel: any,
    localClientSessionToken: any,
    localClientSessionID: any,
    localTracksAvailable: boolean,
    joinState: boolean,
    joiningState: boolean,
    setAgoraAppParams: Function,
    setAgoraTracksConfig: Function,
    connectCall: Function,
    disconnectCall: Function,
    enumerateDevices: Function,
    setNextAudioInputDevicesIndex: Function,
    setNextAudioOutputDevicesIndex: Function,
    setNextVideoInputDevicesIndex: Function,
    remoteUsers: IAgoraRTCRemoteUser[],
    audioInputDevicesArray: String[],
    audioInputDevicesObject: any,
    currentAudioInputDevicesIndex: Number,
    currentAudioInputDevicesID: String,
    audioOutputDevicesArray: String[],
    audioOutputDevicesObject: any,
    currentAudioOutputDevicesIndex: Number,
    currentAudioOutputDevicesID: String,
    videoInputDevicesArray: String[],
    videoInputDevicesObject: any,
    currentVideoInputDevicesIndex: Number,
    currentVideoInputDevicesID: String,
  } {

    
  const [enableDenoiser4AudioTrack, setEnableDenoiser4AudioTrack ] = useState<any>(undefined)   

  const [client, setClient] = useState<IAgoraRTCClient | undefined>(undefined);
  const [clientCodec, setClientCodec] = useState<SDK_CODEC>('vp8');
  const [clientMode, setClientMode] = useState<SDK_MODE>('rtc');
  const [appId, setAppId] = useState<string>('');
  const [localVideoTrack, setLocalVideoTrack] = useState<ILocalVideoTrack | ICameraVideoTrack | ILocalTrack | undefined>(undefined);
  const [localAudioTrack, setLocalAudioTrack] = useState<ILocalAudioTrack | IMicrophoneAudioTrack | ILocalTrack | undefined>(undefined);
  const [localClientUID, setLocalClientUID] = useState<UID | undefined>(undefined);
  const [localClientChannel, setLocalClientChannel] = useState<UID | undefined>(undefined);
  const [localClientSessionID, setLocalClientSessionID] = useState<UID | undefined>(undefined);
  const [localClientSessionToken, setLocalClientSessionToken] = useState<UID | undefined>(undefined)
 
  const [localTracksAvailable, setLocalTracksAvailable] = useState<boolean>(false);

  const [joinState, setJoinState] = useState<boolean>(false);

  const [joiningState, setJoiningState] = useState<boolean>(false);

  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  // Audio Input Devices
  const [audioInputDevicesConfig, setAudioInputDevicesConfig] = useState<MicrophoneAudioTrackInitConfig | undefined>(undefined);
  const [audioInputDevicesArray, setAudioInputDevicesArray] = useState<String[]>([]);
  const [audioInputDevicesObject, setAudioInputDevicesObject] = useState<any>({});
  const [currentAudioInputDevicesIndex, setCurrentAudioInputDevicesIndex] = useState<number>(0);
  const [currentAudioInputDevicesID, setCurrentAudioInputDevicesID] = useState<string>('default');

  // Audio Output Devices
  const [audioOutputDevicesArray, setAudioOutputDevicesArray] = useState<String[]>([]);
  const [audioOutputDevicesObject, setAudioOutputDevicesObject] = useState<any>({});
  const [currentAudioOutputDevicesIndex, setCurrentAudioOutputDevicesIndex] = useState<number>(0);
  const [currentAudioOutputDevicesID, setCurrentAudioOutputDevicesID] = useState<string>('default');

  // Video Input Devices
  const [videoInputDevicesConfig, setVideoInputDevicesConfig] = useState<CameraVideoTrackInitConfig | undefined>(undefined);
  const [videoInputDevicesArray, setVideoInputDevicesArray] = useState<String[]>([]);
  const [videoInputDevicesObject, setVideoInputDevicesObject] = useState<any>({});
  const [currentVideoInputDevicesIndex, setCurrentVideoInputDevicesIndex] = useState<number>(0);
  const [currentVideoInputDevicesID, setCurrentVideoInputDevicesID] = useState<string>('default');

  const setNextAudioInputDevicesIndex = (deviceId?: string) => {

    let currentIndex: number = currentAudioInputDevicesIndex;

    if (deviceId) {

      currentIndex = audioInputDevicesArray.indexOf(deviceId);

    } else {

      currentIndex = currentAudioInputDevicesIndex;

    }

    const nextIndex = (currentIndex + 1) % audioInputDevicesArray.length;

    const nextDevice = audioInputDevicesArray[nextIndex];

    if(nextIndex === nextDevice?.deviceIndex){

      setCurrentAudioInputDevicesIndex(nextIndex);

      setCurrentAudioInputDevicesID(nextDevice?.deviceId);

      return {
        deviceIndex: nextDevice?.deviceIndex,
        deviceID: nextDevice?.deviceId
      }

    } else {
      
      return {
        deviceIndex: currentAudioInputDevicesIndex,
        deviceID: currentAudioInputDevicesID
      }

    }  

  }

  // Set Audio output device
  const setNextAudioOutputDevicesIndex = (deviceId?: string) => {

    let currentIndex: number = currentAudioOutputDevicesIndex;

    if (deviceId) {

      currentIndex = audioOutputDevicesArray.indexOf(deviceId);

    } else {

      currentIndex = currentAudioOutputDevicesIndex;

    }

    const nextIndex = (currentIndex + 1) % audioOutputDevicesArray.length;

    const nextDevice = audioOutputDevicesArray[nextIndex];

    if(nextIndex === nextDevice?.deviceIndex){

      setCurrentAudioOutputDevicesIndex(nextIndex);

      setCurrentAudioOutputDevicesID(nextDevice?.deviceId);

      return {
        deviceIndex: nextDevice?.deviceIndex,
        deviceID: nextDevice?.deviceId
      }

    } else {
      
      return {
        deviceIndex: currentAudioOutputDevicesIndex,
        deviceID: currentAudioOutputDevicesID
      }

    }  

  }

  // Set Video input device
  const setNextVideoInputDevicesIndex = (deviceId?: string) => {

    let currentIndex: number = currentVideoInputDevicesIndex;

    if (deviceId) {

      currentIndex = videoInputDevicesArray.indexOf(deviceId);

    } else {

      currentIndex = currentVideoInputDevicesIndex;

    }

    const nextIndex = (currentIndex + 1) % videoInputDevicesArray.length;

    const nextDevice = videoInputDevicesArray[nextIndex];

    if(nextIndex === nextDevice?.deviceIndex){

      setCurrentVideoInputDevicesIndex(nextIndex);

      setCurrentVideoInputDevicesID(nextDevice?.deviceId);

      return {
        deviceIndex: nextDevice?.deviceIndex,
        deviceID: nextDevice?.deviceId
      }

    } else {
      
      return {
        deviceIndex: currentVideoInputDevicesIndex,
        deviceID: currentVideoInputDevicesID
      }

    }  

  }

  // Set Client Codec
  const setAgoraClientCodec = (codec: SDK_CODEC) => {

    setClientCodec(codec);

  }

  // Set Client Mode
  const setAgoraClientMode = (mode: SDK_MODE) => {

    setClientMode(mode);

  }

  // Set App ID
  const setAgoraAppID = (appId: any) => {

    setAppId(appId);

  }

  // Set App ID
  const setAgoraAppParams = (appId: any, codec: SDK_CODEC, mode: SDK_MODE) => {

    setAgoraAppID(appId);

    setAgoraClientCodec(codec);

    setAgoraClientMode(mode);

  }

  // Set Track Config
  const setAgoraTracksConfig = (
    audioInputConfig: MicrophoneAudioTrackInitConfig | undefined, 
    videoInputConfig: CameraVideoTrackInitConfig | undefined
  ) => {

    setAudioInputDevicesConfig(audioInputConfig);

    setVideoInputDevicesConfig(videoInputConfig);

  }

  // Enumerate devices

  const enumerateDevices = async (callBackFunction: any) => {

    // Get all audio and video devices.
    await AgoraRTC.getDevices()
      .then((deviceInfos: any) => {

        organizeDevices(deviceInfos, callBackFunction);

      })
      .catch((error: any) => {

        window.navigator.mediaDevices
          .enumerateDevices()
          .then((deviceInfos) => {

            organizeDevices(deviceInfos, callBackFunction);

          }).catch((streamHandleError) => {

            console.warn("::: ERROR ::: enumerateDevices :::", error, streamHandleError);

          });

      });

  }

  // Organise devices
  const organizeDevices = (deviceInfos: any, callBackFunction: any): any => {

    const mediaDevices = {
      audio: {
        input: {},
        output: {}
      },
      video: {
        input: {},
        output: {}
      }
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
        console.warn("::: UNKNOWN DEVICE :::", deviceInfo);
      }

    });

    let selectedMicrophoneId:string = '';
    let selectedSpeakerId:string = '';
    let selectedCameraId:string = '';

    const audioDevicesMicrophones: String[] = deviceInfos.filter(function (device: any) {
      return device.kind === "audioinput";
    });

    const audioDevicesMicrophonesObject: any = new Object();

    audioDevicesMicrophones.map((device:any, deviceIndex:number)=>{
      audioDevicesMicrophonesObject[device.deviceId] = device;      
      audioDevicesMicrophonesObject[device.deviceId]["deviceIndex"] = deviceIndex;
      if(deviceIndex === 0){
        setCurrentAudioInputDevicesID(device.deviceId);
        selectedMicrophoneId = device.deviceId;    
        setCurrentAudioInputDevicesIndex(0);
      }
    });

    setAudioInputDevicesArray(audioDevicesMicrophones);
    setAudioInputDevicesObject(audioDevicesMicrophonesObject);

    const audioDevicesSpeakers = deviceInfos.filter(function (device: any) {
      return device.kind === "audiooutput";
    });

    const audioDevicesSpeakersObject: any = new Object();

    audioDevicesSpeakers.map((device:any, deviceIndex:number)=>{
      audioDevicesSpeakersObject[device.deviceId] = device;
      audioDevicesSpeakersObject[device.deviceId]["deviceIndex"] = deviceIndex;
      if(deviceIndex === 0){
        setCurrentAudioOutputDevicesID(device.deviceId);
        selectedSpeakerId = device.deviceId;    
        setCurrentAudioOutputDevicesIndex(0);
      }
    });

    setAudioOutputDevicesArray(audioDevicesSpeakers);
    setAudioOutputDevicesObject(audioDevicesSpeakersObject);

    const videoDevices = deviceInfos.filter(function (device: any) {
      return device.kind === "videoinput";
    });

    
    const videoDevicesObject: any = new Object();

    videoDevices.map((device:any, deviceIndex:number)=>{
      videoDevicesObject[device.deviceId] = device;
      videoDevicesObject[device.deviceId]["deviceIndex"] = deviceIndex;
      if(deviceIndex === 0){
        setCurrentAudioOutputDevicesID(device.deviceId);
        selectedCameraId = device.deviceId;
        setCurrentVideoInputDevicesIndex(0);
      }
    });

    setVideoInputDevicesArray(videoDevices);
    setVideoInputDevicesObject(videoDevicesObject);

    const devices = {
      cameraId: selectedCameraId,
      microphoneId: selectedMicrophoneId,
      speakerId: selectedSpeakerId,
      mediaDevices: mediaDevices
    };

    callBackFunction(devices);

  }

  async function createLocalTracks(
    audioConfig?: MicrophoneAudioTrackInitConfig,
    videoConfig?: CameraVideoTrackInitConfig
  ): Promise<[IMicrophoneAudioTrack, ICameraVideoTrack]> {

    //const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks(audioConfig, videoConfig);
    
    const microphoneTrack :IMicrophoneAudioTrack= await AgoraRTC.createMicrophoneAudioTrack(audioConfig);

    const cameraTrack :ICameraVideoTrack= await AgoraRTC.createCameraVideoTrack(videoConfig);
    
    microphoneTrack.setEnabled(true);
    cameraTrack.setEnabled(true);

    setLocalAudioTrack(microphoneTrack);
    setLocalVideoTrack(cameraTrack);    
    setLocalTracksAvailable(true);

    return [microphoneTrack, cameraTrack];

  }

  const connectCall = (callPayload: IMCallTypeInterfaces.CallDataObject) => {

    const callSessionChannel:string = String(callPayload.callSessionChannel).toLowerCase();

    joinChannel(callSessionChannel, callPayload, undefined, callPayload.uid);

    setJoinState(false);

    setJoiningState(true);
    
  }

  const disconnectCall = async (callData: any) : Promise <any> => {

    console.warn("::: DISCONNECT CALL :::", callData);

    await leaveChannel();

    Framework7Instance.emit(
      K.ModuleComponentsLibs.im.callScreen.states.DISCONNECTED
    );

    return callData;

  }

  async function joinChannel(channel: string, callPayload:any, token?: string, uid?:  UID | null | undefined) {

    if (!client) return;

    if (!channel) return;

    try{

      const [microphoneTrack, cameraTrack] = await createLocalTracks(
        audioInputDevicesConfig, 
        videoInputDevicesConfig      
      );

      //Remove the line below to go live

      const testChannel = "CH0100";

      console.warn("=== testChannel, appId, testChannel, token, uid ===", testChannel, appId, testChannel, token, uid);

      client.join(appId, testChannel, token || null, uid || null)
      .then(async(newUUID:UID)=>{

        setLocalClientUID(newUUID);

        setLocalClientChannel(channel);

        setLocalClientSessionToken(token);

        setLocalClientSessionID(channel);

        setJoinState(true);

        setJoiningState(false);

        await enableDenoiser4AudioTrack.enabler(microphoneTrack);

        await client.publish([microphoneTrack, cameraTrack]);
        
        (window as any).client = client;
        (window as any).videoTrack = cameraTrack;
        (window as any).audioTrack = microphoneTrack;

        const payload:any = {
          client: client,
          videoTrack: cameraTrack,
          audioTrack: microphoneTrack,
          callPayload: callPayload,
          channel: channel,
          token: token,
          uid: uid
        };

        onHostJoined(payload);        

      })
      .catch((error: any)=>{

        console.warn("::: AGORA JOIN ERROR 1 :::", error);

      });

    } catch (error) {

      console.warn("::: AGORA JOIN ERROR 2 :::", error);

    }

  }

  async function leaveChannel() : Promise <number> {

    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
    }

    await client?.leave();

    setRemoteUsers([]);
    
    setJoinState(false);

    setJoiningState(false);

    return f7.utils.now();

  }

  
  const handleUserPublished = async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
    await client?.subscribe(user, mediaType);

    console.warn(":::: AGORA :::: handleUserPublished", user, mediaType);

    setRemoteUsers([...remoteUsers, user]);

    onUserPublished(user, mediaType);

  }

  const handleUserUnpublished = (user: IAgoraRTCRemoteUser) => {

    console.warn(":::: AGORA :::: handleUserPublished", user);

    setRemoteUsers([...remoteUsers, user]);

    onUserUnpublished(user);

  }

  const handleUserJoined = (user: IAgoraRTCRemoteUser) => {

    console.warn(":::: AGORA :::: handleUserPublished", user);

    setRemoteUsers([...remoteUsers, user]);
    
    onUserJoined(user);

  }

  const handleUserLeft = (user: IAgoraRTCRemoteUser) => {

    console.warn(":::: AGORA :::: handleUserPublished", user);

    setRemoteUsers([...remoteUsers, user]);

    onUserLeft(user);

  }

  useEffect(() => {

    if (!client) return;

    AgoraRTC.onAutoplayFailed = () => {
      alert("click to start autoplay!")
    }

    AgoraRTC.onMicrophoneChanged = async (changedDevice) => {

      if (localAudioTrack) {

        // When plugging in a device, switch to a device that is newly plugged in.
        if (changedDevice.state === "ACTIVE") {
          localAudioTrack?.setDevice(changedDevice.device.deviceId);
          // Switch to an existing device when the current device is unplugged.
        } else if (changedDevice.device.label === localAudioTrack.getTrackLabel()) {
          const oldMicrophones = await AgoraRTC.getMicrophones();
          oldMicrophones[0] && localAudioTrack?.setDevice(oldMicrophones[0].deviceId);
        }

      }

    }

    AgoraRTC.onCameraChanged = async (changedDevice) => {

      if (localVideoTrack) {

        // When plugging in a device, switch to a device that is newly plugged in.
        if (changedDevice.state === "ACTIVE") {
          localVideoTrack?.setDevice(changedDevice.device.deviceId);
          // Switch to an existing device when the current device is unplugged.
        } else if (changedDevice.device.label === localVideoTrack.getTrackLabel()) {
          const oldCameras = await AgoraRTC.getCameras();
          oldCameras[0] && localVideoTrack?.setDevice(oldCameras[0].deviceId);
        }

      }

    }

      setRemoteUsers(client.remoteUsers);

      console.warn("::: CLIENT :::", client);

      client.on('user-published', handleUserPublished);
      client.on('user-unpublished', handleUserUnpublished);
      client.on('user-joined', handleUserJoined);
      client.on('user-left', handleUserLeft);

      return () => {
        client.off('user-published', handleUserPublished);
        client.off('user-unpublished', handleUserUnpublished);
        client.off('user-joined', handleUserJoined);
        client.off('user-left', handleUserLeft);
      };

  }, [client]);

  // Hook; whenever the codec or mode changes, reinstatiate the client

  useEffect(() => {

    const agoraClientInstance:IAgoraRTCClient = AgoraRTC.createClient(
      { 
        codec: clientCodec, 
        mode: clientMode 
      }
    );

    if(clientMode !== "rtc"){

      agoraClientInstance.setClientRole("host");

    }

    setClient(agoraClientInstance);

    return () => {
      setClient(undefined);
    }

  }, [clientCodec, clientMode])

  useEffect(() => {
    setEnableDenoiser4AudioTrack(AIDenoiserEnabler());  
  }, []);
  
  return {
    client,
    localAudioTrack,
    localVideoTrack,
    localClientUID,
    localClientChannel,
    localClientSessionToken,
    localClientSessionID,
    localTracksAvailable,
    joinState,
    joiningState,
    setAgoraAppParams,
    setAgoraTracksConfig,
    connectCall,
    disconnectCall,
    enumerateDevices,
    setNextAudioInputDevicesIndex,
    setNextAudioOutputDevicesIndex,
    setNextVideoInputDevicesIndex,
    remoteUsers,
    audioInputDevicesArray,
    audioInputDevicesObject,
    currentAudioInputDevicesIndex,
    currentAudioInputDevicesID,
    audioOutputDevicesArray,
    audioOutputDevicesObject,
    currentAudioOutputDevicesIndex,
    currentAudioOutputDevicesID,
    videoInputDevicesArray,
    videoInputDevicesObject,
    currentVideoInputDevicesIndex,
    currentVideoInputDevicesID
  };

}