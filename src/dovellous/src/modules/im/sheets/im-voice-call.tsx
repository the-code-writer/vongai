import { Block, BlockTitle, Button, Col, f7, Fab, FabButton, FabButtons, Icon, Link, List, ListItem, Navbar, NavRight, NavTitle, PageContent, Row, Segmented, Sheet } from "framework7-react";
import React, { useCallback, useEffect, useState } from "react";
import { useStopwatch } from 'react-timer-hook';
import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng"
import K from "../../../libraries/app/konstants";
import Dom7 from "dom7";
import Blockchain from '../../../libraries/cryptography/blockchain';

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
        callEnded: number;
        isVideoCall: boolean;
        isIncoming: boolean;
    }

    const callObject: CallDataObject = {
        uid: null,
        destination: null,
        origin: null,
        callStarted: 0,
        callEnded: 0,
        isVideoCall: false,
        isIncoming: false,
    }

    const [currentUserData, setCurrentUserData] = useState(userObject);

    const [currentCallData, setCurrentCallData] = useState(callObject);

    const [currentCallInProgressDetails, setCurrentCallInProgressDetails] = useState(null);
    
    const [currentCallUID, setCurrentCallUID] = useState('');

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
                <span className={className} style={{opacity: visible?1:0}}>
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
            userObject: currentUserData,
            callObject: currentCallData,
        }

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

        isCameraOn ? onCameraOffHandler() : onCameraOnHandler();

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

        const _currentCallData = currentCallData;

        _currentCallData.callEnded = new Date().getTime();

        setCurrentCallData(_currentCallData);

        setIsCallEnded(true);
        setIsCallInProgress(false);

        setCurrentViewState(
            K.ModuleComponentsLibs.im.callScreen.ENDED
        );

        onCallDisConnected();

        onEndCall(getCallData());

    };

    const onEndedCallHandler = () => {
        
        const _currentCallData = currentCallData;

        _currentCallData.callEnded = new Date().getTime();

        setCurrentCallData(_currentCallData);

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

        setIsCallAnswered(false);
        setIsCallDeclined(false);
        setIsCallInProgress(false);

        setCurrentViewState(
            K.ModuleComponentsLibs.im.callScreen.INCOMING
        );

        onIncomingCall(getCallData());

    };

    const onOutgoingCallHandler = () => {

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

        onOutgoingCall(getCallData());

    };

    const onCallConnecting = ()=>{

        setCurrentViewState(
            K.ModuleComponentsLibs.im.callScreen.CONNECTING
        );

        f7.on(
            K.ModuleComponentsLibs.im.callScreen.CONNECTED,
            ( callDetails ) => {
                setCurrentCallInProgressDetails(callDetails);
                onCallConnected(callDetails);
            }
        );

        f7
        .dovellous.instance.Libraries
        .Agora.agoraApp.modules
        .voiceCall.lib.start(
            getCallData() // contains play and subscribes
        );

    }

    const onCallConnected = (callDetails)=>{

        f7.emit('startCallTimer');

        setIsCallInProgress(true);

    }

    const onCallDisConnected = ()=>{

        f7.emit('stopCallTimer');

        const duration = Dom7('.im-call-timer').text();

        const _dint = setInterval(()=>{

            Dom7('.im-call-timer').hide()

            setTimeout(()=>{
                
            Dom7('.im-call-timer').show()

            },300)

        }, 350);

        setTimeout(()=>{
            clearInterval(_dint);
        }, 2000);

        console.log("::>>> CALL SUMMARY <<<::", duration, getCallData());

        setIsCallInProgress(false);

    }

    const onAnswerCallHandler = () => {

        onCallConnecting();

        setIsCallAnswered(true);
        setIsCallDeclined(false);

        onAnswerCall(getCallData());

    };

    const onDeclineCallHandler = () => {

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
            callEnded: 0,
            isVideoCall: false,
            isIncoming: false,
        });

    }

    const client: IAgoraRTCClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

    interface RTCInterface {
        client: IAgoraRTCClient | null,
        localAudioTrack: any,
        localVideoTrack: any
    }
    
    const rtc:RTCInterface  = {
        // For the local client.
        client: null,
        // For the local audio and video tracks.
        localAudioTrack: null,
        localVideoTrack: null,
    };

    const options = {
        // Pass your app ID here.
        appId: import.meta.env.VNG_AGORA_APP_ID,
        // Set the channel name.
        channel: import.meta.env.VNG_AGORA_DEFAULT_CHANNEL,
        // Pass a token if your project enables the App Certificate.
        token: import.meta.env.VNG_AGORA_TOKEN,
    };

    const startBasicCall = async () => {

        // Get all audio and video devices.
            AgoraRTC.getDevices()
            .then(devices => {
                const audioDevices = devices.filter(function(device){
                    return device.kind === "audioinput";
                });
                const videoDevices = devices.filter(function(device){
                    return device.kind === "videoinput";
                });

                console.warn("::::DEVICES", audioDevices, videoDevices);

                var selectedMicrophoneId = audioDevices[0].deviceId;

                var selectedCameraId = videoDevices[0].deviceId;

                return Promise.all([
                    AgoraRTC.createCameraVideoTrack({ cameraId: selectedCameraId }),
                    AgoraRTC.createMicrophoneVideoTrack({ microphoneId: selectedMicrophoneId }),
                ]);

            });

        

        
        
        /**
         * Put the following code snippets here.
         */

        rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });

            const uid = rtc.client.join(options.appId, options.channel, options.token, null).then(async (uid)=>{

                callObject.uid = uid;

        setCurrentCallUID(uid);

        callObject.uid = uid;

        // Create an audio track from the audio sampled by a microphone.
        rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack(
            {
                encoderConfig: {
                  sampleRate: 48000,
                  stereo: true,
                  bitrate: 128,
                },
            }
        );
        // Create a video track from the video captured by a camera.
        rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack(
            {
                encoderConfig: {
                  width: { ideal: Dom7('html').width()*.75, min: Dom7('html').width()*.5, max: Dom7('html').width() },
                  // Specify a value range and an ideal value
                  height: { ideal: Dom7('html').height()*.75, min: Dom7('html').height()*.5, max: Dom7('html').height() },
                  frameRate: 15,
                  bitrateMin: 600, 
                  bitrateMax: 1000,
                },
            }
        );
        // Publish the local audio and video tracks to the channel.
        await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

        const playerContainerWrapper = Dom7("#im-player-container-remote");

        rtc.client.on("user-published", async (user, mediaType) => {
            // Subscribe to a remote user.
            await rtc.client.subscribe(user, mediaType);

            console.log("subscribe success");
          
            // If the subscribed track is video.
            if (mediaType === "video") {
              // Get `RemoteVideoTrack` in the `user` object.
              const remoteVideoTrack = user.videoTrack;

                // Dynamically create a container in the form of a DIV element for playing the remote video track.
                const playerContainer = document.createElement("div");
                // Specify the ID of the DIV container. You can use the `uid` of the remote user.
                playerContainer.id = user.uid.toString();
                playerContainer.style.width = "240px";
                playerContainer.style.height = "320px";
                playerContainerWrapper.append(playerContainer);
          
                // Play the remote video track.
                // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
                
                //remoteVideoTrack.play(playerContainer);
          
                // Or just pass the ID of the DIV container.

                remoteVideoTrack.play('im-player-container-remote');

                // if(callParticipants.length>1){
                //     remoteVideoTrack.play('im-player-container-remote');
                // }else{
                //     remoteVideoTrack.play('im-player-container-local');
                // }

                

            }
          
            // If the subscribed track is audio.
            if (mediaType === "audio") {
              // Get `RemoteAudioTrack` in the `user` object.
              const remoteAudioTrack = user.audioTrack;
              // Play the audio track. No need to pass any DOM element.
              remoteAudioTrack.play();
            }

            const newParticipants = [ ...callParticipants, {participantData: user} ];

            setCallParticipants(newParticipants);

          });

        }).catch((agoraError)=>{

            console.warn("::::: AGORA ERROR :::::", agoraError, options, import.meta.env);

        });

        rtc.client.on("user-unpublished", user => {
            // Get the dynamically created DIV container.
            const playerContainer = document.getElementById(user.uid.toString());
            // Destroy the container.
            playerContainer.remove();

        });

    }

    async function leaveCall() {
        // Destroy the local audio and video tracks.
        rtc.localAudioTrack.close();
        rtc.localVideoTrack.close();
      
        // Traverse all remote users.
        rtc.client.remoteUsers.forEach(user => {
          // Destroy the dynamically created DIV container.
          const playerContainer = document.getElementById(user.uid);
          playerContainer && playerContainer.remove();
        });
      
        // Leave the channel.
        await rtc.client.leave();
    }

    {/*


    "DISCONNECTED": Disconnected. In this state, the SDK does not automatically reconnect. This state indicates that the user is in any of the following stages:
The user has not joined the channel by calling join.
The user has left the channel by calling leave.
The user has been kicked out of the channel by the Agora server or the connection has failed.
"CONNECTING": Connecting. This state indicates that the user is calling join.
"CONNECTED": Connected. This state indicates that the user has joined the channel and can publish or subscribe to media tracks in the channel.
"RECONNECTING": Disconnected and reconnecting. If the connection between the SDK and the server is interrupted due to network disconnection or switching, the SDK automatically reconnects and enters this state.
"DISCONNECTING": Disconnecting. This state indicates that the user is calling leave.

    When joining a channel, the SDK may throw the following errors due to improper use of the SDK or network abnormalities:

    INVALID_PARAMS: The parameters are incorrect, for example, an invalid token is provided.
    INVALID_OPERATION: An incorrect operation. This error is usually caused by joining a channel repeatedly. Ensure that you call leave before joining a channel again.
    OPERATION_ABORTED: The joining is aborted, which means that leave is called before the method call of join succeeds.
    UNEXPECTED_RESPONSE: The Agora server returns an unexpected response, usually because the App ID or token authentication fails. For example, you have enabled the App Certificate but do not pass a token in join.
    UID_CONFLICT: Multiple AgoraRTCClient objects use the same user ID.

    */}

    useEffect(() => {

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
        
        startBasicCall();

        console.log(":::::::::: CALL DATA :::::::::::", getCallData());
        
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

                    <div id="im-player-container-remote" className="remote connected" />

                    <div id="im-player-container-local" className="local connected" />

                </div>

                )}

                {/* 
                
                <DragMove onDragMove={handleDragMove}>
                    <div
                        style={{
                        transform: `translateX(${translate.x}px) translateY(${translate.y}px)`
                        }}
                    >
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                </DragMove>
                
                */}
                

                <PageContent>
                   
                    <div className="call-remote-user" style={{visibility: isCameraOn?'hidden':'visible'}}>
                        <img src={currentUserData.displayPhoto} />
                        <BlockTitle large>{currentUserData.displayName}</BlockTitle>
                        <BlockTitle>{currentUserData.phoneNumber}</BlockTitle>
                        <BlockTitle medium >
                            {currentViewState}
                        </BlockTitle>
                        <BlockTitle medium className="im-call-timer" style={{textAlign: 'center'}}>
                            <CallTimer visible={
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
                            K.ModuleComponentsLibs.im.callScreen.INCOMING,
                            K.ModuleComponentsLibs.im.callScreen.OUTGOING,
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
                            iconIos={`f7:${isLoudSpeakerOn?'speaker_2_fill':'speaker_slash_fill'}`}
                            iconMd={`material:${isLoudSpeakerOn?'volume_up':'volume_off'}`}
                            iconAurora={`f7:${isLoudSpeakerOn?'speaker_2_fill':'speaker_slash_fill'}`}
                            iconSize={24} 
                        />

                        {isCameraOn ? (

                        <Button outline large
                            id="im-solid-rounded-loudspeaker"
                            key="im-solid-rounded-loudspeaker"
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
                            iconIos={`f7:${isCameraOn?'videocam_fill':'videocam'}`}
                            iconMd={`material:${isCameraOn?'videocam':'videocam_off'}`}
                            iconAurora={`f7:${isCameraOn?'videocam_fill':'videocam'}`}
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

                        <span>Call</span>

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

                <Row className={`im-call-status-overlay ${isOnHold ? 'red':'green'}`}>
                    <Col width={90} className="info">
                        <span className="display-name">{currentUserData.displayName}</span>
                        <br/>
                        <CallTimer className="display-timer" visible={
                                    includedInViewState(
                                    [
                                        K.ModuleComponentsLibs.im.callScreen.OUTGOING,
                                        K.ModuleComponentsLibs.im.callScreen.INCOMING,
                                        K.ModuleComponentsLibs.im.callScreen.CONNECTED,
                                        K.ModuleComponentsLibs.im.callScreen.ENDED,
                                    ]
                                )} 
                        />
                    </Col>
                    <Col width={10}>
                        {isCameraOn ? (
                            isOnHold ? (
                                <Icon size={24} 
                                    ios={`f7:${isIncomingCall?'videocam':'videocam'}`} 
                                    aurora={`f7:${isIncomingCall?'videocam':'videocam'}`} 
                                    md={`material:${isIncomingCall?'pause_circle_outline':'pause_circle_outline'}`} 
                                />
                            ):(
                                <Icon size={24} 
                                    ios={`f7:${isIncomingCall?'videocam_fill':'videocam_fill'}`} 
                                    aurora={`f7:${isIncomingCall?'videocam_fill':'videocam_fill'}`} 
                                    md={`material:${isIncomingCall?'videocam':'videocam'}`} 
                                />
                            )
                        ):(
                            isOnHold ? (
                                <Icon size={24} 
                                    ios={`f7:${isIncomingCall?'phone_arrow_down_left':'phone_arrow_up_right'}`} 
                                    aurora={`f7:${isIncomingCall?'phone_arrow_down_left':'phone_arrow_up_right'}`} 
                                    md={`material:${isIncomingCall?'phone_paused':'phone_paused'}`} 
                                />
                            ):(
                                <Icon size={24} 
                                    ios={`f7:${isIncomingCall?'phone_fill_arrow_down_left':'phone_fill_arrow_up_right'}`} 
                                    aurora={`f7:${isIncomingCall?'phone_fill_arrow_down_left':'phone_fill_arrow_up_right'}`} 
                                    md={`material:${isIncomingCall?'phone':'phone'}`} 
                                />
                            )
                        )}
                    </Col>
                </Row>
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

