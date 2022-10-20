import * as React from 'react';
import { faker } from '@faker-js/faker';
import { createStore } from 'framework7/lite';
import K from '../../../libraries/app/konstants';
import { f7 } from 'framework7-react';
 
const AuthIM = createStore({

  state: {

    firstName: '',

    lastName: '',

    displayName: '',

    phoneNumber: '',

    photoURL: '',

    displayPhoto: '',

    emailVerified: false,

    accountDisabled: false,

    uid: '',

    authProviders: {},

    firebaseUser: {},

    webUser: {},

    isLoggedIn: false,

  },
  getters: {

    firstName({ state }) {
      return state.firstName;
    },

    lastName({ state }) {
      return state.lastName;
    },

    displayName({ state }) {
      return state.displayName;
    },

    phoneNumber({ state }) {
      return state.phoneNumber;
    },

    photoURL({ state }) {
      return state.photoURL;
    },

    displayPhoto({ state }) {
      return state.displayPhoto;
    },

    emailVerified({ state }) {
      return state.emailVerified;
    },

    accountDisabled({ state }) {
      return state.accountDisabled;
    },

    uid({ state }) {
      return state.uid;
    },

    authProviders({ state }) {
      return state.authProviders;
    },

    firebaseUser({ state }) {
      return state.firebaseUser;
    },

    webUser({ state }) {
      return state.webUser;
    },

    isLoggedIn({ state }) {
      return state.isLoggedIn;
    },

  },

  actions: {

    firstName({ state }, data: any) {
      state.firstName = data;
    },

    lastName({ state }, data: any) {
      state.lastName = data;
    },

    displayName({ state }, data: any) {
      state.displayName = data;
    },

    phoneNumber({ state }, data: any) {
      state.phoneNumber = data;
    },

    photoURL({ state }, data: any) {
      state.photoURL = data;
    },

    displayPhoto({ state }, data: any) {
      state.displayPhoto = data;
    },

    emailVerified({ state }, data: any) {
      state.emailVerified = data;
    },

    accountDisabled({ state }, data: any) {
      state.accountDisabled = data;
    },

    uid({ state }, data: any) {
      state.uid = data;
    },

    authProviders({ state }, data: any) {
      state.authProviders = data;
    },

    firebaseUser({ state }, data: any) {
      state.firebaseUser = data;
    },

    webUser({ state }, data: any) {
      state.webUser = data;
    },

    isLoggedIn({ state }, data: any) {
      state.isLoggedIn = data;
    },
    
  },

})

const useAuthIM = (storageKey: string, initialState?: any) => {

  const [authIMValue, setAuthIMValue] = React.useState<any>(initialState??AuthIM.getters[storageKey].value);
   
  AuthIM.getters[storageKey].onUpdated((newValue: any)=>{
    
    setAuthIMValue(newValue);

  });

  const setAuthIMValueInternal = (newValue:any)=>{

    AuthIM.dispatch(storageKey, newValue);

  }

  return [authIMValue, setAuthIMValueInternal];

};

export { AuthIM, useAuthIM };
