import { Block, Button, Link, Navbar, NavRight, NavTitle, PageContent, Segmented, Sheet } from "framework7-react";
import React from "react";

export default ({ id, className, userData, onMute, onUnMute, onCameraOn, onCameraOff, onLoudSpekerOn, onLoudSpeakerOff, onEndCall, onHoldCall, onAnswerCall, onDeclineCall, onAddParticipant }) => {

    const userObject = {
        avatar: ''
    }

    return (
        <Sheet
            id={id}
            key={id}
            className={`im-sheet-modal ${className}`}
            backdrop={false} 
            bottom={true} 
            push={false}
            swipeToStep={false}
            swipeToClose={false} 
            closeByBackdropClick={false}
            closeByOutsideClick={false}
            closeOnEscape={false}
        >
            
            <PageContent>
                <img src={userObject.avatar} style={{ width: '100%' }} />
                <Block inset>
                </Block>
            </PageContent>
        </Sheet>
    );

};
