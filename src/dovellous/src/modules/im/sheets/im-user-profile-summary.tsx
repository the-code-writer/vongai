import { Block, Button, Link, Navbar, NavRight, NavTitle, PageContent, Segmented, Sheet } from "framework7-react";
import React from "react";

export default ({ id, userData, onChat, onIMCall, onVideoCall, onContactInfo }) => {

    return (
        <Sheet
            id={id}
            key={id}
            className={`im-sheet-modal im-contact-info-sheet-modal ${id}`}
            style={{backgroundImage: `url(${userData.avatar})`}}  
            backdrop={true} 
            bottom={true} 
            push={true}
            swipeToStep={true}
            swipeToClose={true} 
            closeByBackdropClick={true}
            closeByOutsideClick={true}
            closeOnEscape={true}
        >
            <Navbar sliding={true}>
                <NavTitle sliding title={`${userData.displayName}`} subtitle={userData.senderNumber} />
                <NavRight>
                    <Link iconIos="f7:ellipsis_vertical" iconAurora="f7:ellipsis_vertical" iconMd="material:close"  sheetClose />
                </NavRight>
            </Navbar>
            <PageContent>
                <img src={userData.avatar} style={{ width: '100%' }} />
                <Block inset>
                <Segmented raised tag="p" className="im-contact-info">
                    <Button sheetClose text="Chat" onClick={()=>onChat(userData)} iconIos="f7:text_bubble_fill" iconMd="material:chat" iconAurora="f7:text_bubble_fill" iconSize={32} />
                    <Button sheetClose text="Voice" onClick={()=>onIMCall(userData, false)} iconIos="f7:phone_fill" iconMd="material:call" iconAurora="f7:phone_fill" iconSize={32} />
                    <Button sheetClose text="Video" onClick={()=>onIMCall(userData, true)} iconIos="f7:videocam_fill" iconMd="material:videocam" iconAurora="f7:videocam_fill" iconSize={32} />
                    <Button sheetClose text="Info" onClick={()=>onContactInfo(userData)} iconIos="f7:person_crop_rectangle_fill" iconMd="material:perm_contact_calendar" iconAurora="f7:person_crop_rectangle_fill" iconSize={32} />
                </Segmented>
                </Block>
            </PageContent>
        </Sheet>
    );

};
