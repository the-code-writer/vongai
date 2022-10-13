import React, { useCallback, useMemo, useEffect, useRef, useState } from 'react';

import { f7, f7ready } from 'framework7-react';

import IMHomeScreen from '../dovellous/src/modules/im/views/im-home-screen';

import IMPopupContactsList from "../dovellous/src/modules/im/popups/im-popup-contacts-list";

import IMPanelLeft from "../dovellous/src/modules/im/panels/im-panel-left";

import IMUserProfileSummary from '../dovellous/src/modules/im/sheets/im-user-profile-summary';

import IMModalsWrapper from '../dovellous/src/modules/im/modals/im-modals-wrapper';

import { StorageIM, useStorageIM } from "../dovellous/src/modules/im/store/im-store";
import K from '../dovellous/src/libraries/app/konstants';

export default () => {

  const imHomeScreenRef = useRef(null);

  const [currentIMTab, setCurrentIMTab] = useState(1);

  const [callDataObject, setCallDataObject] = useState({isVideoCall: false, isIncomingCall: false, userData: {}});

  const [userDataObject, setUserDataObject] = useState({});

  const [imUserData, setIMUserData] = useState({});

  const tabIndexChangedHandler = (tabIndex: number) => {
    
    console.log("::: tabIndexChangedHandler :::", tabIndex);

    setCurrentIMTab(tabIndex);

    setTimeout(()=>{
      console.warn("::: tabIndexChangedHandler :::", tabIndex);
    },3000);

  }

  const [popupIMContactsListOpened, setPopupIMContactsListOpened] = useState(false);

  const openIMPopupContactsListHandler = () => {

    console.log("::: VIEW IM ::: openIMPopupContactsListHandler :::", currentIMTab, !popupIMContactsListOpened);

    setPopupIMContactsListOpened(!popupIMContactsListOpened);

  }

  const onContactSelectedHandler = (contact, action) => {

    console.log("::: onContactSelected :::", contact, action, currentIMTab);

  }

  const onOpenMessageHandler = (chat) => {

    console.log(":::OPEN MESSAGE:::", chat);

    f7.views.main.router.navigate(`/im/conversation/0/${chat.uuid}/`);

  }

  const imGetConversationProps = (chat: any) => {

    return chat;

  }

  const onOpenProfileHandler = (userData: any) => {

    console.log(":::OPEN PROFILE WITH USER DATA:::", userData);

    setIMUserData(userData);

    f7.sheet.open(`.im-user-profile-summary`);

  }
  const onChatHandler = (userData: any) => {

    console.log(":::ON CHAT HANDLER:::", userData); 

  };
  
  const onIMCallHandler = (userData: any, isVideoCall: boolean) => {

    console.log(":::ON CALL HANDLER:::", userData); 

    const callDataObject = {
      isVideoCall: isVideoCall,
      isIncomingCall: false,
      userData: 
      {
        username: userData.senderName,
        phoneNumber: userData.senderNumber,
        displayName: userData.displayName,
        displayStatus: userData.text,
        displayPhoto: userData.avatar,
        emailAddress: userData.emailAddress ?? '',
      }
    };

    onIncomingIMCallHandler(callDataObject);

  };
  
  const onIncomingIMCallHandler = (callDataObject: any) => {

    console.log(":::ON INCOMING VOICE CALL HANDLER !!! :::", callDataObject); 

    setCallDataObject(callDataObject);

    f7.sheet.open('.im-im-call-sheet-modal');

  };
  
  const onVideoCallHandler = (userData: any) => {

    console.log(":::ON VIDEO CALL HANDLER:::", userData);
    
  };
  
  const onContactInfoHandler = (userData: any) => {

    console.log(":::ON CONTACT INFO HANDLER:::", userData);

  };

  useEffect(() => {

    f7ready((Framework7App) => {
      
      console.log("::: VIEW IM :::", currentIMTab);

      Framework7App.on(
        K.ModuleComponentsLibs.im.callScreen.states.INCOMING,
        (callDataObject: any)=>{
          onIncomingIMCallHandler(callDataObject);
        }
      );

      Framework7App.dovellous.instance.initAgora(null);

      StorageIM.dispatch('insertFakeMessages', null);
      StorageIM.dispatch('insertFakeStories', null);

    });

  }, []);

  return(

    <React.Fragment>

      <IMHomeScreen
          onOpenIMPopupContactsList={openIMPopupContactsListHandler}
          onTabIndexChanged={tabIndexChangedHandler}
          onOpenMessage={onOpenMessageHandler}
          onOpenProfile={onOpenProfileHandler}
        />

      <IMPopupContactsList
          currentTabIndex={currentIMTab}
          popupOpened={popupIMContactsListOpened}
          onPopupClosed={openIMPopupContactsListHandler}
          onContactSelected={onContactSelectedHandler}
          itemsPerPage={16}
        />

      <IMPanelLeft />     

      <IMUserProfileSummary 
        key={`im-user-profile-summary`} 
        id={`im-user-profile-summary`}
        userData={imUserData}
        onChat={onChatHandler}
        onIMCall={onIMCallHandler}
        onVideoCall={onVideoCallHandler}
        onContactInfo={onContactInfoHandler}
        /> 

        <IMModalsWrapper callDataObject={callDataObject} />        

    </React.Fragment>

  )

};