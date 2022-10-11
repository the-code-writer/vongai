import { Block, BlockTitle, Button, Col, f7, Fab, FabButton, FabButtons, Icon, List, ListItem, PageContent, Row, Sheet } from "framework7-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useStopwatch } from 'react-timer-hook';

import K from "../../../libraries/app/konstants";

import Dom7 from "dom7";

import song from '../../../../assets/aud/incoming-4.mp3';

import { StorageIM, useStorageIM } from "../store/im-store";
import Snippets from "../../../libraries/app/snippets";
import useAgora from "../../../libraries/agora/hooks/useAgora";
import MediaPlayer from "../../../libraries/agora/components/MediaPlayer";

import AgoraRTC, { IAgoraRTCClient, IAgoraRTCRemoteUser, MicrophoneAudioTrackInitConfig, CameraVideoTrackInitConfig, IMicrophoneAudioTrack, ICameraVideoTrack, ILocalVideoTrack, ILocalAudioTrack } from 'agora-rtc-sdk-ng';


export default ({ id, className, isVideoCall, isIncoming, userDefinedData,
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
    onUserPublished,
    onUserUnpublished,
    onUserJoined,
    onUserLeft
    
}) => {

    interface UserDataObject {
        username: string;
        displayName: string;
        displayStatus: string;
        displayPhoto: string;
        phoneNumber: string | number;
        emailAddress: string;
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
  
        onUserPublished(user, mediaType);
  
      }
  
      const onUserUnpublishedHandler  = (user: IAgoraRTCRemoteUser) => {
  
        console.warn(":::: === AGORA EVENT [onUserUnpublishedHandler] === :::", user);

        onUserUnpublished(user);
  
      }
  
      const onUserJoinedHandler  = (user: IAgoraRTCRemoteUser) => {
  
        console.warn(":::: === AGORA EVENT [onUserJoinedHandler] === :::", user);

        onUserJoined(user);
  
      }
  
      const onUserLeftHandler  = (user: IAgoraRTCRemoteUser) => {
  
        console.warn(":::: === AGORA EVENT [onUserLeftHandler] === :::", user);

        onUserLeft(user);
  
      }


    
    const { 
        client,
        localAudioTrack,
        localVideoTrack,
        localClientUID,
        localClientChannel,
        localClientSessionToken,
        localClientSessionID,
        joinState,
        joiningState,
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
        f7,
        onUserPublishedHandler,
        onUserUnpublishedHandler,
        onUserJoinedHandler,
        onUserLeftHandler
    );

    const [currentCallViewStateName, setCurrentCallViewStateName] = useState(K.ModuleComponentsLibs.im.callScreen.INITIALIZING);

    const [currentCallSessionID, setCurrentCallSessionID] = useState<String>('SID');

    const [currentCallSessionChannel, setCurrentCallSessionChannel] = useState<String>('SCH');

    const [currentCallUserOrigin, setCurrentCallUserOrigin] = useState<any>({displayName:'DNO',phoneNumber:'000'});

    const [currentCallUserDestination, setCurrentCallUserDestination] = useState<any>({displayName:'DND',phoneNumber:'001'});

    const [currentCallTimeDial, setCurrentCallTimeDial] = useState<Number>(0);
    const [currentCallTimeConnected, setCurrentCallTimeConnected] = useState<Number>(0);
    const [currentCallTimeEnded, setCurrentCallTimeEnded] = useState<Number>(0);
    const [currentCallDuration, setCurrentCallDuration] = useState<Number>(0);
    const [currentCallTimeDialAttempts, setCurrentCallTimeDialAttempts] = useState<String[]>([]);

    const [currentCallStateLabel, setCurrentCallStateLabel] = useState<String[]>('Please wait...');

    const [currentCallStateINITIALIZING, setCurrentCallStateINITIALIZING] = useState<Boolean[]>(true);
    const [currentCallStateDIALING, setCurrentCallStateDIALING] = useState<Boolean[]>(false);
    const [currentCallStateCONNECTING, setCurrentCallStateCONNECTING] = useState<Boolean[]>(false);
    const [currentCallStateCONNECTED, setCurrentCallStateCONNECTED] = useState<Boolean[]>(false);
    const [currentCallStateRECONNECTING, setCurrentCallStateRECONNECTING] = useState<Boolean[]>(false);
    const [currentCallStateDISCONNECTING, setCurrentCallStateDISCONNECTING] = useState<Boolean[]>(false);
    const [currentCallStateDISCONNECTED, setCurrentCallStateDISCONNECTED] = useState<Boolean[]>(false);

    const [currentCallActionAnswered, setCurrentCallActionAnswered] = useState<Boolean[]>(false);
    const [currentCallActionDeclined, setCurrentCallActionDeclined] = useState<Boolean[]>(false);
    const [currentCallActionInProgress, setCurrentCallActionInProgress] = useState<Boolean[]>(false);
    const [currentCallActionHold, setCurrentCallActionHold] = useState<Boolean[]>(false);
    const [currentCallActionMuted, setCurrentCallActionMuted] = useState<Boolean[]>(false);
    const [currentCallActionEnded, setCurrentCallActionEnded] = useState<Boolean[]>(true);

    const [currentCallTypeIsIncoming, setCurrentCallTypeIsIncoming] = useState<Boolean[]>(isIncoming);
    const [currentCallTypeIsVideo, setCurrentCallTypeIsVideo] = useState<Boolean[]>(isVideoCall);

    
    const [currentCallModeIsUsingFrontCamera, setCurrentCallModeIsUsingFrontCamera] = useState<Boolean[]>(true);
    const [currentCallModeIsCameraTurnedON, setCurrentCallModeIsCameraTurnedON] = useState<Boolean[]>(isVideoCall);
    const [currentCallModeIsLoudSpeakerTurnedON, setCurrentCallModeIsLoudSpeakerTurnedON] = useState<Boolean[]>(false);

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

            f7.on(K.ModuleComponentsLibs.im.callScreen.START_TIMER, ()=>{

                start();

            });

            f7.on(K.ModuleComponentsLibs.im.callScreen.PAUSE_TIMER, ()=>{

                pause();

            });

            f7.on(K.ModuleComponentsLibs.im.callScreen.RESET_TIMER, ()=>{

                reset();

            });

            f7.on(K.ModuleComponentsLibs.im.callScreen.STOP_TIMER, ()=>{

                pause();

            });

        },[]);

        return (

            <React.Fragment>

                {isRunning && (

                    <span className={className} style={{height: visible?'100%':'0px', opacity: visible?1:0}}>
                        <>{days >  0 && (`${String(days).padStart(2, '0')}:`)}</>
                        <>{hours > 0 && (`${String(hours).padStart(2, '0')}:`)}</>
                        <>{`${String(minutes).padStart(2, '0')}:`}</>
                        <>{`${String(seconds).padStart(2, '0')}`}</>
                    </span>
            
                )}
            
            </React.Fragment>

        );

    },[]);

    const initCallObjectData = () => {

        const currentCallObjectData: CallDataObject = {
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

        currentCallObjectData.destination = {
            displayName: userDefinedData.displayName, 
            phoneNumber: userDefinedData.phoneNumber
        };

        currentCallObjectData.uid = Snippets.encryption.sha1(userDefinedData.phoneNumber);

        currentCallObjectData.origin = {
            displayName: userDefinedData.displayName, 
            phoneNumber: userDefinedData.phoneNumber
        };

        currentCallObjectData.callStarted = new Date().getTime();
        currentCallObjectData.callEnded = 0;
        currentCallObjectData.callDuration = 0;
        currentCallObjectData.isVideoCall = isVideoCall;
        currentCallObjectData.isIncoming = isIncoming;

        setCallID(currentCallObjectData);
        
        setCurrentCallData(currentCallObjectData);

        return currentCallObjectData;

    }

    const getCallData = () => {

        const localCurrentCallData: any = new Object();

        localCurrentCallData.destination = {
            displayName: userDefinedData.displayName, 
            phoneNumber: userDefinedData.phoneNumber
        };

        localCurrentCallData.origin = {
            displayName: userDefinedData.displayName, 
            phoneNumber: userDefinedData.phoneNumber
        };

        localCurrentCallData.uid = Snippets.encryption.sha1(userDefinedData.phoneNumber);

        const callData:any = {
            userObject : userDefinedData,
            callObject : localCurrentCallData,
            callSessionToken : getCallSessionToken(),
            callSessionId : getCallSessionId(),
            callHooks: {
                client,
                localAudioTrack,
                localVideoTrack,
                localClientUID,
                localClientChannel,
                localClientSessionToken,
                localClientSessionID,
                joinState,
                joiningState,
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
            },
        }

        return callData;

    };

    const setCallID = (callObject: any) => {

        const _currentCallSessionData1 = String(`CALL:${new Date().getTime()}:${String(callObject.origin.phoneNumber).replace(/\W/g, '')}:${String(callObject.destination.phoneNumber).replace(/\W/g, '')}`);

        const _currentCallSessionData2 = Snippets.numbers.randomFloat(1000000, 9000000);

        const _currentCallSessionData3 = `${_currentCallSessionData1}:${_currentCallSessionData2}`;

        const _currentCallSessionData4 = Snippets.encryption.sha1(String(_currentCallSessionData3));

        setCurrentCallSessionData([_currentCallSessionData3, _currentCallSessionData4]);

        return [_currentCallSessionData3, _currentCallSessionData4];

    };

    const getCallSessionToken = () => {
        
        return String(`${currentCallSessionData[0]}`).toUpperCase();

    };

    const getCallSessionId = () => {
        
        return String(`${currentCallSessionData[1]}`).toUpperCase();

    };

    const viewIncludeInCurrentState = (states: String[]) => {

        if(Array.isArray(states)){
            return states.includes(currentCallViewStateName);
        }

        return false;

    }

    const onMuteToggle = () => {

        currentCallActionMuted ? onUnMuteHandler() : onMuteHandler();

    };

    const onMuteHandler = () => {

        setCurrentCallActionMuted(true);

        onMute(getCallData());

        //TODO - function

    };

    const onUnMuteHandler = () => {

        setCurrentCallActionMuted(false);

        onUnMute(getCallData());

        //TODO - function

    };

    const onFrontCameraToggle = () => {

        setCurrentCallModeIsUsingFrontCamera(!currentCallModeIsUsingFrontCamera);

        setNextVideoInputDevicesIndex();

    };

    const onCameraToggle = () => {

        if(currentCallModeIsCameraTurnedON){            
            onCameraOffHandler();
        }else{
            onCameraOnHandler();
        }

    };

    const onCameraOnHandler = () => {

        setCurrentCallModeIsCameraTurnedON(true);

        onCameraOn(getCallData());

    };

    const onCameraOffHandler = () => {

        setCurrentCallModeIsCameraTurnedON(false);

        onCameraOff(getCallData());

    };

    const onLoudSpeakerToggle = () => {

        currentCallModeIsLoudSpeakerTurnedON ? onLoudSpeakerOffHandler() : onLoudSpeakerOnHandler();

        setNextAudioOutputDevicesIndex();

    };

    const onLoudSpeakerOnHandler = () => {

        setCurrentCallModeIsLoudSpeakerTurnedON(true);

        onLoudSpeakerOn(getCallData());

    };

    const onLoudSpeakerOffHandler = () => {

        setCurrentCallModeIsLoudSpeakerTurnedON(false);

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
        
        setCurrentCallActionEnded(true);

        setCurrentCallActionInProgress(false);

        setCurrentCallViewStateName(
            K.ModuleComponentsLibs.im.callScreen.ENDED
        );

        onCallDisConnected();

        onEndedCall(getCallData());

    };

    const onHoldToggle = () => {

        !currentCallActionHold ? onHoldCallHandler():onUnHoldCallHandler();

    };

    const onHoldCallHandler = () => {

        setCurrentCallActionHold(true);

        setCurrentCallViewStateName(
            K.ModuleComponentsLibs.im.callScreen.PAUSED
        );

        onHoldCall(getCallData());

        f7.sheet.open('.im-callscreen-action-onhold');

        //TODO: Mute video and audio

    };

    const onUnHoldCallHandler = () => {

        setCurrentCallActionHold(false);

        setCurrentCallViewStateName(
            K.ModuleComponentsLibs.im.callScreen.CONNECTED
        );

        onUnHoldCall(getCallData());

        //TODO: Unmute video and audio

    };

    const onIncomingCallHandler = () => {

        if(Object.keys(userDefinedData).length > 0 && userDefinedData.hasOwnProperty('phoneNumber')){

            ringingTone.loop = true;
            
            ringingTone.play();
            
            connectIncomingCallNow();

            setCurrentCallActionAnswered(false);
            setCurrentCallActionDeclined(false);
            setCurrentCallActionInProgress(false);

            onIncomingCall(getCallData());

            setCurrentCallViewStateName(
                K.ModuleComponentsLibs.im.callScreen.INCOMING
            );

            // Local Notification: PEER_INCOMING_CALL

        }

    };

    const onOutgoingCallHandler = () => {
        
        connectOutgoingCallNow();

        setCurrentCallActionAnswered(false);
        setCurrentCallActionDeclined(false);
        setCurrentCallActionInProgress(false);

        setCurrentCallTimeDialAttempts([...currentCallTimeDialAttempts, new Date().getTime()]);

        onOutgoingCall(getCallData());

        // Send IM to calee: PEER_INCOMING_CALL

        // Local Notification: OUTGOING_CALL

        setCurrentCallViewStateName(
            K.ModuleComponentsLibs.im.callScreen.OUTGOING
        );

    };

    const onCallConnecting = ()=>{

        console.warn("::::::*********** CALL CONNECTING ************:::::: ", getCallData());

        ringingTone.pause();

        setCurrentCallViewStateName( K.ModuleComponentsLibs.im.callScreen.CONNECTING );

        // Send IM to caller: PEER_CONNECTING

    }

    const onCallConnected = (connectedCallDetails: any)=>{
        
        console.warn("::::::*********** CALL CONNECTED ************:::::: ", connectedCallDetails);
  
        ringingTone.pause();

        setCurrentCallViewStateName(
            K.ModuleComponentsLibs.im.callScreen.CONNECTED
        );

        const _currentCallData = currentCallData;

        _currentCallData.callAnswered = new Date().getTime();

        setCurrentCallData(_currentCallData);

        setCurrentCallActionInProgress(false);

        setCurrentCallStateCONNECTED(true);

        f7.emit(K.ModuleComponentsLibs.im.callScreen.START_TIMER);

    }

    const onCallDisConnected = ()=>{

        console.warn("::::::*********** CALL DISCONNECTED ************:::::: ");
  
        ringingTone.pause();

        f7.emit(K.ModuleComponentsLibs.im.callScreen.STOP_TIMER);

        const _currentCallData = currentCallData;

        _currentCallData.dialAttempts = currentCallTimeDialAttempts;

        _currentCallData.callEnded = new Date().getTime();

        if(_currentCallData.callAnswered > 0){

            _currentCallData.callDuration = Math.floor(
                (_currentCallData.callEnded - _currentCallData.callAnswered)/1000
            );
    
        }else{

            _currentCallData.callDuration = 0;
    
        }

        setCurrentCallData(_currentCallData);

        setCurrentCallActionInProgress(false);

        setCurrentCallStateCONNECTED(false);

        console.log("::: CALL SUMMARY :::", getCallData());

    }

    const onAnswerCallHandler = () => {

        onCallConnecting();

        setCurrentCallActionAnswered(true);

        setCurrentCallActionDeclined(false);

        setCurrentCallActionInProgress(false);

        onAnswerCall(getCallData());

    };

    const onDeclineCallHandler = () => {

        ringingTone.pause();

        setCurrentCallActionAnswered(false);

        setCurrentCallActionDeclined(true);

        setCurrentCallViewStateName( K.ModuleComponentsLibs.im.callScreen.ENDED );

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
        
        if(isAgoraLoadedAndReady()){

            const callData:any = getCallData();

            setTimeout(()=>{
                
                connectCall( callData );

            },10);

        }
  
    }

    const connectIncomingCallNow = () => {

        if(isAgoraLoadedAndReady()){

            const callData:any = getCallData();

            setTimeout(()=>{
                
                connectCall( callData );

            },10);

        }

    }

    const connectOutgoingCallNow = () => {

        if(isAgoraLoadedAndReady()){

            const callData:any = getCallData();

            setTimeout(()=>{
                
                connectCall( callData );

            },100);

        }

    }

    const isAgoraLoadedAndReady = () => {

        if(f7.dovellous.instance.Libraries.Agora === null){
            return false;
        }

        return typeof f7.dovellous.instance.Libraries.Agora === "object" && f7.dovellous.instance.Libraries.Agora.hasOwnProperty('app');

    }

    const resetState = () => {        
        
        setCurrentCallSessionID('SID');

        setCurrentCallSessionChannel('SCH');

        setCurrentCallUserOrigin({displayName:'DNO',phoneNumber:'000'});

        setCurrentCallUserDestination({displayName:'DND',phoneNumber:'001'});

        setCurrentCallTimeDial(0);
        setCurrentCallTimeConnected(0);
        setCurrentCallTimeEnded(0);
        setCurrentCallDuration(0);
        setCurrentCallTimeDialAttempts([]);
    
        setCurrentCallViewStateName(K.ModuleComponentsLibs.im.callScreen.INITIALIZING);
        
        setCurrentCallActionMuted(false);
        setCurrentCallModeIsCameraTurnedON(isVideoCall);
        setCurrentCallTypeIsIncoming(isIncoming);
        setCurrentCallModeIsUsingFrontCamera(true);
        setCurrentCallModeIsLoudSpeakerTurnedON(false);
        setCurrentCallActionHold(false);
        setCurrentCallActionEnded(false);
        setCurrentCallActionAnswered(false);
        setCurrentCallActionDeclined(false);
        setCurrentCallActionInProgress(false);
        setCurrentCallTimeDialAttempts([]);
        setRingingTone(new Audio(song));

    }

    const addEventListeners = () => {
        
        f7.on(
            K.Events.Modules.Agora.AgoraLibEvent.MODULE_LOADED,
            (module: any)=>{

                enumerateDevices((devices: any) => {

                    f7.emit(
                        K.ModuleComponentsLibs.im.callScreen.DEVICES_ENUMERATED,
                        devices
                      );
                    
                    setAgoraAppParams(
                        module.app.agoraConfig.appId,
                        module.app.agoraConfig.clientCodec,
                        module.app.agoraConfig.clientMode,
                    );

                    setAgoraTracksConfig(
                        module.app.agoraConfig.imCallConfig.audioSettings,
                        module.app.agoraConfig.imCallConfig.videoSettings,
                    );
                
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
                onCallConnected(connectedCallDetails);
            }
        );

        f7.on(
            K.ModuleComponentsLibs.im.callScreen.DISCONNECTED, () => {

                setCurrentCallActionEnded(true);
                setCurrentCallActionInProgress(false);

                setCurrentCallViewStateName(
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

        initCallObjectData();

        setCurrentCallModeIsCameraTurnedON(isVideoCall);

        setCurrentCallTypeIsIncoming(isIncoming);

        init(isIncoming);

        return resetState;

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
                style={{backgroundImage: `url(${userDefinedData.displayPhoto})`}}
            >

                <div className="backdrop blurry" />

                {currentCallModeIsCameraTurnedON && (

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

                        remoteUsers.length === 1 && (

                        <div className='player-container-duo'>

                            <div id="remote" className={`remote ${currentCallActionInProgress?'connected':'not-connected'}`} >
                                <MediaPlayer 
                                    uuid={`remote-video`} 
                                    user={remoteUsers[0]} 
                                    videoTrack={remoteUsers[0].videoTrack} 
                                    audioTrack={remoteUsers[0].audioTrack} />
                            </div>

                            <div id="local" className={`local ${currentCallActionInProgress?'connected':'not-connected'}`} >
                                <MediaPlayer 
                                    uuid={`local-video`}
                                    user={null}
                                    videoTrack={localVideoTrack} 
                                    audioTrack={undefined} />
                            </div>
                        
                        </div>

                        )

                    )}


                </div>

                )}

                <PageContent>
                   
                    <div className="call-remote-user" style={{visibility: currentCallModeIsCameraTurnedON?'hidden':'visible'}}>
                        <img src={userDefinedData.displayPhoto??''} alt={``} />
                        <BlockTitle large>{userDefinedData.displayName}</BlockTitle>
                        {viewIncludeInCurrentState(
                                    [
                                        K.ModuleComponentsLibs.im.callScreen.INCOMING,
                                        K.ModuleComponentsLibs.im.callScreen.OUTGOING,
                                    ]
                        ) && (
                            <BlockTitle medium style={{textAlign: 'center'}}>{userDefinedData.phoneNumber}</BlockTitle>
                        )}
                        <BlockTitle medium style={{textAlign: 'center'}}>{currentCallViewStateName}</BlockTitle>
                        <BlockTitle medium style={{textAlign: 'center'}}>
                            <CallTimer className={``} visible={
                                viewIncludeInCurrentState(
                                    [
                                        K.ModuleComponentsLibs.im.callScreen.CONNECTED,
                                        K.ModuleComponentsLibs.im.callScreen.ENDED,
                                    ]
                                )} />
                        </BlockTitle>
                    </div>
                   
                    {viewIncludeInCurrentState(
                        [K.ModuleComponentsLibs.im.callScreen.PAUSED]
                    ) && (
                    <div className="call-actions" onClick={onActionsHoldHandler}>
                        <Button large outline round text="Resume Call" color="green" />
                    </div>
                    )}

                    {viewIncludeInCurrentState(
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

                    {viewIncludeInCurrentState(
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
                            iconIos={`f7:${currentCallModeIsLoudSpeakerTurnedON?'speaker_slash_fill':'speaker_2_fill'}`}
                            iconMd={`material:${currentCallModeIsLoudSpeakerTurnedON?'volume_up':'volume_off'}`}
                            iconAurora={`f7:${currentCallModeIsLoudSpeakerTurnedON?'speaker_slash_fill':'speaker_2_fill'}`}
                            iconSize={24} 
                        />

                        {currentCallModeIsCameraTurnedON ? (

                        <Button outline large disabled={videoInputDevicesArray.length<2}
                            id="im-solid-rounded-switch-camera"
                            key="im-solid-rounded-switch-camera"
                            className={`im-solid-rounded ${currentCallModeIsCameraTurnedON?(currentCallModeIsUsingFrontCamera?'color-white':'color-yellow'):'color-white'}  ${videoInputDevicesArray.length<2?'disabled':''}`}
                            onClick={onFrontCameraToggle} 
                            iconIos={`f7:${currentCallModeIsUsingFrontCamera?'camera':'camera'}`}
                            iconMd={`material:${currentCallModeIsUsingFrontCamera?'video_camera_front':'video_camera_back'}`}
                            iconAurora={`f7:${currentCallModeIsUsingFrontCamera?'camera':'camera'}`}
                            iconSize={24} 
                        />
                        
                        ):(

                        <Button outline large
                            id="im-solid-rounded-mute"
                            key="im-solid-rounded-mute"
                            className="im-solid-rounded color-white"
                            onClick={onMuteToggle} 
                            iconIos={`f7:${!currentCallActionMuted?'mic_fill':'mic_slash_fill'}`}
                            iconMd={`material:${!currentCallActionMuted?'mic':'mic_off'}`}
                            iconAurora={`f7:${!currentCallActionMuted?'mic_fill':'mic_slash_fill'}`}
                            iconSize={24} 
                        />

                        )}

                        <Button outline large
                            disabled={videoInputDevicesArray.length<1}
                            id="im-solid-rounded-camera"
                            key="im-solid-rounded-camera"
                            className={`im-solid-rounded color-white  ${videoInputDevicesArray.length<1?'disabled':''}`}
                            onClick={onCameraToggle} 
                            iconIos={`f7:${currentCallModeIsCameraTurnedON?'videocam':'videocam_fill'}`}
                            iconMd={`material:${currentCallModeIsCameraTurnedON?'videocam_off':'videocam'}`}
                            iconAurora={`f7:${currentCallModeIsCameraTurnedON?'videocam':'videocam_fill'}`}
                            iconSize={24} 
                        />

                        <Button large fill textColor="white" bgColor="red"
                            id="im-solid-rounded-hangup"
                            key="im-solid-rounded-hangup"
                            className="im-solid-rounded"
                            onClick={onHangUpToggle} 
                            iconIos={`f7:${currentCallModeIsLoudSpeakerTurnedON?'phone_down_fill':'phone_down_fill'}`}
                            iconMd={`material:${currentCallModeIsLoudSpeakerTurnedON?'phone_enabled':'phone_enabled'}`}
                            iconAurora={`f7:${currentCallModeIsLoudSpeakerTurnedON?'phone_down_fill':'phone_down_fill'}`}
                            iconSize={24} 
                        />

                    </Block>

                    )}
                    
                </PageContent>

                {viewIncludeInCurrentState(
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

                        <span>{`Call ${currentCallTypeIsIncoming?'back':'again'}`}</span>

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

                {viewIncludeInCurrentState(
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

                {currentCallModeIsCameraTurnedON && viewIncludeInCurrentState(
                                    [
                                        K.ModuleComponentsLibs.im.callScreen.OUTGOING,
                                        K.ModuleComponentsLibs.im.callScreen.INCOMING,
                                        K.ModuleComponentsLibs.im.callScreen.CONNECTED,
                                        K.ModuleComponentsLibs.im.callScreen.ENDED,
                                    ]
                                ) && (

                <div className={`im-call-status-overlay ${!currentCallActionInProgress ? 'black' : currentCallActionHold ? 'red':'green'}`}>
                    <div className="info">
                        <span className="display-name">{userDefinedData.displayName}</span>
                        {viewIncludeInCurrentState(
                                    [
                                        K.ModuleComponentsLibs.im.callScreen.INCOMING,
                                        K.ModuleComponentsLibs.im.callScreen.OUTGOING,
                                    ]
                        ) && (
                            <span className="display-number">{userDefinedData.phoneNumber}</span>
                        )}
                        <CallTimer className="display-timer" visible={
                                    viewIncludeInCurrentState(
                                    [
                                        K.ModuleComponentsLibs.im.callScreen.CONNECTED,
                                        K.ModuleComponentsLibs.im.callScreen.ENDED,
                                    ]
                                )} 
                        />
                    </div>
                    <div className="status">
                        {currentCallModeIsCameraTurnedON ? (
                            currentCallActionHold ? (
                                <Icon 
                                    ios={`f7:${currentCallTypeIsIncoming?'videocam':'videocam'}`} 
                                    aurora={`f7:${currentCallTypeIsIncoming?'videocam':'videocam'}`} 
                                    md={`material:${currentCallTypeIsIncoming?'pause_circle_outline':'pause_circle_outline'}`} 
                                />
                            ):(
                                <Icon  
                                    ios={`f7:${currentCallTypeIsIncoming?'videocam_fill':'videocam_fill'}`} 
                                    aurora={`f7:${currentCallTypeIsIncoming?'videocam_fill':'videocam_fill'}`} 
                                    md={`material:${currentCallTypeIsIncoming?'videocam':'videocam'}`} 
                                />
                            )
                        ):(
                            currentCallActionHold ? (
                                <Icon 
                                    ios={`f7:${currentCallTypeIsIncoming?'phone_arrow_down_left':'phone_arrow_up_right'}`} 
                                    aurora={`f7:${currentCallTypeIsIncoming?'phone_arrow_down_left':'phone_arrow_up_right'}`} 
                                    md={`material:${currentCallTypeIsIncoming?'phone_paused':'phone_paused'}`} 
                                />
                            ):(
                                <Icon 
                                    ios={`f7:${currentCallTypeIsIncoming?'phone_fill_arrow_down_left':'phone_fill_arrow_up_right'}`} 
                                    aurora={`f7:${currentCallTypeIsIncoming?'phone_fill_arrow_down_left':'phone_fill_arrow_up_right'}`} 
                                    md={`material:${currentCallTypeIsIncoming?'phone':'phone'}`} 
                                />
                            )
                        )}
                        <div className="display-state">
                            {currentCallViewStateName}
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
                            iconIos={`f7:${currentCallModeIsLoudSpeakerTurnedON ? 'phone_down_fill' : 'phone_down_fill'}`}
                            iconMd={`material:${currentCallModeIsLoudSpeakerTurnedON ? 'phone_enabled' : 'phone_enabled'}`}
                            iconAurora={`f7:${currentCallModeIsLoudSpeakerTurnedON ? 'phone_down_fill' : 'phone_down_fill'}`}
                            iconSize={24}
                        />
                        <Button large fill textColor="white" bgColor="red"
                            id="im-solid-rounded-hangup"
                            key="im-solid-rounded-hangup"
                            className="im-solid-rounded"
                            onClick={onHangUpToggle}
                            iconIos={`f7:${currentCallModeIsLoudSpeakerTurnedON ? 'phone_down_fill' : 'phone_down_fill'}`}
                            iconMd={`material:${currentCallModeIsLoudSpeakerTurnedON ? 'phone_enabled' : 'phone_enabled'}`}
                            iconAurora={`f7:${currentCallModeIsLoudSpeakerTurnedON ? 'phone_down_fill' : 'phone_down_fill'}`}
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

