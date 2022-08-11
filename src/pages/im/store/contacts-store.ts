import { createStore } from 'framework7/lite';

import Worker from 'web-worker';

const workerSyncIMContacts = new Worker(
  new URL('../workers/worker-sync-contacts-im.mjs', import.meta.url),
  { type: 'module' }
);

const workerSyncPhoneContacts = new Worker(
  new URL('../workers/worker-sync-contacts-phone.mjs', import.meta.url),
  { type: 'module' }
);

const StorageContacts = createStore({
  
  state: {

    /*----- Start User Account State Variables -----*/

    phoneContacts: [],

    imContacts: [],

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

    syncIMContacts({ state }: any) {      
      
      workerSyncIMContacts.onmessage = (e) => {

        state.imContacts = e.data;
      
      };

      workerSyncIMContacts.postMessage({ msg: "sync" }); //Send data to the worker at worker.js

    },

    syncPhoneContacts({ state }: any) {      
      
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
