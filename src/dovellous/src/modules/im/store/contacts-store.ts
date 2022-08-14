


import { createStore } from 'framework7/lite';

import Worker from 'web-worker';

const workerSyncIMContacts = new Worker(
  new URL('../workers/sync-contacts-im.worker.mjs', import.meta.url),
  { type: 'module' }
);

const workerSyncPhoneContacts = new Worker(
  new URL('../workers/sync-contacts-phone.worker.mjs', import.meta.url),
  { type: 'module' }
);

const StorageContacts = createStore({
  
  state: {

    /*----- Start User Account State Variables -----*/

    phoneContacts: [],

    imContacts: [],

    imContactsCount: 0,

    /*----- End User Account State Variables -----*/

  },
  getters: {
    
    /*----- Start User Account Getters -----*/

    phoneContacts({ state }) {
      return state.phoneContacts;
    },

    imContacts({ state }) {
      return state.imContacts;
    },

    imContactsCount({ state }) {
      return state.imContactsCount;
    },

    /*----- End User Account Getters -----*/

  },
  actions: {

    /*----- Start User Account Setters / Actions -----*/

    phoneContacts({ state }: any, phoneContacts: any) {
      state.phoneContacts = phoneContacts;
    },

    imContacts({ state }: any, imContacts: any) {
      state.imContacts = imContacts;
    },

    syncIMContacts({ state, dispatch  }: any) {      
      
      workerSyncIMContacts.onmessage = (e) => {

        state.imContacts = e.data;

        dispatch('syncPhoneContacts', null);
      
      };

      workerSyncIMContacts.postMessage({ msg: "sync" }); //Send data to the worker at worker.js

    },

    syncPhoneContacts({ state, dispatch  }: any) {      
      
      workerSyncPhoneContacts.onmessage = (e) => {

        state.phoneContacts = e.data;
      
      };

      workerSyncPhoneContacts.postMessage({ msg: "sync" }); //Send data to the worker at worker.js

    },

    addContact({ state }: any, contactMetadata: any) {
      //
    },

    /*----- End User Account Setters Actions -----*/

  },
})

export {StorageContacts} ;