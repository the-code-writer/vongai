import { Block, BlockTitle, Button, Col, f7, Fab, FabButton, FabButtons, Icon, List, ListItem, PageContent, Row, Sheet } from "framework7-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useStopwatch } from 'react-timer-hook';

import K from "../../../libraries/app/konstants";

import Dom7 from "dom7";

import song from '../../../../assets/aud/incoming-4.mp3';

import { StorageIM, useStorageIM } from "../store/im-store";
import { addListener } from "process";
import Snippets from "../../../libraries/app/snippets";
import useAgora from "../../../libraries/agora/hooks/useAgora";
import MediaPlayer from "../../../libraries/agora/components/MediaPlayer";

import AgoraRTC, { IAgoraRTCClient, IAgoraRTCRemoteUser, MicrophoneAudioTrackInitConfig, CameraVideoTrackInitConfig, IMicrophoneAudioTrack, ICameraVideoTrack, ILocalVideoTrack, ILocalAudioTrack } from 'agora-rtc-sdk-ng';


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
    onParticipantJoined,
    onParticipantLeft
    
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

    const onUserPublishedHandler = async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
        
        console.warn(":::: === AGORA EVENT [onUserPublishedHandler] === :::", user, mediaType);
  
      }
  
      const onUserUnpublishedHandler  = (user: IAgoraRTCRemoteUser) => {
  
        console.warn(":::: === AGORA EVENT [onUserUnpublishedHandler] === :::", user);
  
      }
  
      const onUserJoinedHandler  = (user: IAgoraRTCRemoteUser) => {
  
        console.warn(":::: === AGORA EVENT [onUserJoinedHandler] === :::", user);

        onParticipantJoined(user);
  
      }
  
      const onUserLeftHandler  = (user: IAgoraRTCRemoteUser) => {
  
        console.warn(":::: === AGORA EVENT [onUserLeftHandler] === :::", user);

        onParticipantLeft(user);
  
      }


    
    const { 
        client,
        localAudioTrack,
        localVideoTrack,
        joinState,
        disconnectCall,
        connectCall,
        setAgoraAppParams,
        setAgoraTracksConfig,
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
    } = useAgora(
        onUserPublishedHandler,
        onUserUnpublishedHandler,
        onUserJoinedHandler,
        onUserLeftHandler
    );

    const [currentUserData, setCurrentUserData] = useState(userObject);

    const [currentCallData, setCurrentCallData] = useState(callObject);

    const [currentCallChannelData, setCurrentCallChannelData] = useState(['CHANNEL','CALL_ID']);

    const [currentConnectedCallDetails, setCurrentConnectedCallDetails] = useState(null);
    
    const [currentViewState, setCurrentViewState] = useState(K.ModuleComponentsLibs.im.callScreen.INITIALIZING);
    
    const [isMuteOn, setisMuteOn] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(isVideoCall);
    const [isIncomingCall, setIsIncomingCall] = useState(isIncoming);
    const [isFrontCamera, setIsFrontCamera] = useState(true);
    const [isLoudSpeakerOn, setIsLoudSpeakerOn] = useState(false);
    const [isOnHold, setIsOnHold] = useState(false);
    const [isCallConnected, setIsCallConnected] = useState(false);
    const [isCallEnded, setIsCallEnded] = useState(false);
    const [isCallAnswered, setIsCallAnswered] = useState(false);
    const [isCallDeclined, setIsCallDeclined] = useState(false);
    const [isCallInProgress, setIsCallInProgress] = useState(false);
    const [callRedialAttempts, setCallRedialAttempts] = useState([]);

    const [ringingTone, setRingingTone] = useState(new Audio(song));

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
            callChannel : getCallChannelToken(),
            callHash : getCallChannelHash(),
            callHooks: {
                remoteUsers: remoteUsers,
                audioInputDevicesArray: audioInputDevicesArray,
                audioInputDevicesObject: audioInputDevicesObject,
                currentAudioInputDevicesIndex: currentAudioInputDevicesIndex,
                currentAudioInputDevicesID: currentAudioInputDevicesID,
                audioOutputDevicesArray: audioOutputDevicesArray,
                audioOutputDevicesObject: audioOutputDevicesObject,
                currentAudioOutputDevicesIndex: currentAudioOutputDevicesIndex,
                currentAudioOutputDevicesID: currentAudioOutputDevicesID,
                videoInputDevicesArray: videoInputDevicesArray,
                videoInputDevicesObject: videoInputDevicesObject,
                currentVideoInputDevicesIndex: currentVideoInputDevicesIndex,
                currentVideoInputDevicesID: currentVideoInputDevicesID
            },
        }

    };

    const setCallID = (callObject: any) => {

        const _currentCallChannelData1 = String(`CALL:${new Date().getTime()}:${String(callObject.origin.phoneNumber).replace(/\W/g, '')}:${String(callObject.destination.phoneNumber).replace(/\W/g, '')}`);

        const _currentCallChannelData2 = Snippets.numbers.randomFloat(1000000, 9000000);

        const _currentCallChannelData3 = `${_currentCallChannelData1}:${_currentCallChannelData2}`;

        const _currentCallChannelData4 = Snippets.encryption.sha1(String(_currentCallChannelData3));

        setCurrentCallChannelData([_currentCallChannelData3, _currentCallChannelData4]);

    };

    const getCallChannelToken = () => {
        
        return String(`${currentCallChannelData[0]}`).toUpperCase();

    };

    const getCallChannelHash = () => {
        
        return String(`${currentCallChannelData[1]}`).toUpperCase();

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

        //TODO - function

    };

    const onUnMuteHandler = () => {

        setisMuteOn(false);

        onUnMute(getCallData());

        //TODO - function

    };

    const onFrontCameraToggle = () => {

        setIsFrontCamera(!isFrontCamera);

        setNextVideoInputDevicesIndex();

    };

    const onCameraToggle = () => {

        if(isCameraOn){            
            onCameraOffHandler();
        }else{
            onCameraOnHandler();
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

        setNextAudioOutputDevicesIndex();

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

        onEndedCallHandleDisconnections();

        //TODO: Send to remote user so that he invokes ENDED_BY_REMOTE_USER

    };

    const onEndedCallHandler = () => {

        onEndedCallHandleDisconnections();

    };

    const onEndedCallHandleDisconnections = () => {

        disconnectCall();
        
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

        //TODO: Mute video and audio

    };

    const onUnHoldCallHandler = () => {

        setIsOnHold(false);

        setCurrentViewState(
            K.ModuleComponentsLibs.im.callScreen.CONNECTED
        );

        onUnHoldCall(getCallData());

        //TODO: Unmute video and audio

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

        // Local Notification: PEER_INCOMING_CALL

    };

    const onOutgoingCallHandler = () => {

        setIsCallAnswered(false);
        setIsCallDeclined(false);
        setIsCallInProgress(false);

        setCurrentViewState(
            K.ModuleComponentsLibs.im.callScreen.OUTGOING
        );

        setCallRedialAttempts([...callRedialAttempts, new Date().getTime()]);

        onOutgoingCall(getCallData());

        // Send IM to calee: PEER_INCOMING_CALL

        // Local Notification: OUTGOING_CALL

    };

    const onCallConnecting = ()=>{

        console.warn("::::::*********** CALL CONNECTING ************:::::: ", getCallData());

        ringingTone.pause();

        setCurrentViewState( K.ModuleComponentsLibs.im.callScreen.CONNECTING );

        // Send IM to caller: PEER_CONNECTING

    }

    const onCallConnected = (connectedCallDetails: any)=>{
        
        console.warn("::::::*********** CALL CONNECTED ************:::::: ", connectedCallDetails);
  
        ringingTone.pause();

        setCurrentViewState(
            K.ModuleComponentsLibs.im.callScreen.CONNECTED
        );

        const _currentCallData = currentCallData;

        _currentCallData.callAnswered = new Date().getTime();

        setCurrentCallData(_currentCallData);

        setIsCallInProgress(false);

        setIsCallConnected(true);

        f7.emit(K.ModuleComponentsLibs.im.callScreen.START_TIMER);

    }

    const onCallDisConnected = ()=>{

        console.warn("::::::*********** CALL DISCONNECTED ************:::::: ", connectedCallDetails);
  
        ringingTone.pause();

        f7.emit(K.ModuleComponentsLibs.im.callScreen.STOP_TIMER);

        const _currentCallData = currentCallData;

        _currentCallData.dialAttempts = callRedialAttempts;

        _currentCallData.callEnded = new Date().getTime();

        if(_currentCallData.callAnswered > 0){

            _currentCallData.callDuration = Math.floor(
                (_currentCallData.callEnded - _currentCallData.callAnswered)/1000
            );
    
        }else{

            _currentCallData.callDuration = 0;
    
        }

        setCurrentCallData(_currentCallData);

        setIsCallInProgress(false);

        setIsCallConnected(false);

        console.log("::: CALL SUMMARY :::", getCallData());

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

        setCurrentViewState( K.ModuleComponentsLibs.im.callScreen.ENDED );

        onDeclineCall(getCallData());

        onCloseAllCallScreenSheetsHandler();

        onCloseThisCallScreen();

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

    const init = async (callIsIncomming: Boolean) => {
        
        if(!callIsIncomming){

            connectIncomingCallNow();

        }else{

            connectOutgoingCallNow();

        }

        console.log("::::::*********** CALL SCREEN READY ************:::::: ", getCallData());
  
    }

    const connectIncomingCallNow = () => {

        console.log("::::::*********** connectIncomingCallNow************:::::: ", f7.dovellous.instance.Libraries);
  
        if(isAgoraLoadedAndReady()){

            connectCall( getCallData() )

        }

    }

    const connectOutgoingCallNow = () => {

        if(isAgoraLoadedAndReady()){

            connectCall( getCallData() )

        }

    }

    const isAgoraLoadedAndReady = () => {

        if(f7.dovellous.instance.Libraries.Agora === null){
            return false;
        }

        return typeof f7.dovellous.instance.Libraries.Agora === "object" && f7.dovellous.instance.Libraries.Agora.hasOwnProperty('app');
    }

    const resetState = () => {        
        
        setCurrentUserData(userObject);
        setCurrentCallData(callObject);
        setCurrentConnectedCallDetails(null);
        setCurrentCallChannelData(['CHANNEL','CALL_ID']);
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
        setIsCallInProgress(false);
        setCallRedialAttempts([]);
        setRingingTone(new Audio(song));
    }

    const addEventListeners = () => {

        
        f7.on(
            K.Events.Modules.Agora.AgoraLibEvent.MODULE_LOADED,
            (module: any)=>{

                enumerateDevices((devices: any) => {
                    
                    console.log("::::::*********** DEVICES ************:::::: ", devices);

                    //setAgoraAppParams();

                    //setAgoraTracksConfig();
                
                });

                console.log("::::::*********** AGORA READY ************:::::: ", module);
                
            }
        );

        f7.on(
            K.ModuleComponentsLibs.im.callScreen.CONNECTING,
            () => {
                onCallConnecting();
            }
        );

        f7.on(
            K.ModuleComponentsLibs.im.callScreen.CONNECTED,
            ( connectedCallDetails: any ) => {
                setCurrentConnectedCallDetails(connectedCallDetails);
                onCallConnected(connectedCallDetails);
            }
        );

        f7.on(
            K.ModuleComponentsLibs.im.callScreen.USER_PUBLISHED,
            ( connectedUserCallDetails: any ) => {
                onCallConnectedUser(connectedUserCallDetails);
            }
        );

        f7.on(
            K.ModuleComponentsLibs.im.callScreen.USER_UNPUBLISHED,
            ( connectedUserCallDetails: any ) => {
                onCallDisconnectedUser(connectedUserCallDetails);
            }
        );

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

        f7.on(
            K.ModuleComponentsLibs.im.callScreen.ENDED_BY_REMOTE_USER, () => {

                onEndedCallHandler();

            }
        );

    }

    useEffect(() => {

        resetState();

        addEventListeners();

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
        callObject.callDuration = 0;
        callObject.isVideoCall = isVideoCall;
        callObject.isIncoming = isIncoming;

        setCallID(callObject);
        
        setCurrentUserData(userObject);

        setCurrentCallData(callObject);

        setIsCameraOn(isVideoCall);

        setIsIncomingCall(isIncoming);

        isIncoming ? onIncomingCallHandler() : onOutgoingCallHandler();

        init(isIncoming);

    }, 
    [userDefinedData]
    );

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

                {isCameraOn && (

                <div className={`videos visible`} >

                    {remoteUsers.length > 1 ? (
                        
                        <div className='player-container-conference'>

                            <div className='local-wrapper'>
                                <MediaPlayer 
                                    uuid={client.uid} 
                                    user={null}
                                    videoTrack={localVideoTrack} 
                                    audioTrack={undefined} />
                            </div>

                            {remoteUsers.map(user => (

                            <div className='remote-wrapper' key={user.uid}>
                                <MediaPlayer 
                                    uuid={user.uid} 
                                    user={user} 
                                    videoTrack={user.videoTrack} 
                                    audioTrack={user.audioTrack} />
                            </div>

                            ))}

                        </div>

                    ):(

                        <div className='player-container-duo'>

                            <div id="remote" className={`remote ${isCallInProgress?'connected':'not-connected'}`} >
                                <MediaPlayer 
                                    uuid={`remote-video`} 
                                    user={remoteUsers[0]} 
                                    videoTrack={remoteUsers[0].videoTrack} 
                                    audioTrack={remoteUsers[0].audioTrack} />
                            </div>

                            <div id="local" className={`local ${isCallInProgress?'connected':'not-connected'}`} >
                                <MediaPlayer 
                                    uuid={`local-video`}
                                    user={null}
                                    videoTrack={localVideoTrack} 
                                    audioTrack={undefined} />
                            </div>
                        
                        </div>

                    )}


                </div>

                )}

                <PageContent>
                   
                    <div className="call-remote-user" style={{visibility: isCameraOn?'hidden':'visible'}}>
                        <img src={currentUserData.displayPhoto??''} alt={``} />
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
                            disabled={audioOutputDevicesArray.length<2}
                            id="im-solid-rounded-loudspeaker"
                            key="im-solid-rounded-loudspeaker"
                            className={`im-solid-rounded color-white ${audioOutputDevicesArray.length<2?'disabled':''}`}
                            onClick={onLoudSpeakerToggle} 
                            iconIos={`f7:${isLoudSpeakerOn?'speaker_slash_fill':'speaker_2_fill'}`}
                            iconMd={`material:${isLoudSpeakerOn?'volume_up':'volume_off'}`}
                            iconAurora={`f7:${isLoudSpeakerOn?'speaker_slash_fill':'speaker_2_fill'}`}
                            iconSize={24} 
                        />

                        {isCameraOn ? (

                        <Button outline large disabled={videoInputDevicesArray.length<2}
                            id="im-solid-rounded-switch-camera"
                            key="im-solid-rounded-switch-camera"
                            className={`im-solid-rounded ${isCameraOn?(isFrontCamera?'color-white':'color-yellow'):'color-white'}  ${videoInputDevicesArray.length<2?'disabled':''}`}
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
                            disabled={videoInputDevicesArray.length<1}
                            id="im-solid-rounded-camera"
                            key="im-solid-rounded-camera"
                            className={`im-solid-rounded color-white  ${videoInputDevicesArray.length<1?'disabled':''}`}
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

