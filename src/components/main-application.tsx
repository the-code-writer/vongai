import React, { useEffect } from "react";
import { getDevice } from "framework7/lite-bundle";
import {
  f7,
  f7ready,
  App,
  View
} from "framework7-react";

import { ErrorBoundary } from 'react-error-boundary';

import capacitorApp from "../js/capacitor-app";
import routes from "../js/routes";
import store from "../js/store";

const MainApplication = () => {

  // Device data
  const device = getDevice();
  // Framework7 Parameters
  const f7params = {
    // App name
    name: import.meta.env.VNG_APP_NAME, 
    // Automatic theme detection
    theme: import.meta.env.VNG_AUTO_THEME_DETECTION,
    // App bundle ID
    id: import.meta.env.VNG_APP_ID, 
    // App store
    store: store,
    // App routes
    routes: routes,
    // Track system theme
    autoDarkTheme: true,
    // Get device language
    language: navigator.language,
    // Register service worker (only on production build)
    serviceWorker: import.meta.env.PROD ? {
      path: '/service-worker.js',
    } : {},
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
        console.log(":: APP THEME INITIALIZED ::", import.meta.env, f7, e);
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

      console.warn("::::::", import.meta.env);
      
      if(!import.meta.env.PROD){

        window.F7React = F7React;

      }

      // Generate data for IM Testing

      //f7.dovellous.store.StorageContacts.dispatch("syncIMContacts",null);

      //f7.dovellous.store.StorageIM.dispatch("insertFakeMessages",null);

      //f7.dovellous.store.StorageIM.dispatch("insertFakeStories",null);

      //f7.dovellous.store.StorageIM.dispatch("insertCalls");

      //

    });

  }, []);
  
  const errorFallback = ({ error }) => {
    return (
      <div role="alert">
        <h2>Something went wrong:</h2>
        <pre>{error.message}</pre>
      </div>
    )
  }
  
  return (
    <React.Fragment>
      {/* <ThemeContextProvider>  */}
      <ErrorBoundary FallbackComponent={errorFallback}>
          <App {...f7params}>      
            <View id="view-home" main tab tabActive url="/" />
         </App>
      </ErrorBoundary>
      {/* </ThemeContextProvider> */}
    </React.Fragment>
  );

};

export default MainApplication;
