import React, { useCallback, useMemo, useEffect, useRef, useState } from 'react';

import IMHomeScreen from '../dovellous/src/modules/im/views/im-home-screen';

import IMPopupContactsList from "../dovellous/src/modules/im/popups/im-popup-contacts-list";

import IMPanelLeft from "../dovellous/src/modules/im/panels/im-panel-left";

import { StorageIM, useStorageIM } from "../dovellous/src/modules/im/store/im-store";
import { f7ready } from 'framework7-react';

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

  const [popupIMContactsListOpened, setPopupIMContactsListOpened] = useState(false);

  const openIMPopupContactsListHandler = () => {

    console.log("::: VIEW IM ::: openIMPopupContactsListHandler :::", currentIMTab, !popupIMContactsListOpened);

    setPopupIMContactsListOpened(!popupIMContactsListOpened);

  }

  const onContactSelectedHandler = (contact, action) => {

    console.log("::: onContactSelected :::", contact, action, currentIMTab);

  }

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
        />

      <IMPopupContactsList
          currentTabIndex={currentIMTab}
          popupOpened={popupIMContactsListOpened}
          onPopupClosed={openIMPopupContactsListHandler}
          onContactSelected={onContactSelectedHandler}
          itemsPerPage={16}
        />

      <IMPanelLeft />      

    </React.Fragment>

  )

};