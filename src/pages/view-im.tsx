import React, { useCallback, useMemo, useEffect, useRef, useState } from 'react';

import IMHomeScreen from '../dovellous/src/modules/im/views/im-home-screen';

import IMPopupContactsList from "../dovellous/src/modules/im/popups/im-popup-contacts-list";

import IMPanelLeft from "../dovellous/src/modules/im/panels/im-panel-left";

import { StorageIM, useStorageIM } from "../dovellous/src/modules/im/store/im-store";
import { f7, f7ready } from 'framework7-react';

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

  const onOpenMessageHandler = (chat) => {

    console.log(":::OPEN MESSAGE:::", chat);

    interface RouteOptions {
      /** whether the page should be animated or not (overwrites default router settings) */
      animate?: boolean;
      /** whether the page should be saved in router history */
      history?: boolean;
      /** whether the page should be saved in browser state. In case you are using browserHistory, then you can pass here false to prevent route getting in browser history */
      browserHistory?: boolean;
      /** replace the current page with the new one from route */
      reloadCurrent?: boolean;
      /** replace the previous page in history with the new one from route */
      reloadPrevious?: boolean;
      /** load new page and remove all previous pages from history and DOM */
      reloadAll?: boolean;
      /** previous pages history will be cleared after reloading/navigate to the specified route */
      clearPreviousHistory?: boolean;
      /** If set to `true` then it will ignore if such URL in cache and reload it using XHR again */
      ignoreCache?: boolean;
      /** if set to `true` then it will ignore previous page in history and load specified one */
      force?: boolean;
      /** pass React/Vue component props */
      props?: object;
      /** custom page transition name */
      transition?: string;
      /** Allows open page route as modal or panel */
      openIn?: 'popup' | 'loginScreen' | 'sheet' | 'popover' | 'panel';
    }

    const conversationViewOptions: RouteOptions = {
      animate: true
    }

    f7.views.main.router.navigate('/about', conversationViewOptions);

  }

  const onOpenProfileHandler = (chat) => {

    console.log(":::OPEN PROFILE:::", chat);

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

    </React.Fragment>

  )

};