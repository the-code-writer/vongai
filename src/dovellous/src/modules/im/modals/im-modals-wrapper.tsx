import React, { useEffect, useState } from "react";

import IMCall from "../sheets/im-call-screen-sheet-modal";

export default ({callDataObject}) => {

    const [callData, setCallData] = useState(callDataObject);

    const generateCallID = () => {

    };

    // Begin IM Call Actions

    const onMuteHandler = (userData)=>{

        console.log("::: VOICE CALL ACTION - onMuteHandler", userData);

    };

    const onUnMuteHandler = (userData)=>{

        console.log("::: VOICE CALL ACTION - onUnMuteHandler", userData);

    };

    const onCameraOnHandler = (userData)=>{

        console.log("::: VOICE CALL ACTION - onCameraOnHandler", userData);

    };

    const onCameraOffHandler = (userData)=>{

        console.log("::: VOICE CALL ACTION - onCameraOffHandler", userData);

    };

    const onLoudSpekerOnHandler = (userData)=>{

        console.log("::: VOICE CALL ACTION - onLoudSpekerOnHandler", userData);

    };

    const onLoudSpeakerOffHandler = (userData)=>{

        console.log("::: VOICE CALL ACTION - onLoudSpeakerOffHandler", userData);

    };

    const onEndCallHandler = (userData)=>{

        console.log("::: VOICE CALL ACTION - onEndCallHandler", userData);

    };

    const onEndedCallHandler = (userData)=>{

        console.log("::: VOICE CALL ACTION - onEndedCallHandler", userData);

    };

    const onHoldCallHandler = (userData)=>{

        console.log("::: VOICE CALL ACTION - onHoldCallHandler", userData);

    };

    const onOutgoingCallHandler = (userData)=>{
        console.log("::: VOICE CALL ACTION - onOutgoingCallHandler", userData);

    };

    const onIncomingCallHandler = (userData)=>{
        console.log("::: VOICE CALL ACTION - onIncomingCallHandler", userData);

    };

    const onAnswerCallHandler = (userData)=>{
        console.log("::: VOICE CALL ACTION - onAnswerCallHandler", userData);

    };

    const onDeclineCallHandler = (userData)=>{

        console.log("::: VOICE CALL ACTION - onDeclineCallHandler", userData);

    };

    const onAddParticipantHandler = (userData)=>{

        console.log("::: VOICE CALL ACTION - onAddParticipantHandler", userData);

    };
   
    const onParticipantJoinedHandler = (userData)=>{

        console.log("::: VOICE CALL ACTION - onParticipantJoinedHandler", userData);

    };
   
    const onParticipantLeftHandler = (userData)=>{

        console.log("::: VOICE CALL ACTION - onParticipantLeftHandler", userData);

    };

    useEffect(() => {
      
        setCallData(callDataObject);
    
    }, [callDataObject])
    
   
    // End IM Call Actions

    return (

        <React.Fragment>

            <IMCall 
                id={`im-im-call-sheet-modal`} 
                key={`im-im-call-sheet-modal`} 
                className={`im-im-call-sheet-modal`}
                isVideoCall={callData.isVideoCall} 
                isIncoming={callData.isIncomingCall}
                userDefinedData={callData.userData}
                onMute={onMuteHandler}
                onUnMute={onUnMuteHandler}
                onCameraOn={onCameraOnHandler}
                onCameraOff={onCameraOffHandler}
                onLoudSpeakerOn={onLoudSpekerOnHandler}
                onLoudSpeakerOff={onLoudSpeakerOffHandler}
                onEndCall={onEndCallHandler}
                onIncomingCall={onIncomingCallHandler}
                onOutgoingCall={onOutgoingCallHandler}
                onHoldCall={onHoldCallHandler}
                onAnswerCall={onAnswerCallHandler}
                onDeclineCall={onDeclineCallHandler}
                onAddParticipant={onAddParticipantHandler}
                
            />

        </React.Fragment>

    )

}