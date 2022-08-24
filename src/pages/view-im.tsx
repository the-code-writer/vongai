import React, { useCallback, useMemo, useEffect, useRef, useState } from 'react';

import { f7, f7ready } from 'framework7-react';

import IMHomeScreen from '../dovellous/src/modules/im/views/im-home-screen';

import IMPopupContactsList from "../dovellous/src/modules/im/popups/im-popup-contacts-list";

import IMPanelLeft from "../dovellous/src/modules/im/panels/im-panel-left";

import IMUserProfileSummary from '../dovellous/src/modules/im/sheets/im-user-profile-summary';

import IMModalsWrapper from '../dovellous/src/modules/im/modals/im-modals-wrapper';

import { StorageIM, useStorageIM } from "../dovellous/src/modules/im/store/im-store";

export default () => {

  const imHomeScreenRef = useRef(null);

  const [currentIMTab, setCurrentIMTab] = useState(1);

  const tabIndexChangedHandler = (tabIndex: number) => {
    
    console.log("::: tabIndexChangedHandler :::", tabIndex);

    setCurrentIMTab(tabIndex);

    setTimeout(()=>{
      console.warn("::: tabIndexChangedHandler :::", tabIndex);
    },3000);

  }

  const [imUserData, setIMUserData] = useState({});

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
  
  const onVoiceCallHandler = (userData: any) => {

    console.log(":::ON VOICE CALL HANDLER:::", userData); 

  };
  
  const onVideoCallHandler = (userData: any) => {

    console.log(":::ON VIDEO CALL HANDLER:::", userData);
    
  };
  
  const onContactInfoHandler = (userData: any) => {

    console.log(":::ON CONTACT INFO HANDLER:::", userData);

  };

  useEffect(()=>{

    console.log("::: VIEW IM :::", currentIMTab);

  },[]);
 
  useEffect(() => {

    f7ready((framework7IO) => {

      StorageIM.dispatch('insertFakeMessages', null);

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
        onVoiceCall={onVoiceCallHandler}
        onVideoCall={onVideoCallHandler}
        onContactInfo={onContactInfoHandler}
        /> 

        <IMModalsWrapper />        

    </React.Fragment>

  )

};