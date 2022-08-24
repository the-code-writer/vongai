import React, { useEffect, useState } from "react";

import IMVoiceCall from "../sheets/im-voice-call";

export default ({userData}) => {

    const [userDefinedData, setUserDefinedData] = useState(userData);

    const generateCallID = () => {

    };

    // Begin Voice Call Actions

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

    const onAnswerCallHandler = (userData)=>{
        console.log("::: VOICE CALL ACTION - ", userData);

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
      
        setUserDefinedData(userData);
    
    }, [userData])
    
   
    // End Voice Call Actions

    return (

        <React.Fragment>

            <IMVoiceCall 
                id={`im-voice-call-sheet-modal`} 
                key={`im-voice-call-sheet-modal`} 
                className={`im-voice-call-sheet-modal`}
                userData={userDefinedData}
                onMute={onMuteHandler}
                onUnMute={onUnMuteHandler}
                onCameraOn={onCameraOnHandler}
                onCameraOff={onCameraOffHandler}
                onLoudSpekerOn={onLoudSpekerOnHandler}
                onLoudSpeakerOff={onLoudSpeakerOffHandler}
                onEndCall={onEndCallHandler}
                onHoldCall={onHoldCallHandler}
                onAnswerCall={onAnswerCallHandler}
                onDeclineCall={onDeclineCallHandler}
                onAddParticipant={onAddParticipantHandler}
                
            />

        </React.Fragment>

    )

}