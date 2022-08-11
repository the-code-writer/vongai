import * as React from 'react';

import { createStore } from 'framework7/lite';

const StorageUserAccount = createStore({
  
  state: {

    /*----- Start User Account State Variables -----*/

    firstName: '',
    lastName:  '',
    displayName: '',
    displayPhoto: '',
    photoURL: '',
    phoneNumber: '',
    email: '',
    firebaseUID: '',
    username: '',    
    userMetadata: {},

    /*----- End User Account State Variables -----*/

  },
  getters: {
    
    /*----- Start User Account Getters -----*/

    firstName({ state }) {
      return state.firstName;
    },

    lastName({ state }) {
      return state.lastName;
    },

    displayName({ state }) {
      return state.displayName;
    },

    displayPhoto({ state }) {
      return state.displayPhoto;
    },

    photoURL({ state }) {
      return state.photoURL;
    },

    phoneNumber({ state }) {
      return state.phoneNumber;
    },

    email({ state }) {
      return state.email;
    },

    firebaseUID({ state }) {
      return state.firebaseUID;
    },

    username ({ state }) {
      return state.imListBots;
    },

    userMetadata ({ state }) {
      return state.userMetadata;
    },

    /*----- End User Account Getters -----*/

  },
  actions: {

    /*----- Start User Account Setters / Actions -----*/

    firstName({ state }: any, firstName: any) {
      state.firstName = firstName;
    },

    lastName({ state }: any, lastName: any) {
      state.lastName = lastName;
    },

    displayName({ state }: any, displayName: any) {
      state.displayName = displayName;
    },

    displayPhoto({ state }: any, displayPhoto: any) {
      state.displayPhoto = displayPhoto;
    },

    photoURL({ state }: any, photoURL: any) {
      state.imListChatsLoading = photoURL;
    },

    phoneNumber({ state }: any, phoneNumber: any) {
      state.phoneNumber = phoneNumber;
    },

    email({ state }: any, email: any) {
      state.email = email;
    },

    firebaseUID({ state }: any, firebaseUID: any) {
      state.firebaseUID = firebaseUID;
    },

    username({ state }: any, username: any) {
      state.username = username;
    },

    userMetadata({ state }: any, userMetadata: any) {
      state.userMetadata = userMetadata;
    },

    addUserMetadata({ state }: any, userMetadata: any) {
      const _userMetadata = state.userMetadata;
      _userMetadata[userMetadata.key] = userMetadata.value;
      state.userMetadata = _userMetadata;
    },

    /*----- End User Account Setters Actions -----*/

  },
})

const useStorageUserAccount = (storageKey: string, fallbackState: any) => {

  const currentValue = StorageUserAccount.state[storageKey];

  const [value, setValue] = React.useState(currentValue || fallbackState);

  React.useEffect(() => {
    StorageUserAccount.dispatch(storageKey, value);
  }, [value, storageKey]);

  return [value, setValue];

};

export {StorageUserAccount, useStorageUserAccount} ;
