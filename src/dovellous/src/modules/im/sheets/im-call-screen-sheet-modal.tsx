import { Block, BlockTitle, Button, Col, f7, Fab, FabButton, FabButtons, Icon, List, ListItem, PageContent, Row, Sheet } from "framework7-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useStopwatch } from 'react-timer-hook';

import K from "../../../libraries/app/konstants";
import Dom7 from "dom7";

import song from '../../../../assets/aud/incoming-4.mp3';
import { element } from "prop-types";

export default ({ id, className, userDefinedData, isVideoCall, isIncoming,
    onMute,
    onUnMute,
    onCameraOn,
    onCameraOff,
    onLoudSpeakerOn,
    onLoudSpeakerOff,
    onEndCall,
    onEndedCall,
    onHoldCall,
    onUnHoldCall,
    onIncomingCall,
    onOutgoingCall,
    onAnswerCall,
    onDeclineCall,
    onAddParticipant
}) => {

    interface UserDataObject {
        username: string;
        displayName: string;
        displayStatus: string;
        displayPhoto: string;
        phoneNumber: string | number;
        emailAddress: string;
    }

    const userObject = {
        username: null,
        displayName: null,
        displayStatus: null,
        displayPhoto: null,
        phoneNumber: null,
        emailAddress: null,
    }

    interface CallDestinationObject {
        phoneNumber: any;
        displayName: any;
    }

    interface CallOriginObject {
        phoneNumber: any;
        displayName: any;
    }

    interface CallDataObject {
        uid: any;
        destination: CallDestinationObject | null;
        origin: CallOriginObject | null;
        callStarted: number;
        callAnswered: number,
        callEnded: number,
        callDuration: number,
        isVideoCall: boolean;
        isIncoming: boolean;
        dialAttempts: any;
    }

    const callObject: CallDataObject = {
        uid: null,
        destination: null,
        origin: null,
        callStarted: 0,
        callAnswered: 0,
        callEnded: 0,
        callDuration: 0,
        isVideoCall: false,
        isIncoming: false,
        dialAttempts: [],
    }

    const [currentUserData, setCurrentUserData] = useState(userObject);

    const [currentCallData, setCurrentCallData] = useState(callObject);

    const [currentConnectedCallDetails, setCurrentConnectedCallDetails] = useState(null);
    
    const [currentCallUID, setCurrentCallUID] = useState('CALL_0');

    const [currentViewState, setCurrentViewState] = useState(K.ModuleComponentsLibs.im.callScreen.INITIALIZING);
    
    const [isMuteOn, setisMuteOn] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(isVideoCall);
    const [isIncomingCall, setIsIncomingCall] = useState(isIncoming);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [isLoudSpeakerOn, setIsLoudSpeakerOn] = useState(false);
    const [isOnHold, setIsOnHold] = useState(false);
    const [isCallEnded, setIsCallEnded] = useState(false);
    const [isCallAnswered, setIsCallAnswered] = useState(false);
    const [isCallDeclined, setIsCallDeclined] = useState(false);
    const [callHasParticipants, setCallHasParticipants] = useState(false);
    const [callParticipants, setCallParticipants] = useState([{participantData: userDefinedData}]);
    const [isCallInProgress, setIsCallInProgress] = useState(false);
    const [callRedialAttempts, setCallRedialAttempts] = useState([]);

    const [ringingTone, setRingingTone] = useState(new Audio(song));

    
    const imPlayerContainerRemoteVideoElement = useRef(null);
    const imPlayerContainerLocalVideoElement = useRef(null);

    const [mediaDevicesList, setMediaDevicesList] = useState([{}]);


    const CallTimer = useCallback(({visible, className}) => {

        const {
          seconds,
          minutes,
          hours,
          days,
          isRunning,
          start,
          pause,
          reset,
        } = useStopwatch({ autoStart: false });

        useEffect(()=>{

            f7.on('startCallTimer', ()=>{

                start();

            });

            f7.on('pauseCallTimer', ()=>{

                pause();

            });

            f7.on('resetCallTimer', ()=>{

                reset();

            });

            f7.on('stopCallTimer', ()=>{

                pause();

            });

        },[]);

        return (
          <React.Fragment>
                <span className={className} style={{height: visible?'100%':'0px', opacity: visible?1:0}}>
                    <>{parseInt(days) > 0 && (String(days).padStart(2, '0')`:`)}</>
                    <>{parseInt(hours) > 0 && (String(hours).padStart(2, '0')`:`)}</>
                    <>{`${String(minutes).padStart(2, '0')}:`}</>
                    <>{`${String(seconds).padStart(2, '0')}`}</>
                </span>
          </React.Fragment>
        );

    },[]);

    const getCallData = () => {
        
        return {
            userObject : currentUserData,
            callObject : currentCallData,
            callDevices: mediaDevicesList,
            callID: currentCallUID
        }

    };

    const setCallID = () => {

        setCurrentCallUID(`CALL_${new Date().getTime()}`);

    };

    const getCallToken = () => {
        
        return import.meta.env.VNG_AGORA_TOKEN;

    };

    const includedInViewState = (states: any) => {

        if(Array.isArray(states)){
            return states.includes(currentViewState);
        }

        return false;

    }

    const onMuteToggle = () => {

        isMuteOn ? onUnMuteHandler() : onMuteHandler();

    };

    const onMuteHandler = () => {

        setisMuteOn(true);

        onMute(getCallData());

    };

    const onUnMuteHandler = () => {

        setisMuteOn(false);

        onUnMute(getCallData());

    };

    const onFrontCameraToggle = () => {

        setIsFrontCamera(!isFrontCamera);

    };

    const onCameraToggle = () => {

        if(isCameraOn){            
            onCameraOffHandler();
            stopLocalVideoStream(true, true);
        }else{
            onCameraOnHandler();
            setUpLocalVideoStream(true, true);
        }

    };

    const onCameraOnHandler = () => {

        setIsCameraOn(true);

        onCameraOn(getCallData());

    };

    const onCameraOffHandler = () => {

        setIsCameraOn(false);

        onCameraOff(getCallData());

    };

    const onLoudSpeakerToggle = () => {

        isLoudSpeakerOn ? onLoudSpeakerOffHandler() : onLoudSpeakerOnHandler();

        switchAudioSinkId();

    };

    const onLoudSpeakerOnHandler = () => {

        setIsLoudSpeakerOn(true);

        onLoudSpeakerOn(getCallData());

    };

    const onLoudSpeakerOffHandler = () => {

        setIsLoudSpeakerOn(false);

        onLoudSpeakerOff(getCallData());

    };

    const onHangUpToggle = () => {

        onEndCallHandler();

    };

    const onEndCallHandler = () => {
        
        f7.on(
            K.ModuleComponentsLibs.im.callScreen.DISCONNECTED, () => {

                setCurrentConnectedCallDetails(null);

                setIsCallEnded(true);
                setIsCallInProgress(false);

                setCurrentViewState(
                    K.ModuleComponentsLibs.im.callScreen.ENDED
                );

                onCallDisConnected();

                onEndCall(getCallData());

            }
        );

        f7
        .dovellous.instance.Libraries
        .Agora.app
        .imCall.lib.disconnect();

    };

    const onEndedCallHandler = () => {
        
        setIsCallEnded(true);

        setIsCallInProgress(false);

        setCurrentViewState(
            K.ModuleComponentsLibs.im.callScreen.ENDED
        );

        onCallDisConnected();

        onEndedCall(getCallData());

    };

    const onHoldToggle = () => {

        !isOnHold ? onHoldCallHandler():onUnHoldCallHandler();

    };

    const onHoldCallHandler = () => {

        setIsOnHold(true);

        setCurrentViewState(
            K.ModuleComponentsLibs.im.callScreen.PAUSED
        );

        onHoldCall(getCallData());

        f7.sheet.open('.im-callscreen-action-onhold');

    };

    const onUnHoldCallHandler = () => {

        setIsOnHold(false);

        setCurrentViewState(
            K.ModuleComponentsLibs.im.callScreen.CONNECTED
        );

        onUnHoldCall(getCallData());

    };

    const onIncomingCallHandler = () => {

        ringingTone.loop = true;
        
        ringingTone.play();
        
        setIsCallAnswered(false);
        setIsCallDeclined(false);
        setIsCallInProgress(false);

        setCurrentViewState(
            K.ModuleComponentsLibs.im.callScreen.INCOMING
        );

        onIncomingCall(getCallData());

    };

    const onOutgoingCallHandler = () => {

        if(isCameraOn){
            setUpLocalVideoStream(true, true);
        }

        f7.on(
            'remote_call_connecting',
            () => {
                onCallConnecting(); //publish your stream
            }
        );

        setIsCallAnswered(false);
        setIsCallDeclined(false);
        setIsCallInProgress(false);

        setCurrentViewState(
            K.ModuleComponentsLibs.im.callScreen.OUTGOING
        );

        setCallRedialAttempts([...callRedialAttempts, new Date().getTime()]);

        onOutgoingCall(getCallData());

    };

    const setUpLocalVideoStream = (audioSource: any, videoSource: any) => {
         
        const constraints = {
            audio: {deviceId: audioSource ? audioSource.deviceId ?? audioSource : undefined},
            video: {deviceId: videoSource ? videoSource.deviceId ?? videoSource : undefined}
          };

        window.navigator.mediaDevices.getUserMedia(constraints)
            .then(streamAvailable)
            .then(devicesAvailable)
            .catch(streamHandleError);

    }

    const streamAvailable = (stream: any) => {

        window.stream = stream;
        
        imPlayerContainerLocalVideoElement.current.srcObject = window.stream;

        imPlayerContainerLocalVideoElement.current.onloadedmetadata = (e: any) => {
            imPlayerContainerLocalVideoElement.current.play();
        };
                
        imPlayerContainerRemoteVideoElement.current.srcObject = window.stream;

        imPlayerContainerRemoteVideoElement.current.onloadedmetadata = (e: any) => {
            imPlayerContainerRemoteVideoElement.current.play();
        };
      
    }
    
    const devicesAvailable = (deviceInfos: any) => {

        const _mediaDevices = {
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

        for (let i = 0; i !== deviceInfos.length; ++i) {

            const deviceInfo = deviceInfos[i];
            
            if (deviceInfo.kind === 'audioinput') {
                deviceInfo.name = deviceInfo.label || `Microphone ${audioInputSelect.length + 1}`;
                _mediaDevices.audio.input[deviceInfo.deviceId] = deviceInfo;
            } else if (deviceInfo.kind === 'audiooutput') {
                deviceInfo.name = deviceInfo.label || `Speaker ${audioOutputSelect.length + 1}`;
                _mediaDevices.audio.output[deviceInfo.deviceId] = deviceInfo;
            } else if (deviceInfo.kind === 'videoinput') {
                deviceInfo.name = deviceInfo.label || `Camera ${Object.keys(_mediaDevices.video.input).length + 1}`;
                _mediaDevices.video.input[deviceInfo.deviceId] = deviceInfo;
            } else {
                deviceInfo.name = deviceInfo.label || `Media ${Object.keys(_mediaDevices.other[deviceInfo.kind??'type']).length + 1}`;
                _mediaDevices.other[deviceInfo.deviceId] = deviceInfo;
            }

        }

        setMediaDevicesList(_mediaDevices);

    }      

    const [currentMediaDeviceAudioSinkID, setCurrentMediaDeviceAudioSinkID] = useState('current');

    const [currentMediaDeviceVideoSinkID, setCurrentMediaDeviceVideoSinkID] = useState('current');

    const [currentMediaDeviceAudioSinkIndex, setCurrentMediaDeviceAudioSinkIndex] = useState(0);

    const [currentMediaDeviceVideoSinkIndex, setCurrentMediaDeviceVideoSinkIndex] = useState(0);

    // Attach audio output device to video element using device/sink ID.
    const switchAudioSinkId = (currentAudioSinkId: any) => {

        const audioSinkIds = Object.keys(mediaDevicesList.audio.output);

        if(currentAudioSinkId === null || typeof currentAudioSinkId === "undefined"){

            if(currentMediaDeviceAudioSinkIndex === 1){
                setCurrentMediaDeviceAudioSinkIndex(0);
                currentAudioSinkId = audioSinkIds[0];
            }else{
                setCurrentMediaDeviceAudioSinkIndex(1);
                currentAudioSinkId = audioSinkIds[1];
            }
    
        }

        setCurrentMediaDeviceAudioSinkID(currentAudioSinkId);

      if (typeof imPlayerContainerLocalVideoElement.current.sinkId !== 'undefined') {
        imPlayerContainerLocalVideoElement.current.setSinkId(currentAudioSinkId)
            .then(() => {
              console.log(`Success, audio output device attached: ${currentAudioSinkId}`);
            })
            .catch(error => {
              let errorMessage = error;
              if (error.name === 'SecurityError') {
                errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
              }
              console.error("Error", currentAudioSinkId, error);
              // Jump back to first output device in the list as it's the default.
              setCurrentMediaDeviceAudioSinkIndex(0);
            });
      } else {

        console.warn("Error", currentAudioSinkId, 'Browser does not support output device selection.');

      }

    };

    // Attach video output device to video element using device/sink ID.
    const switchVideoSinkId = (currentVideoSinkId: any) => {

        const videoSinkIds = Object.keys(mediaDevicesList.video.input);

        if(currentVideoSinkId === null || typeof currentVideoSinkId === "undefined"){

            if(currentMediaDeviceVideoSinkIndex === 1){
                setCurrentMediaDeviceVideoSinkIndex(0);
                currentVideoSinkId = videoSinkIds[0];
            }else{
                setCurrentMediaDeviceVideoSinkIndex(1);
                currentVideoSinkId = videoSinkIds[1];
            }
    
        }

      setCurrentMediaDeviceVideoSinkID(currentVideoSinkId);

    };

    const streamHandleError = (error) => {
        console.log('Please check your devices. Stream Error: navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
    }      

    const stopLocalVideoStream = () => {

        if(window.stream !== null && typeof window.stream !== "undefined"){

            var tracks = window.stream.getTracks();
        
            for (var i = 0; i < tracks.length; i++) {
                var track = tracks[i];
                track.stop();
            }
        
            imPlayerContainerLocalVideoElement.current.srcObject = null;

        }
        
    }

    const onCallConnecting = ()=>{

        ringingTone.pause();

        setCurrentViewState(
            K.ModuleComponentsLibs.im.callScreen.CONNECTING
        );

        f7.on(
            K.ModuleComponentsLibs.im.callScreen.CONNECTED,
            ( connectedCallDetails ) => {
                setCurrentConnectedCallDetails(connectedCallDetails);
                onCallConnected(connectedCallDetails);
            }
        );

        f7
        .dovellous.instance.Libraries
        .Agora.app
        .imCall.lib.connect(
            getCallData(),
            getCallToken()
        );

    }

    const onCallConnected = (connectedCallDetails)=>{

        ringingTone.pause();

        setCurrentViewState(
            K.ModuleComponentsLibs.im.callScreen.CONNECTED
        );

        setIsCallInProgress(true);

        const _currentCallData = currentCallData;

        _currentCallData.callAnswered = new Date().getTime();

        setCurrentCallData(_currentCallData);

        f7.emit(K.ModuleComponentsLibs.im.callScreen.START_TIMER);

    }

    const onCallDisConnected = ()=>{

        ringingTone.pause();

        f7.emit(K.ModuleComponentsLibs.im.callScreen.STOP_TIMER);

        const _currentCallData = currentCallData;

        _currentCallData.dialAttempts = callRedialAttempts;

        _currentCallData.callEnded = new Date().getTime();

        _currentCallData.callDuration = Math.floor((_currentCallData.callEnded - _currentCallData.callAnswered)/1000);

        setCurrentCallData(_currentCallData);

        console.log("::>>> CALL SUMMARY <<<::", getCallData());

        setIsCallInProgress(false);

        stopUpLocalVideoStream();

    }

    const onAnswerCallHandler = () => {

        onCallConnecting();

        setIsCallAnswered(true);
        setIsCallDeclined(false);
        setIsCallInProgress(false);

        onAnswerCall(getCallData());

    };

    const onDeclineCallHandler = () => {

        ringingTone.pause();

        setIsCallAnswered(false);
        setIsCallDeclined(true);

        setCurrentViewState(
            K.ModuleComponentsLibs.im.callScreen.ENDED
        );

        onDeclineCall(getCallData());

        onCloseAllCallScreenSheetsHandler();

        onCloseThisCallScreen();

    };

    const onAddParticipantHandler = () => {

        setCallHasParticipants(true);

        //callParticipants

        onAddParticipant(getCallData());

    };

    const onParticipantJoinedHandler = () => {

        //

    };

    const onParticipantLeftHandler = () => {

        //

    };

    const onActionsAddParticipantHandler = () => {

    }

    const onActionsChatHandler = () => {

    }

    const onActionsHoldHandler = () => {

        onHoldToggle();

    }

    const onActionsKeypadHandler = () => {

        f7.sheet.open('.im-callscreen-action-numpad');

    }


    const onCloseAllCallScreenSheetsHandler = () => {

        f7.sheet.close('.im-callscreen-sheet');

    }

    const onCloseThisCallScreen = () => {

        onCloseAllCallScreenSheetsHandler();

        f7.sheet.close(`.${id}`);

        setCurrentUserData({
            username: null,
            displayName: null,
            displayStatus: null,
            displayPhoto: null,
            phoneNumber: null,
            emailAddress: null,
        });

        setCurrentCallData({
            uid: null,
            destination: null,
            origin: null,
            callStarted: 0,
            callAnswered: 0,
            callEnded: 0,
            callDuration: 0,
            isVideoCall: false,
            isIncoming: false,
            dialAttempts: 0,
        });

    }

    const init = async () => {

        if(
            f7.dovellous.instance.Libraries.Agora === null
        ){

            //alert('Could not start Agora  Services');

        }else{

            f7.on(
                K.Events.Modules.Agora.AgoraLibEvent.MODULE_LOADED,
                (res: any)=>{
                    console.error(":::::::::: AgoraLibEvent.MODULE_LOADED :::::::::::", res);
                }
            );

            f7.on(
                K.Events.Modules.Agora.IMCall.ON_APP_INIT,
                (res: any)=>{
                    console.error(":::::::::: IMCall.ON_APP_INIT :::::::::::", res);

                    f7.dovellous.instance.Libraries.Agora.app.imCall.lib.start()

                }
            );

        }

        console.log(":::::::::: CALL DATA INIT READY :::::::::::", getCallData());
  
    }

    const resetState = () => {
        setCurrentUserData(userObject);
        setCurrentCallData(callObject);
        setCurrentConnectedCallDetails(null);
        setCurrentCallUID('CALL_X');
        setCurrentViewState(K.ModuleComponentsLibs.im.callScreen.INITIALIZING);
        setisMuteOn(false);
        setIsCameraOn(isVideoCall);
        setIsIncomingCall(isIncoming);
        setIsFrontCamera(true);
        setIsLoudSpeakerOn(false);
        setIsOnHold(false);
        setIsCallEnded(false);
        setIsCallAnswered(false);
        setIsCallDeclined(false);
        setCallHasParticipants(false);
        setCallParticipants([{participantData: userDefinedData}]);
        setIsCallInProgress(false);
        setCallRedialAttempts([]);
        setRingingTone(new Audio(song));
    }

    useEffect(() => {

        resetState();

        setCallID();
        
        window.navigator.mediaDevices
            .enumerateDevices()
            .then(devicesAvailable)
            .catch(streamHandleError);

        userObject.username = userDefinedData.username;
        userObject.displayName = userDefinedData.displayName;
        userObject.displayStatus = userDefinedData.displayStatus;
        userObject.displayStatus = userDefinedData.displayStatus;
        userObject.displayPhoto = userDefinedData.displayPhoto;
        userObject.phoneNumber = userDefinedData.phoneNumber;
        userObject.emailAddress = userDefinedData.emailAddress;

        callObject.destination = {
            displayName: userDefinedData.displayName, 
            phoneNumber: userDefinedData.phoneNumber
        };

        callObject.origin = {
            displayName: userDefinedData.displayName, 
            phoneNumber: userDefinedData.phoneNumber
        };

        callObject.callStarted = new Date().getTime();
        callObject.callEnded = 0;
        callObject.isVideoCall = isVideoCall;
        callObject.isIncoming = isIncoming;

        setCurrentUserData(userObject);

        setCurrentCallData(callObject);

        setIsCameraOn(isVideoCall);

        setIsIncomingCall(isIncoming);

        isIncoming ? onIncomingCallHandler() : onOutgoingCallHandler();

        init();

    }, [userDefinedData]);

    return (

        <React.Fragment>

            <Sheet
                id={id}
                key={id}
                className={`dark im-sheet-modal ${className}`}
                backdrop={false}
                bottom={true}
                push={false}
                swipeToStep={false}
                swipeToClose={false}
                closeByBackdropClick={false}
                closeByOutsideClick={false}
                closeOnEscape={false}
                style={{backgroundImage: `url(${currentUserData.displayPhoto})`}}
            >

                <div className="backdrop blurry" />

                {true && (

                <div className={`videos ${isCameraOn?'visible':'hidden'}`} >

                    <div id="im-player-container-remote" className={`remote ${isCallInProgress?'connected':'not-connected'}`} >
                    <video 
                            ref={imPlayerContainerRemoteVideoElement} 
                            autoPlay={true} id="im-player-container-remote-video-element"
                            style={{width: "100%"}} />
                    </div>

                    <div id="im-player-container-local" className={`local ${isCallInProgress?'connected':'not-connected'}`} >
                        <video 
                            ref={imPlayerContainerLocalVideoElement} 
                            autoPlay={true} id="im-player-container-local-video-element"
                            style={{width: "100%"}} />
                    </div>

                </div>

                )}

                <PageContent>
                   
                    <div className="call-remote-user" style={{visibility: isCameraOn?'hidden':'visible'}}>
                        <img src={currentUserData.displayPhoto} />
                        <BlockTitle large>{currentUserData.displayName}</BlockTitle>
                        {includedInViewState(
                                    [
                                        K.ModuleComponentsLibs.im.callScreen.INCOMING,
                                        K.ModuleComponentsLibs.im.callScreen.OUTGOING,
                                    ]
                        ) && (
                            <BlockTitle medium style={{textAlign: 'center'}}>{currentUserData.phoneNumber}</BlockTitle>
                        )}
                        <BlockTitle medium style={{textAlign: 'center'}}>{currentViewState}</BlockTitle>
                        <BlockTitle medium style={{textAlign: 'center'}}>
                            <CallTimer className={``} visible={
                                includedInViewState(
                                    [
                                        K.ModuleComponentsLibs.im.callScreen.CONNECTED,
                                        K.ModuleComponentsLibs.im.callScreen.ENDED,
                                    ]
                                )} />
                        </BlockTitle>
                    </div>
                   
                    {includedInViewState(
                        [K.ModuleComponentsLibs.im.callScreen.PAUSED]
                    ) && (
                    <div className="call-actions" onClick={onActionsHoldHandler}>
                        <Button large outline round text="Resume Call" color="green" />
                    </div>
                    )}

                    {includedInViewState(
                        [
                            K.ModuleComponentsLibs.im.callScreen.CONNECTED,
                        ]
                    ) && (
                    
                    <div className="call-actions" >
                        <Fab position="center-center" color="black" >
                            <Icon ios="f7:plus" aurora="f7:plus" md="material:add"></Icon>
                            <Icon ios="f7:xmark" aurora="f7:xmark" md="material:close"></Icon>
                            <FabButtons position="center">
                                <FabButton onClick={onActionsKeypadHandler}>
                                    <Icon ios="f7:circle_grid_3x3_fill" aurora="f7:circle_grid_3x3_fill" md="material:dialpad" />
                                </FabButton>
                                <FabButton onClick={onActionsAddParticipantHandler}>
                                    <Icon ios="f7:person_badge_plus_fill" aurora="f7:person_badge_plus_fill" md="material:person_add_alt_1" />
                                </FabButton>
                                <FabButton onClick={onActionsHoldHandler}>
                                    <Icon ios="f7:pause_fill" aurora="f7:pause_fill" md="material:pause" />
                                </FabButton>
                                <FabButton onClick={onActionsChatHandler}>
                                    <Icon ios="f7:text_bubble_fill" aurora="f7:text_bubble_fill" md="material:chat" />
                                </FabButton>
                            </FabButtons>
                        </Fab>
                    </div>

                    )}

                    {includedInViewState(
                        [
                            K.ModuleComponentsLibs.im.callScreen.OUTGOING,
                            K.ModuleComponentsLibs.im.callScreen.PAUSED,
                            K.ModuleComponentsLibs.im.callScreen.CONNECTING,
                            K.ModuleComponentsLibs.im.callScreen.CONNECTED,
                        ]
                    ) && (
                    
                    <Block inset className={`call-controls`}>
                        
                        <Button outline large
                            id="im-solid-rounded-loudspeaker"
                            key="im-solid-rounded-loudspeaker"
                            className="im-solid-rounded color-white"
                            onClick={onLoudSpeakerToggle} 
                            iconIos={`f7:${isLoudSpeakerOn?'speaker_slash_fill':'speaker_2_fill'}`}
                            iconMd={`material:${isLoudSpeakerOn?'volume_up':'volume_off'}`}
                            iconAurora={`f7:${isLoudSpeakerOn?'speaker_slash_fill':'speaker_2_fill'}`}
                            iconSize={24} 
                        />

                        {isCameraOn ? (

                        <Button outline large
                            id="im-solid-rounded-switch-camera"
                            key="im-solid-rounded-switch-camera"
                            className={`im-solid-rounded ${isCameraOn?(isFrontCamera?'color-white':'color-yellow'):'color-white'}`}
                            onClick={onFrontCameraToggle} 
                            iconIos={`f7:${isFrontCamera?'camera':'camera'}`}
                            iconMd={`material:${isFrontCamera?'video_camera_front':'video_camera_back'}`}
                            iconAurora={`f7:${isFrontCamera?'camera':'camera'}`}
                            iconSize={24} 
                        />
                        
                        ):(

                        <Button outline large
                            id="im-solid-rounded-mute"
                            key="im-solid-rounded-mute"
                            className="im-solid-rounded color-white"
                            onClick={onMuteToggle} 
                            iconIos={`f7:${!isMuteOn?'mic_fill':'mic_slash_fill'}`}
                            iconMd={`material:${!isMuteOn?'mic':'mic_off'}`}
                            iconAurora={`f7:${!isMuteOn?'mic_fill':'mic_slash_fill'}`}
                            iconSize={24} 
                        />

                        )}

                        <Button outline large
                            id="im-solid-rounded-camera"
                            key="im-solid-rounded-camera"
                            className="im-solid-rounded color-white"
                            onClick={onCameraToggle} 
                            iconIos={`f7:${isCameraOn?'videocam':'videocam_fill'}`}
                            iconMd={`material:${isCameraOn?'videocam_off':'videocam'}`}
                            iconAurora={`f7:${isCameraOn?'videocam':'videocam_fill'}`}
                            iconSize={24} 
                        />

                        <Button large fill textColor="white" bgColor="red"
                            id="im-solid-rounded-hangup"
                            key="im-solid-rounded-hangup"
                            className="im-solid-rounded"
                            onClick={onHangUpToggle} 
                            iconIos={`f7:${isLoudSpeakerOn?'phone_down_fill':'phone_down_fill'}`}
                            iconMd={`material:${isLoudSpeakerOn?'phone_enabled':'phone_enabled'}`}
                            iconAurora={`f7:${isLoudSpeakerOn?'phone_down_fill':'phone_down_fill'}`}
                            iconSize={24} 
                        />

                    </Block>

                    )}
                    
                </PageContent>

                {includedInViewState(
                    [K.ModuleComponentsLibs.im.callScreen.ENDED]
                ) && (

                <div className="im-call-controls-wrapper ended">

                    <div className="im-call-button" onClick={onOutgoingCallHandler}>

                        <Fab color="green" >
                                <Icon 
                                    ios="f7:phone_up_fill" 
                                    aurora="f7:phone_up_fill" 
                                    md="material:phone_enabled"></Icon>
                        </Fab>

                        <span>{`Call ${isIncomingCall?'back':'again'}`}</span>

                    </div>

                    <div className="im-call-button" onClick={onCloseThisCallScreen}>

                        <Fab color="red" >
                                <Icon 
                                    ios="f7:close" 
                                    aurora="f7:close" 
                                    md="material:close"></Icon>
                        </Fab>

                        <span>Close</span>

                    </div>

                </div>

                )}

                {includedInViewState(
                    [K.ModuleComponentsLibs.im.callScreen.INCOMING]
                ) && (

                <div className="im-call-controls-wrapper incoming">

                    <div className="im-call-button" onClick={onAnswerCallHandler}>

                        <Fab color="green" >
                                <Icon 
                                    ios="f7:phone_up_fill" 
                                    aurora="f7:phone_up_fill" 
                                    md="material:phone_enabled" />
                        </Fab>

                        <span>Accept</span>

                    </div>

                    <div className="im-call-button" onClick={onDeclineCallHandler}>

                        <Fab color="red" >
                                <Icon 
                                    ios="f7:phone_down_fill" 
                                    aurora="f7:phone_down_fill" 
                                    md="material:phone_enabled" />
                        </Fab>

                        <span>Decline</span>

                    </div>

                </div>

                )}

                {isCameraOn && includedInViewState(
                                    [
                                        K.ModuleComponentsLibs.im.callScreen.OUTGOING,
                                        K.ModuleComponentsLibs.im.callScreen.INCOMING,
                                        K.ModuleComponentsLibs.im.callScreen.CONNECTED,
                                        K.ModuleComponentsLibs.im.callScreen.ENDED,
                                    ]
                                ) && (

                <div className={`im-call-status-overlay ${!isCallInProgress ? 'black' : isOnHold ? 'red':'green'}`}>
                    <div className="info">
                        <span className="display-name">{currentUserData.displayName}</span>
                        {includedInViewState(
                                    [
                                        K.ModuleComponentsLibs.im.callScreen.INCOMING,
                                        K.ModuleComponentsLibs.im.callScreen.OUTGOING,
                                    ]
                        ) && (
                            <span className="display-number">{currentUserData.phoneNumber}</span>
                        )}
                        <CallTimer className="display-timer" visible={
                                    includedInViewState(
                                    [
                                        K.ModuleComponentsLibs.im.callScreen.CONNECTED,
                                        K.ModuleComponentsLibs.im.callScreen.ENDED,
                                    ]
                                )} 
                        />
                    </div>
                    <div className="status">
                        {isCameraOn ? (
                            isOnHold ? (
                                <Icon 
                                    ios={`f7:${isIncomingCall?'videocam':'videocam'}`} 
                                    aurora={`f7:${isIncomingCall?'videocam':'videocam'}`} 
                                    md={`material:${isIncomingCall?'pause_circle_outline':'pause_circle_outline'}`} 
                                />
                            ):(
                                <Icon  
                                    ios={`f7:${isIncomingCall?'videocam_fill':'videocam_fill'}`} 
                                    aurora={`f7:${isIncomingCall?'videocam_fill':'videocam_fill'}`} 
                                    md={`material:${isIncomingCall?'videocam':'videocam'}`} 
                                />
                            )
                        ):(
                            isOnHold ? (
                                <Icon 
                                    ios={`f7:${isIncomingCall?'phone_arrow_down_left':'phone_arrow_up_right'}`} 
                                    aurora={`f7:${isIncomingCall?'phone_arrow_down_left':'phone_arrow_up_right'}`} 
                                    md={`material:${isIncomingCall?'phone_paused':'phone_paused'}`} 
                                />
                            ):(
                                <Icon 
                                    ios={`f7:${isIncomingCall?'phone_fill_arrow_down_left':'phone_fill_arrow_up_right'}`} 
                                    aurora={`f7:${isIncomingCall?'phone_fill_arrow_down_left':'phone_fill_arrow_up_right'}`} 
                                    md={`material:${isIncomingCall?'phone':'phone'}`} 
                                />
                            )
                        )}
                        <div className="display-state">
                            {currentViewState}
                        </div>
                    </div>
                </div>

                )}

            </Sheet>

            <Sheet
                className="im-callscreen-sheet im-callscreen-action-numpad"
                style={{ height: 'auto', '--f7-sheet-bg-color': '#000' }}
                swipeToClose
                swipeToStep
                backdrop backdropUnique push
                swipeHandler=".im-callscreen-action-numpad .sheet-modal-swipe-step"
            >
                <div className="sheet-modal-swipe-step">
                    <div className="display-flex padding justify-content-space-between align-items-center">
                        <div style={{ fontSize: '18px' }}>
                            <b>Call Ended:</b>
                        </div>
                        <div style={{ fontSize: '22px' }}>
                            <b>00:48</b>
                        </div>
                    </div>
                    <div className="padding-horizontal padding-bottom">
                    <Block inset className={`call-after-controls`}>
                        <Button large fill textColor="white" bgColor="green"
                            id="im-solid-rounded-hangupx"
                            key="im-solid-rounded-hangupx"
                            className="im-solid-rounded"
                            onClick={onHangUpToggle}
                            iconIos={`f7:${isLoudSpeakerOn ? 'phone_down_fill' : 'phone_down_fill'}`}
                            iconMd={`material:${isLoudSpeakerOn ? 'phone_enabled' : 'phone_enabled'}`}
                            iconAurora={`f7:${isLoudSpeakerOn ? 'phone_down_fill' : 'phone_down_fill'}`}
                            iconSize={24}
                        />
                        <Button large fill textColor="white" bgColor="red"
                            id="im-solid-rounded-hangup"
                            key="im-solid-rounded-hangup"
                            className="im-solid-rounded"
                            onClick={onHangUpToggle}
                            iconIos={`f7:${isLoudSpeakerOn ? 'phone_down_fill' : 'phone_down_fill'}`}
                            iconMd={`material:${isLoudSpeakerOn ? 'phone_enabled' : 'phone_enabled'}`}
                            iconAurora={`f7:${isLoudSpeakerOn ? 'phone_down_fill' : 'phone_down_fill'}`}
                            iconSize={24}
                        />
                    </Block>
                        <div className="margin-top text-align-center">Swipe up for more details</div>
                    </div>
                </div>
                <BlockTitle medium className="margin-top">
                    Decline with a message:
                </BlockTitle>
                <List noHairlines>
                    <ListItem title="Item 1">
                        <b slot="after" className="text-color-black">
                            Sorry, can' talk right now
                        </b>
                    </ListItem>
                    <ListItem title="Item 2">
                        <b slot="after" className="text-color-black">
                            I am busy
                        </b>
                    </ListItem>
                    <ListItem title="Delivery">
                        <b slot="after" className="text-color-black">
                            I will call ypu back later
                        </b>
                    </ListItem>
                    <ListItem title="Delivery">
                        <b slot="after" className="text-color-black">
                            Decline with a custom message
                        </b>
                    </ListItem>
                </List>
             </Sheet>
            {/*<audio tabIndex={0} id="beep-one" controls preload="auto" >
                <source src="audio/Output 1-2.mp3"/>
                <source src="audio/Output 1-2.ogg"/>
            </audio> */}
        </React.Fragment>

    );

};
function useMemo(arg0: () => void, arg1: never[]) {
    throw new Error("Function not implemented.");
}

