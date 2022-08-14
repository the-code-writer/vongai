import React, { useState } from 'react';

import IMHomeScreen from '../dovellous/src/modules/im/views/im-home-screen';

import IMPopupContactsList from "../dovellous/src/modules/im/popups/im-popup-contacts-list";

export default () => {

  const [currentIMTab, setCurrentIMTab] = useState(1);

  const tabIndexChangedHandler = (currentTab: number) => {
    setCurrentIMTab(currentTab);
  }

  const [popupIMContactsListOpened, setPopupIMContactsListOpened] = useState(false);

  const openIMPopupContactsListHandler = () => {

    setPopupIMContactsListOpened(!popupIMContactsListOpened);

  }

  const onContactSelected = (contact, action, tabIndex) => {

    console.log("::: onContactSelected :::", contact, action, tabIndex);

  }

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
        onContactSelected={onContactSelected}
        itemsPerPage={10}
      />

    </React.Fragment>

  )

};