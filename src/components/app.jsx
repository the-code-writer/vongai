import React, { useState, useEffect } from "react";
import { getDevice } from "framework7/lite-bundle";
import {
  f7,
  f7ready,
  App,
  Panel,
  Views,
  View,
  Popup,
  Page,
  Navbar,
  Toolbar,
  NavRight,
  Link,
  Block,
  BlockTitle,
  LoginScreen,
  LoginScreenTitle,
  List,
  ListItem,
  ListInput,
  ListButton,
  BlockFooter,
  theme,
} from "framework7-react";

import capacitorApp from "../js/capacitor-app";
import routes from "../js/routes";
import store from "../js/store";

import { StorageIM, useStorageIM } from "../dovellous/src/modules/im/store/im-store";
import { StorageContacts, useStorageContacts } from "../dovellous/src/modules/im/store/contacts-store";
import Dom7 from "dom7";

const MyApp = () => {
  // Login screen demo data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const device = getDevice();
  // Framework7 Parameters
  const f7params = {
    name: "Vongai", // App name
    theme: "auto", // Automatic theme detection

    id: "vong.ai", // App bundle ID
    // App store
    store: store,
    data: {
      IM: { StorageIM: StorageIM },
    },
    // App routes
    routes: routes,
    autoDarkTheme: true,

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
      init: function () {
        const f7 = this;
        if (f7.device.capacitor) {
          // Init capacitor APIs (see capacitor-app.js)
          capacitorApp.init(f7);
        }
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
  const alertLoginData = () => {
    f7.dialog.alert(
      "Username: " + username + "<br>Password: " + password,
      () => {
        f7.loginScreen.close();
      }
    );
  };

  const [_imContacts, set_imContacts] = useStorageContacts('imContacts');


  useEffect(() => {

    f7ready((F7React) => {
      // Init capacitor APIs (see capacitor-app.js)
      if (f7.device.capacitor) {
        capacitorApp.init(f7);
      }
      // Call F7 APIs here

      window.F7React = F7React;

      window.F7React.dom7x = Dom7;

      window.F7React.themex = theme;

      StorageContacts.dispatch("syncIMContacts", null);

    });

  }, []);

  useEffect(() => {

    console.log('::: VALUE OF :::_imContacts:::', _imContacts);

  }, [_imContacts]);


  return (
    <App {...f7params}>
      {/* Left panel with cover effect*/}


      {/* Right panel with reveal effect*/}
      <Panel right reveal dark>
        <View>
          <Page>
            <Navbar title="Right Panel" />
            <Block>Right panel content goes here</Block>
          </Page>
        </View>
      </Panel>

      <View id="view-home" main tab tabActive url="/" />

      {/* Views/Tabs container 
        <Views tabs className="safe-areas">
          {/* Tabbar for switching views-tabs  
          <Toolbar tabbar labels bottom>
            <Link tabLink="#view-home" tabLinkActive iconIos="f7:house_fill" iconAurora="f7:house_fill" iconMd="material:home" text="Home" />
            <Link tabLink="#view-catalog" iconIos="f7:square_list_fill" iconAurora="f7:square_list_fill" iconMd="material:view_list" text="Catalog" />
            <Link tabLink="#view-settings" iconIos="f7:gear" iconAurora="f7:gear" iconMd="material:settings" text="Settings" />
          </Toolbar>

          {/* Your main view/tab, should have "view-main" class. It also has "tabActive" prop  
          <View id="view-home" main tab tabActive url="/" />

          {/* Catalog View  
          <View id="view-catalog" name="catalog" tab url="/catalog/" />

          {/* Settings View 
          <View id="view-settings" name="settings" tab url="/settings/" />

        </Views> */}

      {/* Popup */}
      <Popup id="my-popup">
        <View>
          <Page>
            <Navbar title="Popup">
              <NavRight>
                <Link popupClose>Close</Link>
              </NavRight>
            </Navbar>
            <Block>
              <p>Popup content goes here.</p>
            </Block>
          </Page>
        </View>
      </Popup>

      <LoginScreen id="my-login-screen">
        <View>
          <Page loginScreen>
            <LoginScreenTitle>Login</LoginScreenTitle>
            <List form>
              <ListInput
                type="text"
                name="username"
                placeholder="Your username"
                value={username}
                onInput={(e) => setUsername(e.target.value)}
              ></ListInput>
              <ListInput
                type="password"
                name="password"
                placeholder="Your password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              ></ListInput>
            </List>
            <List>
              <ListButton title="Sign In" onClick={() => alertLoginData()} />
              <BlockFooter>
                Some text about login information.
                <br />
                Click "Sign In" to close Login Screen
              </BlockFooter>
            </List>
          </Page>
        </View>
      </LoginScreen>

    </App>
  );
};
export default MyApp;
