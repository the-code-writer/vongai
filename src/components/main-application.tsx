import React, { useEffect } from "react";
import { getDevice } from "framework7/lite-bundle";
import {
  f7,
  f7ready,
  App,
  View
} from "framework7-react";

import capacitorApp from "../js/capacitor-app";
import routes from "../js/routes";
import store from "../js/store";

import { StorageIM, StorageContacts } from "../dovellous/index";

const MainApplication = () => {

  // Device data
  const device = getDevice();
  // Framework7 Parameters
  const f7params = {
    // App name
    name: process.env.APP_NAME, 
    // Automatic theme detection
    theme: process.env.AUTO_THEME_DETECTION,
    // App bundle ID
    id: process.env.APP_ID, 
    // App store
    store: store,
    // App routes
    routes: routes,
    // Track system theme
    autoDarkTheme: true,
    // Get device language
    language: navigator.language,
    // Register service worker (only on production build)
    serviceWorker: process.env.NODE_ENV === 'production' ? {
      path: '/service-worker.js',
    } : {},
    // Input settings
    // Input settings
    input: {
      scrollIntoViewOnFocus: device.capacitor,
      scrollIntoViewCentered: device.capacitor,
    },
    // Capacitor Statusbar settings
    statusbar: {
      enabled: true,
      scrollTopOnClick: true,
      iosOverlaysWebView: true,
      androidOverlaysWebView: true,
    },
    view: {
      iosDynamicNavbar: false,
    },
    on: {
      init: function (e) {
        const f7 = this;
        if (f7.device.capacitor) {
          capacitorApp.init(f7);
        }
        console.log(":: APP THEME INITIALIZED ::", process.env, f7, e);
      },
      darkThemeChange: function (e) {
        console.log(":: APP THEME CHANGED ::", e);
      },
      orientationchange: function (e) {
        console.log(":: APP ORIENTATION CHANGED ::", e);
      },
      connection: function (isOnline) {
        console.log(":: APP CXN STATE CHANGED ::", isOnline);
      },
      online: function () {
        console.log(":: APP CXN STATE CHANGED :: ONLINE ::");
      },
      offline: function () {
        console.log(":: APP CXN STATE CHANGED :: OFFLINE ::");
      },
    },

  };
  
  useEffect(() => {

    f7ready((F7React) => {
      
      if (f7.device.capacitor) {

        capacitorApp.init(f7);

      }
      
      if(process.env.APP_ENV !== 'production'){

        window.F7React = F7React;

      }

      // Generate data for IM Testing

      StorageContacts.dispatch("syncIMContacts");

      StorageIM.dispatch("insertFakeMessages");

      StorageIM.dispatch("insertFakeStories");

      //StorageIM.dispatch("insertCalls");

      //

    });

  }, []);

  return (
    <App {...f7params}>
      
      <View id="view-home" main tab tabActive url="/" />

    </App>
  );

};

export default MainApplication;
