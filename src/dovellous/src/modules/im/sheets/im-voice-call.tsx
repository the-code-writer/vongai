import { Block, BlockTitle, Button, Col, Fab, FabButton, FabButtons, Icon, Link, Navbar, NavRight, NavTitle, PageContent, Row, Segmented, Sheet } from "framework7-react";
import React, { useEffect, useState } from "react";

import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng"

export default ({ id, className, userData, isVideoCall, 
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
    onAnswerCall, 
    onDeclineCall, 
    onAddParticipant 
}) => {

    const userObject = {
        avatar: ''
    }

    const callObject = {
        avatar: ''
    }

    const [currentViewState, setCurrentViewState] = useState('DEFAULT');
    const [isMuteOn, setisMuteOn] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(isVideoCall);
    const [isLoudSpeakerOn, setIsLoudSpeakerOn] = useState(false);
    const [isOnHold, setIsOnHold] = useState(false);
    const [isCallEnded, setIsCallEnded] = useState(false);
    const [isCallAnswered, setIsCallAnswered] = useState(false);
    const [isCallDeclined, setIsCallDeclined] = useState(false);
    const [callHasParticipants, setCallHasParticipants] = useState(false);
    const [callParticipants, setCallParticipants] = useState([]);
    const [isCallInProgress, setIsCallInProgress] = useState(false);

    const getCallData = () => {

        return {
            userObject: userObject,
            callObject: callObject,
        }

    };

    const onMuteToggle = () => {

        isMuteOn ? onUnMuteHandler():onMuteHandler();

    };

    const onMuteHandler = ()=>{

        setisMuteOn(true);

        onMute(getCallData());

    };

    const onUnMuteHandler = ()=>{

        setisMuteOn(false);

        onUnMute(getCallData());

    };

    const onCameraToggle = () => {

        isCameraOn ? onCameraOffHandler():onCameraOnHandler();

    };

    const onCameraOnHandler = ()=>{

        setIsCameraOn(true);

        onCameraOn(getCallData());

    };

    const onCameraOffHandler = ()=>{

        setIsCameraOn(false);

        onCameraOff(getCallData());

    };

    const onLoudSpeakerToggle = () => {

        isLoudSpeakerOn ? onLoudSpeakerOffHandler():onLoudSpeakerOnHandler();

    };

    const onLoudSpeakerOnHandler = ()=>{

        setIsLoudSpeakerOn(true);

        onLoudSpeakerOn(getCallData());

    };

    const onLoudSpeakerOffHandler = ()=>{

        setIsLoudSpeakerOn(false);

        onLoudSpeakerOff(getCallData());

    };

    const onHangUpToggle = () => {

        //

    };

    const onEndCallHandler = ()=>{

        setIsCallEnded(true);

        onEndCall(getCallData());

    };

    const onEndedCallHandler = ()=>{

        setIsCallEnded(true);

        onEndedCall(getCallData());

    };

    const onHoldCallHandler = ()=>{

        setIsOnHold(true);

        onHoldCall(getCallData());

    };

    const onUnHoldCallHandler = ()=>{

        setIsOnHold(false);

        onUnHoldCall(getCallData());

    };

    const onAnswerCallHandler = ()=>{

        setIsCallDeclined(true);

        onAnswerCall(getCallData());

    };

    const onDeclineCallHandler = ()=>{

        setIsCallAnswered(true);

        onDeclineCall(getCallData());

    };

    const onAddParticipantHandler = ()=>{

        setCallHasParticipants(true);

        //callParticipants

        onAddParticipant(getCallData());

    };

    const onParticipantJoinedHandler  = ()=>{

        //

    };

    const onParticipantLeftHandler = ()=>{

        //

    };

    const onActionsAddParticipantHandler = () => {
        
    }

    const onActionsChatHandler = () => {
        
    }

    const onActionsHoldHandler = () => {
        
    }

    const onActionsKeypadHandler = () => {
        
    }

    const client: IAgoraRTCClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    const rtc = {
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
        /**
         * Put the following code snippets here.
         */
    }

    useEffect(()=>{

        startBasicCall();

    },[])

    return (
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
        >

            <div className="videos">

            <div className="remote connected"/>

            <div className="local connected"/>

            </div>
            
            <PageContent>
                    <div className="call-remote-user">
                        <img src="https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png" />
                        <BlockTitle large>Stephen L. Gains</BlockTitle>
                        <BlockTitle>+263 (563) 628 9828</BlockTitle>
                    </div>
                    <div className="call-actions">
                        <Fab position="center-center"  >
                            <Icon ios="f7:plus" aurora="f7:plus" md="material:add"></Icon>
                            <Icon ios="f7:xmark" aurora="f7:xmark" md="material:close"></Icon>
                            <FabButtons  position="center" color="black">
                                <FabButton onClick={onActionsKeypadHandler}>
                                    <Icon ios="f7:circle_grid_3x3_fill" aurora="f7:circle_grid_3x3_fill" md="material:dialpad"/>
                                </FabButton>
                                <FabButton onClick={onActionsAddParticipantHandler}>
                                    <Icon ios="f7:person_badge_plus_fill" aurora="f7:person_badge_plus_fill" md="material:person_add_alt_1"/>
                                </FabButton>
                                <FabButton onClick={onActionsHoldHandler}>
                                    <Icon ios="f7:pause_circle" aurora="f7:pause_circle" md="material:pause_circle_outline"/>
                                </FabButton>
                                <FabButton onClick={onActionsChatHandler}>
                                    <Icon ios="f7:text_bubble_fill" aurora="f7:text_bubble_fill" md="material:chat"/>
                                </FabButton>
                            </FabButtons>
                        </Fab>
                    </div>
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
                        <Button outline large
                            id="im-solid-rounded-hangup"
                            key="im-solid-rounded-hangup"
                            className="im-solid-rounded color-red"
                            onClick={onHangUpToggle} 
                            iconIos={`f7:${isLoudSpeakerOn?'phone_down_fill':'phone_down'}`}
                            iconMd={`material:${isLoudSpeakerOn?'phone_enabled':'phone_enabled'}`}
                            iconAurora={`f7:${isLoudSpeakerOn?'phone_down_fill':'phone_down'}`}
                            iconSize={24} 
                        />
                    </Block>
            </PageContent>

        </Sheet>

    );

};
