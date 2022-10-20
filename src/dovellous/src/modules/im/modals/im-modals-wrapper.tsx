import React, { useEffect, useState } from "react";
import K from "../../../libraries/app/konstants";

import IMCall from "../sheets/im-call-screen-sheet-modal";

export default ({callDataObject}) => {
 
    const [callData, setCallData] = useState(callDataObject);

    const onMuteHandler = (userData: any)=>{

        console.log("::: VOICE CALL ACTION - onMuteHandler", userData);

    };

    const onUnMuteHandler = (userData: any)=>{

        console.log("::: VOICE CALL ACTION - onUnMuteHandler", userData);

    };

    const onCameraOnHandler = (userData: any)=>{

        console.log("::: VOICE CALL ACTION - onCameraOnHandler", userData);

    };

    const onCameraOffHandler = (userData: any)=>{

        console.log("::: VOICE CALL ACTION - onCameraOffHandler", userData);

    };

    const onLoudSpekerOnHandler = (userData: any)=>{

        console.log("::: VOICE CALL ACTION - onLoudSpekerOnHandler", userData);

    };

    const onLoudSpeakerOffHandler = (userData: any)=>{

        console.log("::: VOICE CALL ACTION - onLoudSpeakerOffHandler", userData);

    };

    const onEndCallHandler = (userData: any)=>{

        console.log("::: VOICE CALL ACTION - onEndCallHandler", userData);

    };

    const onEndedCallHandler = (userData: any)=>{

        console.log("::: VOICE CALL ACTION - onEndedCallHandler", userData);

    };

    const onHoldCallHandler = (userData: any)=>{

        console.log("::: VOICE CALL ACTION - onHoldCallHandler", userData);

    };

    const onOutgoingCallHandler = (userData: any)=>{
        console.log("::: VOICE CALL ACTION - onOutgoingCallHandler", userData);

    };

    const onIncomingCallHandler = (userData: any)=>{
        console.log("::: VOICE CALL ACTION - onIncomingCallHandler", userData);

    };

    const onAnswerCallHandler = (userData: any)=>{
        console.log("::: VOICE CALL ACTION - onAnswerCallHandler", userData);

    };

    const onDeclineCallHandler = (userData: any)=>{

        console.log("::: VOICE CALL ACTION - onDeclineCallHandler", userData);

    };

    const onUserPublishedHandler = (userData: any, mediaType: any)=>{

        console.log("::: VOICE CALL ACTION - onAddParticipantHandler", userData, mediaType);

    };
   
    const onUserUnpublishedHandler = (userData: any)=>{

        console.log("::: VOICE CALL ACTION - onAddParticipantHandler", userData);

    };
   
    const onUserJoinedHandler = (userData: any)=>{

        console.log("::: VOICE CALL ACTION - onUserJoinedHandler", userData);

    };
   
    const onUserLeftHandler = (userData: any)=>{

        console.log("::: VOICE CALL ACTION - onUserLeftHandler", userData);

    };

    useEffect(() => {
      
        setCallData(callDataObject);

        return () => {
            setCallData({});
        }
    
    }, [callDataObject])
    
    // End IM Call Actions

    return (

        <React.Fragment>

            <IMCall 
                id={`im-im-call-sheet-modal`} 
                className={`im-im-call-sheet-modal`}
                isVideoCall={callData.isVideoCall} 
                isIncoming={callData.isIncomingCall}
                userDefinedData={callData.userData}
                userProfileData={userProfileData}
                onMute={onMuteHandler}
                onUnMute={onUnMuteHandler}
                onCameraOn={onCameraOnHandler}
                onCameraOff={onCameraOffHandler}
                onLoudSpeakerOn={onLoudSpekerOnHandler}
                onLoudSpeakerOff={onLoudSpeakerOffHandler}
                onEndCall={onEndCallHandler}
                onEndedCall={onEndedCallHandler}
                onIncomingCall={onIncomingCallHandler}
                onOutgoingCall={onOutgoingCallHandler}
                onHoldCall={onHoldCallHandler}
                onAnswerCall={onAnswerCallHandler}
                onDeclineCall={onDeclineCallHandler}
                onUserPublished={onUserPublishedHandler}
                onUserUnpublished={onUserUnpublishedHandler}
                onUserJoined={onUserJoinedHandler}
                onUserLeft={onUserLeftHandler}
                
            />

        </React.Fragment>

    )

}