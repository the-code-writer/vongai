import { Block, BlockTitle, Button, Col, f7, Fab, FabButton, FabButtons, Icon, Link, List, ListItem, Navbar, NavRight, NavTitle, PageContent, Row, Segmented, Sheet } from "framework7-react";
import React, { useEffect, useState } from "react";

import AgoraRTC, { IAgoraRTCClient } from "agora-rtc-sdk-ng"
import K from "../../../libraries/app/konstants";

export default ({ id, className, userData, isVideoCall, isIncoming,
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

    const [currentCallUID, setCurrentCallUID] = useState('');

    const [currentViewState, setCurrentViewState] = useState(K.ModuleComponentsLibs.im.callScreen.BUSY);
    
    const [currentCallDuration, setCurrentCallDuration] = useState("00:00");

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

        //

    };

    const onEndCallHandler = () => {

        setIsCallEnded(true);

        setCurrentViewState(
            K.ModuleComponentsLibs.im.callScreen.ENDED
        );

        onEndCall(getCallData());

    };

    const onEndedCallHandler = () => {

        setIsCallEnded(true);

        setCurrentViewState(
            K.ModuleComponentsLibs.im.callScreen.ENDED
        );

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

    const onAnswerCallHandler = () => {

        setIsCallAnswered(true);
        setIsCallDeclined(false);

        setCurrentViewState(
            K.ModuleComponentsLibs.im.callScreen.CONNECTED
        );

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

        f7.sheet.close(`.${id}`);

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
        /**
         * Put the following code snippets here.
         */

        rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });

        const uid = await rtc.client.join(options.appId, options.channel, options.token, null);

        setCurrentCallUID(uid);

        callObject.uid = uid;

    }

    useEffect(() => {

        startBasicCall();
        
        setCurrentViewState(
            isIncoming ? 
            K.ModuleComponentsLibs.im.callScreen.INCOMING : 
            K.ModuleComponentsLibs.im.callScreen.OUTGOING
        );

    }, []);

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
            >

                <div className="videos">

                    <div className="remote connected" />

                    <div className="local connected" />

                </div>

                <PageContent>
                    <div className="call-remote-user">
                        <img src="https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png" />
                        <BlockTitle large>Stephen L. Gains</BlockTitle>
                        <BlockTitle>+263 (563) 628 9828</BlockTitle>
                        <BlockTitle medium className="im-call-status">
                            { currentViewState === K.ModuleComponentsLibs.im.callScreen.CONNECTED ? (
                                currentCallDuration==="00:00" ? (
                                    currentViewState
                                ):(
                                    currentCallDuration
                                )
                            ):(
                                currentViewState
                            )}
                        </BlockTitle>
                    </div>
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
                                    <Icon ios="f7:pause_circle" aurora="f7:pause_circle" md="material:pause_circle_outline" />
                                </FabButton>
                                <FabButton onClick={onActionsChatHandler}>
                                    <Icon ios="f7:text_bubble_fill" aurora="f7:text_bubble_fill" md="material:chat" />
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
                    
                </PageContent>

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

        </React.Fragment>

    );

};
