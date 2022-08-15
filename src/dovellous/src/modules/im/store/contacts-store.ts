import * as React from 'react';
import { createStore } from 'framework7/lite';
import Worker from 'web-worker';

const workerSyncIMContacts = new Worker(
  new URL('../workers/sync-contacts-im-worker.mjs', import.meta.url),
  { type: 'module' }
);

const workerSyncPhoneContacts = new Worker(
  new URL('../workers/sync-contacts-phone-worker.mjs', import.meta.url),
  { type: 'module' }
);

const StorageContacts = createStore({
  
  state: {

    /*----- Start Contacts State Variables -----*/

    phoneContacts: [],

    imContacts: [],

    imContactsCount: 0,

    /*----- End Contacts State Variables -----*/

  },
  getters: {
    
    /*----- Start Contacts Getters -----*/

    phoneContacts({ state }) {
      return state.phoneContacts;
    },

    imContacts({ state }) {
      return state.imContacts;
    },

    imContactsCount({ state }) {
      return state.imContactsCount;
    },

    /*----- End Contacts Getters -----*/

  },
  actions: {

    /*----- Start Contacts Setters / Actions -----*/

    phoneContacts({ state }: any, phoneContacts: any) {
      state.phoneContacts = phoneContacts;
    },

    imContacts({ state }: any, imContacts: any) {
      state.imContacts = imContacts;
    },

    syncIMContacts({ state }: any) {      
      
      workerSyncIMContacts.onmessage = (e) => {

        state.imContacts = e.data;

      };

      workerSyncIMContacts.postMessage({ msg: "sync" });

    },

    syncPhoneContacts({ state }: any) {      
      
      workerSyncPhoneContacts.onmessage = (e) => {

        state.phoneContacts = e.data;
      
      };

      workerSyncPhoneContacts.postMessage({ msg: "sync" });

    },

    addContact({ state }: any, contactMetadata: any) {
      //
    },

    /*----- End Contacts Setters Actions -----*/

  },

})

const useStorageContacts = (storageKey: string, fallbackState: any) => {

  const [storageContactsValue, setStorageContactsValue] = React.useState<any>(StorageContacts.getters[storageKey].value??fallbackState);
   
  StorageContacts.getters[storageKey].onUpdated((newValue: any)=>{
    
    setStorageContactsValue(newValue);

  });

  return [storageContactsValue, setStorageContactsValue];

};

export {StorageContacts, useStorageContacts} ;
