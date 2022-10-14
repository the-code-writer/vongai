import { Block, BlockTitle, Button, f7, Fab, FabButton, FabButtons, Icon, List, ListItem, PageContent, Preloader, Sheet } from "framework7-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

import * as IMCallTypeInterfaces from "../../../libraries/agora/apps/voice/IMCallTypeInterfaces";

import K from "../../../libraries/app/konstants";

import Dom7 from "dom7";

import avatar from '../../../../assets/img/avatar/default.png';
import ringtoneIncomingCall from '../../../../assets/aud/incoming-0.mp3';
import ringtoneOutgoingCall from '../../../../assets/aud/outgoing-0.mp3';

import { StorageIM, useStorageIM } from "../store/im-store";
import Snippets from "../../../libraries/app/snippets";
import useAgoraMediaService from "../../../libraries/agora/hooks/UseAgoraMediaService";
import useAgoraIMCallDuration from "../../../libraries/agora/hooks/UseAgoraIMCallDuration";
import MediaPlayer from "../../../libraries/agora/components/MediaPlayer";

import AgoraRTC, { IAgoraRTCRemoteUser, UID } from 'agora-rtc-sdk-ng';

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

    const [currentCallViewStateName, setCurrentCallViewStateName] = useState(K.ModuleComponentsLibs.im.callScreen.states.INITIALIZING);

    const [currentCallPayload, setCurrentCallPayload] = useState<IMCallTypeInterfaces.CallDataObject >({});

    const [currentCallUUID, setCurrentCallUUID] = useState<UID | null | undefined>('UID');

    const [currentCallSessionID, setCurrentCallSessionID] = useState<String>('SID');

    const [currentCallSessionChannel, setCurrentCallSessionChannel] = useState<String>('SCH');

    const [currentCallSessionPayload, setCurrentCallSessionPayload] = useState<any>({});

    const [currentCallSummary, setCurrentCallSummary] = useState<any | undefined>(undefined);

    const [currentCallUserData, setCurrentCallUserData] = useState<IMCallTypeInterfaces.UserDataObject>(userDefinedData);

    const [currentCallUserOrigin, setCurrentCallUserOrigin] = useState<IMCallTypeInterfaces.CallOriginObject>({displayName:'DNO',phoneNumber:'000'});

    const [currentCallUserDestination, setCurrentCallUserDestination] = useState<IMCallTypeInterfaces.CallDestinationObject>({displayName:'DND',phoneNumber:'001'});

    const [currentCallTimeStarted, setCurrentCallTimeStarted] = useState<number>(0);
    const [currentCallTimeAnswered, setCurrentCallTimeAnswered] = useState<number>(0);
    const [currentCallTimeEnded, setCurrentCallTimeEnded] = useState<number>(0);
    const [currentCallDialAttempts, setCurrentCallTimeStartedAttempts] = useState<String[]>([]);

    const [currentCallStateINITIALIZING, setCurrentCallStateINITIALIZING] = useState<boolean>(true);
    const [currentCallStateRINGING, setCurrentCallStateRINGING] = useState<boolean>(false);
    const [currentCallStateCONNECTING_LOCAL_USER, setCurrentCallStateCONNECTING_LOCAL_USER] = useState<boolean>(false);
    const [currentCallStateCONNECTING_REMOTE_USER, setCurrentCallStateCONNECTING_REMOTE_USER] = useState<boolean>(false);
    const [currentCallStateCONNECTED_LOCAL_USER, setCurrentCallStateCONNECTED_LOCAL_USER] = useState<boolean>(false);
    const [currentCallStateCONNECTED_REMOTE_USER,  setCurrentCallStateCONNECTED_REMOTE_USER] = useState<boolean>(false);
    const [currentCallStateCONNECTED_REMOTE_USER_COUNT,  setCurrentCallStateCONNECTED_REMOTE_USER_COUNT] = useState<number[]>([0,0]);
    const [currentCallStateONHOLD, setCurrentCallStateONHOLD] = useState<boolean>(false);
    const [currentCallStateRECONNECTING, setCurrentCallStateRECONNECTING] = useState<boolean>(false);
    const [currentCallStateDISCONNECTING, setCurrentCallStateDISCONNECTING] = useState<boolean>(false);
    const [currentCallStateDISCONNECTED, setCurrentCallStateDISCONNECTED] = useState<boolean>(false);

    const [currentCallActionAnswered, setCurrentCallActionAnswered] = useState<boolean>(false);
    const [currentCallActionDeclined, setCurrentCallActionDeclined] = useState<boolean>(false);
    const [currentCallActionInProgress, setCurrentCallActionInProgress] = useState<boolean>(false);
    const [currentCallActionMuted, setCurrentCallActionMuted] = useState<boolean>(false);

    const [currentCallTypeIsIncoming, setCurrentCallTypeIsIncoming] = useState<boolean>(isIncoming);
    const [currentCallTypeIsVideo, setCurrentCallTypeIsVideo] = useState<boolean>(isVideoCall);

    const [currentCallModeIsUsingFrontCamera, setCurrentCallModeIsUsingFrontCamera] = useState<boolean>(true);
    const [currentCallModeIsCameraTurnedON, setCurrentCallModeIsCameraTurnedON] = useState<boolean>(isVideoCall);
    const [currentCallModeIsLoudSpeakerTurnedON, setCurrentCallModeIsLoudSpeakerTurnedON] = useState<boolean>(false);

    const [isAgoraModuleReady, setIsAgoraModuleReady] = useState<boolean>(false);

    const [ringingToneIncomingCall, setRingingToneIncomingCall] = useState(new Audio(ringtoneIncomingCall));
    const [ringingToneOutgoingCall, setRingingToneOutgoingCall] = useState(new Audio(ringtoneOutgoingCall));

    const ringingTonePlayIncomingCall = () => {
        f7.utils.nextTick(()=>{
            ringingToneIncomingCall.loop = true;
            ringingToneIncomingCall.autoplay = true;
            ringingToneIncomingCall.load();
            ringingToneIncomingCall.play();
        },1000);
    }

    const ringingToneStopIncomingCall = () => {
        ringingToneIncomingCall.pause();
    }

    const ringingTonePlayOutgoingCall = () => {
        f7.utils.nextTick(()=>{
            ringingToneOutgoingCall.loop = true;
            ringingToneOutgoingCall.autoplay = true;
            ringingToneOutgoingCall.volume = 0.05;
            ringingToneOutgoingCall.load();
            ringingToneOutgoingCall.play();
        },1000);
    }

    const ringingToneStopOutgoingCall = () => {
        ringingToneOutgoingCall.pause();
    }

    const ringingToneStop = () => {
        ringingToneStopOutgoingCall();
        ringingToneStopIncomingCall();
    }

    const {
        agoraIMCallDurationStartTimer,
        agoraIMCallDurationStopTimer,
        agoraIMCallDurationText
    } = useAgoraIMCallDuration();
    
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

        const remoteUsersTotal:number = currentCallStateCONNECTED_REMOTE_USER_COUNT[0] + 1;

        // Check which one is the best

        setCurrentCallStateCONNECTED_REMOTE_USER_COUNT([remoteUsersTotal, remoteUsers.length]);

        if(remoteUsers.length === 1){

            onCallConnected();

        }
  
        onUserJoined(user);

      }
  
      const onUserLeftHandler  = (user: IAgoraRTCRemoteUser) => {
  
        console.warn(":::: === AGORA EVENT [onUserLeftHandler] === :::", user);

        onUserLeft(user);
  
      }
  
      const onHostJoinedHandler  = (payload: any) => {
  
        console.warn(":::: === AGORA EVENT [onHostJoined] === :::", payload);

        setCurrentCallSessionPayload(payload);

        setCurrentCallStateCONNECTED_LOCAL_USER(true);
  
      }

    const { 
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
    } = useAgoraMediaService(
        f7,
        onHostJoinedHandler,
        onUserPublishedHandler,
        onUserUnpublishedHandler,
        onUserJoinedHandler,
        onUserLeftHandler
    );

    const currentCallPayloadSnapshot = () => {

        const _currentCallPayload: IMCallTypeInterfaces.CallDataObject = currentCallPayload;

        _currentCallPayload.uid = currentCallUUID;
        _currentCallPayload.userData = currentCallUserData;
        _currentCallPayload.origin = currentCallUserOrigin;
        _currentCallPayload.destination = currentCallUserDestination;
        _currentCallPayload.callStartedTimestamp = currentCallTimeStarted;
        _currentCallPayload.callSessionID = currentCallSessionID;
        _currentCallPayload.callSessionChannel = currentCallSessionChannel;
        _currentCallPayload.isVideoCall = currentCallTypeIsVideo;
        _currentCallPayload.isIncoming= currentCallTypeIsIncoming;

        _currentCallPayload.callAnsweredTimestamp = currentCallTimeAnswered;

        _currentCallPayload.callDialAttempts = currentCallDialAttempts;

        _currentCallPayload.callHooks = {
                client,
                localAudioTrack,
                localVideoTrack,
                localClientUID,
                localClientChannel,
                localClientSessionToken,
                localClientSessionID,
                joinState,
                joiningState,
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

        return _currentCallPayload;

    };

    const getCurrentCallViewStateLabel = (state: string) => {

        return K.ModuleComponentsLibs.im.callScreen.labels[state];

    }

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

        onMute(currentCallPayloadSnapshot());

        //TODO - function

    };

    const onUnMuteHandler = () => {

        setCurrentCallActionMuted(false);

        onUnMute(currentCallPayloadSnapshot());

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

        onCameraOn(currentCallPayloadSnapshot());

    };

    const onCameraOffHandler = () => {

        setCurrentCallModeIsCameraTurnedON(false);

        onCameraOff(currentCallPayloadSnapshot());

    };

    const onLoudSpeakerToggle = () => {

        currentCallModeIsLoudSpeakerTurnedON ? onLoudSpeakerOffHandler() : onLoudSpeakerOnHandler();

        setNextAudioOutputDevicesIndex();

    };

    const onLoudSpeakerOnHandler = () => {

        setCurrentCallModeIsLoudSpeakerTurnedON(true);

        onLoudSpeakerOn(currentCallPayloadSnapshot());

    };

    const onLoudSpeakerOffHandler = () => {

        setCurrentCallModeIsLoudSpeakerTurnedON(false);

        onLoudSpeakerOff(currentCallPayloadSnapshot());

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

        //TODO: Must be called when app receives Call Ended by remote

    };

    const onEndedCallHandleDisconnections = async () => {

        setCurrentCallActionAnswered(false);
        setCurrentCallActionDeclined(false);
        setCurrentCallActionInProgress(false);

        setCurrentCallStateINITIALIZING(false);
        setCurrentCallStateRINGING(false);
        setCurrentCallStateCONNECTING_LOCAL_USER(false);
        setCurrentCallStateCONNECTING_REMOTE_USER(false);
        setCurrentCallStateCONNECTED_LOCAL_USER(false);
        setCurrentCallStateCONNECTED_REMOTE_USER(false);
        setCurrentCallStateONHOLD(false);
        setCurrentCallStateRECONNECTING(false);
        setCurrentCallStateDISCONNECTING(true);
        setCurrentCallStateDISCONNECTED(false);

        await disconnectCall();
        
        onCallDisConnected();

        onEndedCall(currentCallPayloadSnapshot());

    };

    const onHoldToggle = () => {

        !currentCallStateONHOLD ? onHoldCallHandler():onUnHoldCallHandler();

    };

    const onHoldCallHandler = () => {

        setCurrentCallStateINITIALIZING(false);
        setCurrentCallStateRINGING(false);
        setCurrentCallStateCONNECTING_LOCAL_USER(false);
        setCurrentCallStateCONNECTING_REMOTE_USER(false);
        setCurrentCallStateCONNECTED_LOCAL_USER(true);
        setCurrentCallStateCONNECTED_REMOTE_USER(true);
        setCurrentCallStateONHOLD(true);
        setCurrentCallStateRECONNECTING(false);
        setCurrentCallStateDISCONNECTING(false);
        setCurrentCallStateDISCONNECTED(false);

        setCurrentCallViewStateName(
            K.ModuleComponentsLibs.im.callScreen.states.ON_HOLD
        );

        onHoldCall(currentCallPayloadSnapshot());

        //TODO: Mute video and audio

    };

    const onUnHoldCallHandler = () => {

        setCurrentCallStateINITIALIZING(false);
        setCurrentCallStateRINGING(false);
        setCurrentCallStateCONNECTING_LOCAL_USER(false);
        setCurrentCallStateCONNECTING_REMOTE_USER(false);
        setCurrentCallStateCONNECTED_LOCAL_USER(true);
        setCurrentCallStateCONNECTED_REMOTE_USER(true);
        setCurrentCallStateONHOLD(false);
        setCurrentCallStateRECONNECTING(false);
        setCurrentCallStateDISCONNECTING(false);
        setCurrentCallStateDISCONNECTED(false);

        setCurrentCallViewStateName(
            K.ModuleComponentsLibs.im.callScreen.states.CONNECTED
        );

        onUnHoldCall(currentCallPayloadSnapshot());

        //TODO: Unmute video and audio

    };

    const onIncomingCallHandler = (_currentCallPayload: any) => {

        if(Object.keys(userDefinedData).length > 0 && userDefinedData.hasOwnProperty('phoneNumber')){

            ringingTonePlayIncomingCall();
            
            setCurrentCallActionAnswered(false);
            setCurrentCallActionDeclined(false);
            setCurrentCallActionInProgress(false);
            setCurrentCallTypeIsIncoming(true);

            setCurrentCallStateINITIALIZING(false);
            setCurrentCallStateRINGING(true);
            setCurrentCallStateCONNECTING_LOCAL_USER(false);
            setCurrentCallStateCONNECTING_REMOTE_USER(false);
            setCurrentCallStateCONNECTED_LOCAL_USER(false);
            setCurrentCallStateCONNECTED_REMOTE_USER(false);
            setCurrentCallStateONHOLD(false);
            setCurrentCallStateRECONNECTING(false);
            setCurrentCallStateDISCONNECTING(false);
            setCurrentCallStateDISCONNECTED(false);

            onIncomingCall(currentCallPayloadSnapshot());

            // Local Notification: PEER_INCOMING_CALL

            setCurrentCallViewStateName(
                K.ModuleComponentsLibs.im.callScreen.states.INCOMING
            );
    
        }

    };

    const onOutgoingCallHandler = (_currentCallPayload:any) => {

        ringingTonePlayOutgoingCall();
        
        setCurrentCallActionAnswered(false);
        setCurrentCallActionDeclined(false);
        setCurrentCallActionInProgress(false);
        setCurrentCallTypeIsIncoming(false);

        setCurrentCallStateINITIALIZING(false);
        setCurrentCallStateRINGING(false);
        setCurrentCallStateCONNECTING_LOCAL_USER(false);
        setCurrentCallStateCONNECTING_REMOTE_USER(false);
        setCurrentCallStateCONNECTED_LOCAL_USER(false);
        setCurrentCallStateCONNECTED_REMOTE_USER(false);
        setCurrentCallStateONHOLD(false);
        setCurrentCallStateRECONNECTING(false);
        setCurrentCallStateDISCONNECTING(false);
        setCurrentCallStateDISCONNECTED(false);

        connectOutgoingCallNow(_currentCallPayload);

        onOutgoingCall(currentCallPayloadSnapshot());

        // Send IM to calee: PEER_INCOMING_CALL

        // Local Notification: OUTGOING_CALL

        setCurrentCallViewStateName(
            K.ModuleComponentsLibs.im.callScreen.states.OUTGOING
        );

    };

    const onCallConnectingRemote = ( )=>{

        // Invoked when remote clicks 'ANSWER'
        // Send IM to FB [{Groups: {ABC: {calls: '0x837...3eca': {host: {uid}, users: {uid: {phoneNumber:12345}}}}}] : {callSessionID: '0x837...3eca', user: {displayName: '', phoneNumber: '', username: ''}}
        // App checks for group calls / user 1 on 1 calls

        console.warn("::::::*********** CALL CONNECTING PEER ************:::::: ", currentCallPayloadSnapshot());

        ringingToneStop();

        setCurrentCallActionAnswered(true);
        setCurrentCallActionDeclined(false);
        setCurrentCallActionInProgress(false);
        setCurrentCallStateRINGING(false);
        setCurrentCallStateCONNECTING_REMOTE_USER(true);

        if(remoteUsers.length===1){
            setCurrentCallStateCONNECTED_REMOTE_USER(false);
            setCurrentCallViewStateName( K.ModuleComponentsLibs.im.callScreen.states.CONNECTING );
        }

        // Send IM to caller: PEER_CONNECTING

    }

    const onCallConnectedRemote = ( )=>{

        // Connected remote

        console.warn("::::::*********** CALL CONNECTING PEER ************:::::: ", currentCallPayloadSnapshot());

        setCurrentCallStateCONNECTING_REMOTE_USER(false);
        setCurrentCallStateCONNECTED_REMOTE_USER(true);
        
        setCurrentCallViewStateName( K.ModuleComponentsLibs.im.callScreen.states.CONNECTED);

        // Send IM to caller: PEER_CONNECTING

    }

    const onCallConnectingLocal = ( )=>{

        // Invoked when remote clicks 'ANSWER'
        // Send IM to FB [{Groups: {ABC: {calls: '0x837...3eca': {host: {uid}, users: {uid: {phoneNumber:12345}}}}}] : {callSessionID: '0x837...3eca', user: {displayName: '', phoneNumber: '', username: ''}}
        // App checks for group calls / user 1 on 1 calls

        console.warn("::::::*********** CALL CONNECTING PEER ************:::::: ", currentCallPayloadSnapshot());

        setCurrentCallActionAnswered(false);
        setCurrentCallActionDeclined(false);
        setCurrentCallActionInProgress(false);
        setCurrentCallStateRINGING(true);
        setCurrentCallStateCONNECTING_LOCAL_USER(true);

        if(remoteUsers.length===1){
            setCurrentCallStateCONNECTED_REMOTE_USER(false);
            setCurrentCallViewStateName( K.ModuleComponentsLibs.im.callScreen.states.CONNECTING );
        }

        // Send IM to caller: PEER_CONNECTING

    }

    const onCallConnectedLocal = ( )=>{

        // Connected remote

        console.warn("::::::*********** CALL CONNECTING PEER ************:::::: ", currentCallPayloadSnapshot());

        setCurrentCallStateCONNECTING_LOCAL_USER(false);
        setCurrentCallStateCONNECTED_LOCAL_USER(true);
        
        setCurrentCallViewStateName( K.ModuleComponentsLibs.im.callScreen.states.CONNECTED);

        // Send IM to caller: PEER_CONNECTING

    }

    const onCallConnected = ()=>{
        
        console.warn("::::::*********** CALL CONNECTED ************:::::: ", currentCallSessionPayload);
  
        ringingToneStop();

        const  timeStampAnswered:number = f7.utils.now();

        setCurrentCallTimeAnswered(timeStampAnswered);

        agoraIMCallDurationStartTimer(timeStampAnswered);

        setCurrentCallActionAnswered(false);
        setCurrentCallActionDeclined(false);
        setCurrentCallActionInProgress(true);

        setCurrentCallStateINITIALIZING(false);
        setCurrentCallStateRINGING(false);
        setCurrentCallStateCONNECTING_LOCAL_USER(false);
        setCurrentCallStateCONNECTING_REMOTE_USER(false);
        setCurrentCallStateCONNECTED_LOCAL_USER(true);
        setCurrentCallStateCONNECTED_REMOTE_USER(true);
        setCurrentCallStateONHOLD(false);
        setCurrentCallStateRECONNECTING(false);
        setCurrentCallStateDISCONNECTING(false);
        setCurrentCallStateDISCONNECTED(false);

        setCurrentCallViewStateName(
            K.ModuleComponentsLibs.im.callScreen.states.CONNECTED
        );

    }

    const onCallDisConnected = ()=>{

        ringingToneStop();

        const endedTimestamp:number = f7.utils.now();

        let callDuration:number = 0;

        const callSummary:any = currentCallPayloadSnapshot();

        agoraIMCallDurationStopTimer();

        setCurrentCallTimeEnded(endedTimestamp);

        if(endedTimestamp > 0){

            callDuration = Math.floor((endedTimestamp-callSummary.callAnsweredTimestamp)/1000);

        }
        
        callSummary.callDuration = callDuration;

        callSummary.callEndedTimestamp = endedTimestamp;

        if(callSummary.callAnsweredTimestamp > 0 && callDuration > 0){
                
            setCurrentCallSummary(callSummary);

            onCallSummaryHandler(callSummary);

        }

        setCurrentCallActionAnswered(false);
        setCurrentCallActionDeclined(false);
        setCurrentCallActionInProgress(false);

        setCurrentCallStateINITIALIZING(false);
        setCurrentCallStateRINGING(false);
        setCurrentCallStateCONNECTING_LOCAL_USER(false);
        setCurrentCallStateCONNECTING_REMOTE_USER(false);
        setCurrentCallStateCONNECTED_LOCAL_USER(false);
        setCurrentCallStateCONNECTED_REMOTE_USER(false);
        setCurrentCallStateONHOLD(false);
        setCurrentCallStateRECONNECTING(false);
        setCurrentCallStateDISCONNECTING(false);
        setCurrentCallStateDISCONNECTED(true);

        setCurrentCallViewStateName(
            K.ModuleComponentsLibs.im.callScreen.states.DISCONNECTED
        );

    }

    const onCallSummaryHandler = (callSummary: any) => {

        console.warn("::::::*********** CALL DISCONNECTED : SUMMARY ************:::::: ", callSummary);

    }

    const onAnswerCallHandler = () => {

        onCallConnecting( true );

        connectIncomingCallNow(currentCallPayload);

        onAnswerCall(currentCallPayloadSnapshot());

    };

    const onDeclineCallHandler = () => {

        ringingToneStop();

        setCurrentCallActionAnswered(false);
        setCurrentCallActionDeclined(true);
        setCurrentCallActionInProgress(false);

        setCurrentCallStateINITIALIZING(false);
        setCurrentCallStateRINGING(false);
        setCurrentCallStateCONNECTING_LOCAL_USER(false);
        setCurrentCallStateCONNECTING_REMOTE_USER(false);
        setCurrentCallStateCONNECTED_LOCAL_USER(false);
        setCurrentCallStateCONNECTED_REMOTE_USER(false);
        setCurrentCallStateONHOLD(false);
        setCurrentCallStateRECONNECTING(false);
        setCurrentCallStateDISCONNECTING(false);
        setCurrentCallStateDISCONNECTED(true);

        setCurrentCallViewStateName( K.ModuleComponentsLibs.im.callScreen.states.DISCONNECTED );

        onCloseThisCallScreen();

        onDeclineCall(currentCallPayloadSnapshot());

    };

    const onActionsAddParticipantHandler = () => {

        f7.sheet.open('.im-callscreen-action-add-participant');

    }

    const onActionsChatHandler = () => {

        f7.sheet.open('.im-callscreen-action-chat');

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

        resetState();

        onCloseAllCallScreenSheetsHandler();
        
        //userDefinedData = {};
        
        f7.sheet.close(`.${id}`);

    }

    const init = async (_isIncomingCall: boolean, _isVideoCall: boolean) => {

        //Setup user data

        setCurrentCallUserData(userDefinedData);

        //Set up call participants

        const originPhoneNumber:String = "00263772123456";

        const originDisplayName:String = "William Kansepa";

        const _origin: IMCallTypeInterfaces.CallOriginObject = {displayName: originDisplayName, phoneNumber: originPhoneNumber};

        setCurrentCallUserOrigin(_origin);

        const destinationPhoneNumber:String = userDefinedData.phoneNumber;

        const destinationDisplayName:String = userDefinedData.displayName;

        const _destination: IMCallTypeInterfaces.CallDestinationObject = {displayName: destinationDisplayName, phoneNumber: destinationPhoneNumber};

        setCurrentCallUserDestination(_destination);

        //Set up call session

        const _currentTimestamp = f7.utils.now();

        const _currentCallSessionData1 = String(`call:${_isVideoCall?'video':'audio'}:${_isIncomingCall?'incoming':'outgoing'}:${_currentTimestamp}:${String(originPhoneNumber).replace(/\W/g, '')}:${String(destinationPhoneNumber).replace(/\W/g, '')}`).toLowerCase();

        const _currentCallSessionData2Float = Snippets.numbers.randomFloat(1000000, 9000000);

        const _currentCallSessionData2String = f7.utils.id(`xxxxxx.xxxxxx.xxxxxx.xxxxxx.xxxxxx`, '0123456789abcdef');

        const _currentCallSessionData2 = String(`${_currentCallSessionData2String}.${_currentCallSessionData2Float}`);

        const _currentCallUUID = _isIncomingCall ? 
        Snippets.encryption.sha1(`${String(destinationPhoneNumber).replace(/\W/g, '')}:${String(originPhoneNumber).replace(/\W/g, '')}`) : 
        Snippets.encryption.sha1(`${String(originPhoneNumber).replace(/\W/g, '')}:${String(destinationPhoneNumber).replace(/\W/g, '')}`);

        const _currentCallSessionID= `${_currentCallSessionData1}/${_currentCallSessionData2}/${_currentCallUUID}`;

        const _currentCallSessionChannel = Snippets.encryption.sha1(_currentCallSessionID);

        setCurrentCallUUID(_currentCallUUID);

        setCurrentCallSessionID(_currentCallSessionID);

        setCurrentCallSessionChannel(_currentCallSessionChannel);

        setCurrentCallTypeIsVideo(_isVideoCall);

        setCurrentCallTypeIsIncoming(_isIncomingCall);

        setCurrentCallTimeStarted(_currentTimestamp);
        
        //Set up call payload

        const _callPayload: IMCallTypeInterfaces.CallDataObject = {
            uid: _currentCallUUID,
            userData: userDefinedData,
            origin: _origin,
            destination: _destination,
            callStartedTimestamp: _currentTimestamp,
            callSessionID: _currentCallSessionID,
            callSessionChannel: _currentCallSessionChannel,
            isVideoCall: _isVideoCall,
            isIncoming: _isIncomingCall,
        }

        setCurrentCallPayload(_callPayload);
        
        _isIncomingCall ? onIncomingCallHandler(_callPayload) : onOutgoingCallHandler(_callPayload);
  
    }

    const connectIncomingCallNow = (callPayload: IMCallTypeInterfaces.CallDataObject) => {

        if(isAgoraModuleReady){
            
            connectCall( callPayload );

        }

    }

    const connectOutgoingCallNow = (callPayload: IMCallTypeInterfaces.CallDataObject) => {

        const newCallAttempts:String[] = [...currentCallDialAttempts, f7.utils.now()];

        setCurrentCallTimeStartedAttempts(newCallAttempts);

        if(isAgoraModuleReady){

            connectCall( callPayload );

        }

    }

    const resetState = () => {

        removeEventListeners();

        setCurrentCallViewStateName(K.ModuleComponentsLibs.im.callScreen.states.INITIALIZING);

        setCurrentCallSessionID('SID');

        setCurrentCallSessionChannel('SCH');

        setCurrentCallUserOrigin({displayName:'DNO',phoneNumber:'000'});

        setCurrentCallUserDestination({displayName:'DND',phoneNumber:'001'});

        setCurrentCallTimeStarted(0);
        setCurrentCallTimeAnswered(0);
        setCurrentCallTimeEnded(0);
        setCurrentCallTimeStartedAttempts([]);

        setCurrentCallStateINITIALIZING(true);
        setCurrentCallStateRINGING(false);
        setCurrentCallStateCONNECTING_LOCAL_USER(false);
        setCurrentCallStateCONNECTING_REMOTE_USER(false);
        setCurrentCallStateCONNECTED_LOCAL_USER(false);
        setCurrentCallStateCONNECTED_REMOTE_USER(false);
        setCurrentCallStateRECONNECTING(false);
        setCurrentCallStateDISCONNECTING(false);
        setCurrentCallStateDISCONNECTED(false);

        setCurrentCallActionAnswered(false);
        setCurrentCallActionDeclined(false);
        setCurrentCallActionInProgress(false);
        setCurrentCallActionMuted(false);

        setCurrentCallTypeIsIncoming(isIncoming);
        setCurrentCallTypeIsVideo(isVideoCall);

        setCurrentCallModeIsUsingFrontCamera(true);
        setCurrentCallModeIsCameraTurnedON(isVideoCall);
        setCurrentCallModeIsLoudSpeakerTurnedON(false);

    }

    const addEventListeners = () => {
        
        f7.on( K.Events.Modules.Agora.App.ON_APP_INIT, (module: any)=>{

            setIsAgoraModuleReady(true);

            const agoraConfigurations:any = module.app.agoraConfig;

                enumerateDevices((devices: any) => {

                    f7.emit( K.ModuleComponentsLibs.im.callScreen.states.DEVICES_ENUMERATED, devices );
                    
                    setAgoraAppParams(
                        agoraConfigurations.appId,
                        agoraConfigurations.clientCodec,
                        agoraConfigurations.clientMode,
                    );

                    setAgoraTracksConfig(
                        agoraConfigurations.imCallConfig.audioSettings,
                        agoraConfigurations.imCallConfig.videoSettings,
                    );
                
                });
                
            }

        );

        f7.on( K.ModuleComponentsLibs.im.callScreen.states.DISCONNECTED, () => {

            onCallDisConnected();

        });

        f7.on( K.ModuleComponentsLibs.im.callScreen.states.DISCONNECTED_BY_PEER, () => {

            onCallDisConnected();

        });

    }

    const removeEventListeners = () => {
        
        f7.off( K.Events.Modules.Agora.App.ON_APP_INIT );

        f7.off( K.ModuleComponentsLibs.im.callScreen.states.CONNECTING );

        f7.off( K.ModuleComponentsLibs.im.callScreen.states.CONNECTED );

        f7.off( K.ModuleComponentsLibs.im.callScreen.states.RECONNECTING );

        f7.off( K.ModuleComponentsLibs.im.callScreen.states.DISCONNECTING );

        f7.off( K.ModuleComponentsLibs.im.callScreen.states.DISCONNECTED );

        f7.off( K.ModuleComponentsLibs.im.callScreen.states.DISCONNECTED_BY_PEER);

    }

    useEffect(() => {

        resetState();

        addEventListeners();

        if(userDefinedData.hasOwnProperty('phoneNumber') && userDefinedData.phoneNumber !== undefined){

            setCurrentCallModeIsCameraTurnedON(isVideoCall);

            setCurrentCallTypeIsVideo(isVideoCall);

            setCurrentCallTypeIsIncoming(isIncoming);

            init(isIncoming, isVideoCall);

        }

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
                style={{backgroundImage: `url(${userDefinedData.displayPhoto})`, backgroundSize: `500%`, backgroundPosition: `center`}}
            >

                <div className="backdrop blurry" />

                <div className={`videos ${currentCallModeIsCameraTurnedON ? 'visible' : 'hidden'}`} >

                    {(remoteUsers.length > 1) ? (

                        <div className='player-container-conference'>

                            {localTracksAvailable && (

                            <div className={`local ${joinState?'connected':'not-connected'} ${currentCallStateDISCONNECTED ? 'call-disconnected':''}  ${remoteUsers.length === 0?'alone':''} ${localClientUID}`} key={localClientUID}>
                                
                                <MediaPlayer
                                    uuid={`${localClientUID}`}
                                    isLocal={true} 
                                    videoTrack={localVideoTrack} />
                                
                            </div>

                            )}
                        
                            {remoteUsers.map(user => (

                            <div className={`remote ${joinState?'connected':'not-connected'}  ${remoteUsers.length === 0?'alone':''} ${user.uid}`} key={user.uid}>
                                <MediaPlayer 
                                    uuid={user.uid} 
                                    user={user}
                                    isLocal={false} 
                                    videoTrack={user.videoTrack} 
                                    audioTrack={user.audioTrack} />
                            </div>

                            ))}

                        </div>

                    ):(

                        <div className={`player-container-duo`}>

                            {joinState && remoteUsers.length > 0 && (

                            <div className={`remote ${joinState?'connected':'not-connected'}  ${remoteUsers.length === 0?'alone':''} ${remoteUsers[0].uid} `} >

                                <MediaPlayer 
                                    uuid={remoteUsers[0].uid} 
                                    user={remoteUsers[0]}
                                    isLocal={false}  
                                    videoTrack={remoteUsers[0].videoTrack} 
                                    audioTrack={remoteUsers[0].audioTrack} />

                            </div>

                            )}

                            {localTracksAvailable && (

                            <div className={`local ${joinState?(remoteUsers.length > 0 ? 'connected':(currentCallStateCONNECTED_REMOTE_USER ? 'connected':'not-connected')):('not-connected')} ${currentCallStateDISCONNECTED ? 'call-disconnected':''}  ${remoteUsers.length === 0?'alone':''} ${localClientUID}`} key={localClientUID}>
                                                            
                                <MediaPlayer
                                    uuid={`${localClientUID}`}
                                    videoTrack={localVideoTrack}
                                    isLocal={true} />

                            </div>

                            )}
                        
                        </div>

                    )}


                </div>

                {
                    (
                        (!currentCallTypeIsVideo  && !currentCallModeIsCameraTurnedON) ||
                        (remoteUsers.length === 0 && !currentCallModeIsCameraTurnedON) || 
                        (remoteUsers.length === 0 &&  currentCallModeIsCameraTurnedON) || 
                        (remoteUsers.length   > 0 && !currentCallModeIsCameraTurnedON) 
                    )
                    && 
                    (

                    <div className="blink-container">

                        <div className="circle-wrapper" >
                            
                            { !currentCallStateDISCONNECTED && (

                                <React.Fragment>

                                    <div className={`circle ${currentCallStateCONNECTING_LOCAL_USER || currentCallStateCONNECTING_REMOTE_USER ?'connecting':''}  ${currentCallStateRECONNECTING?'reconnecting':''}  ${currentCallStateCONNECTED_REMOTE_USER?'connected':''} `} style={{animationDelay: "0s"}}></div>
                                    <div className="circle" style={{animationDelay: "1s"}}></div>
                                    <div className="circle" style={{animationDelay: "2s"}}></div>
                                    <div className={`circle ${currentCallStateCONNECTING_LOCAL_USER || currentCallStateCONNECTING_REMOTE_USER ?'connecting':''}  ${currentCallStateRECONNECTING?'reconnecting':''}  ${currentCallStateCONNECTED_REMOTE_USER?'connected':''} `} style={{animationDelay: "3s"}}></div>
                                    <div className="circle" style={{animationDelay: "4s"}}></div>
                                    <div className="circle" style={{animationDelay: "5s"}}></div>

                                </React.Fragment>

                            )}

                            <img 
                                src={userDefinedData.displayPhoto??avatar}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src=avatar;
                                }}
                                alt={``} />
                        </div>

                        <div className="call-remote-user" style={{visibility: (remoteUsers.length > 0)?'hidden':'visible'}}>
                            
                            <BlockTitle large>{userDefinedData.displayName}</BlockTitle>
                            {viewIncludeInCurrentState(
                                        [
                                            K.ModuleComponentsLibs.im.callScreen.states.DISCONNECTED,
                                        ]
                            ) && (
                                <BlockTitle medium style={{textAlign: 'center'}}>{userDefinedData.phoneNumber}</BlockTitle>
                            )}
                            <BlockTitle medium style={{textAlign: 'center'}}>
                                <span>
                                    {(!isIncoming && currentCallStateRINGING && K.ModuleComponentsLibs.im.callScreen.states.CONNECTING === currentCallViewStateName) ? 'Ringing' : K.ModuleComponentsLibs.im.callScreen.labels[currentCallViewStateName]}
                                </span>
                            </BlockTitle>
                            <BlockTitle medium style={{textAlign: 'center'}}>
                                {viewIncludeInCurrentState(
                                        [
                                            K.ModuleComponentsLibs.im.callScreen.states.INITIALIZING,
                                            K.ModuleComponentsLibs.im.callScreen.states.CONNECTING,
                                            K.ModuleComponentsLibs.im.callScreen.states.CONNECTED,
                                            K.ModuleComponentsLibs.im.callScreen.states.DISCONNECTING,
                                            K.ModuleComponentsLibs.im.callScreen.states.DISCONNECTED,
                                        ]
                                ) && (
                                    <span className="display-timer">{agoraIMCallDurationText}</span>
                                )}
                            </BlockTitle>
                        </div>
                    </div>

                )}

                <PageContent>
                    
                    {viewIncludeInCurrentState(
                        [
                            K.ModuleComponentsLibs.im.callScreen.states.ON_HOLD,
                        ]
                    ) && (
                    <div className="call-current-state" onClick={onActionsHoldHandler}>
                        <div className="blink-wrapper">                     
                            <div className="blink"></div>
                            <Icon color="black" ios="f7:phone_fill" aurora="f7:phone_fill" md="material:phone_paused" />
                        </div>
                    </div>
                    )}


                    {viewIncludeInCurrentState(
                        [
                            K.ModuleComponentsLibs.im.callScreen.states.CONNECTING,
                        ]
                    ) && (
                    
                    <div className="call-current-state" >
                        {localTracksAvailable ? (
                            <span>Waiting for {userDefinedData.displayName} to join call.</span>
                        ):(
                            <Preloader size={50} dark={true} color="white" />
                        )}
                    </div>

                    )}

                    {viewIncludeInCurrentState(
                        [
                            K.ModuleComponentsLibs.im.callScreen.states.CONNECTED,
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
                            K.ModuleComponentsLibs.im.callScreen.states.ON_HOLD,
                        ]
                    ) && (
                        <BlockTitle style={{textAlign: 'center'}}>
                            <span>Call is on hold. Click to resume.</span>
                        </BlockTitle>
                    )}

                    {viewIncludeInCurrentState(
                        [
                            K.ModuleComponentsLibs.im.callScreen.states.INITIALIZING,
                            K.ModuleComponentsLibs.im.callScreen.states.OUTGOING,
                            K.ModuleComponentsLibs.im.callScreen.states.CONNECTING,
                            K.ModuleComponentsLibs.im.callScreen.states.CONNECTED,
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
                    [
                        K.ModuleComponentsLibs.im.callScreen.states.DISCONNECTED
                    ]
                ) && (

                <div className="im-call-controls-wrapper ended">

                    <div className="im-call-button" onClick={()=>onOutgoingCallHandler(currentCallPayload)}>

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
                    [
                        K.ModuleComponentsLibs.im.callScreen.states.INCOMING
                    ]
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

