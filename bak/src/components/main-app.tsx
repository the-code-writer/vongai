import React, {useState, useEffect, useRef} from 'react';
import {getDevice} from 'framework7/lite-bundle';
import {
    f7,
    f7ready,
    App,
    Panel,
    View,
    Popup,
    Page,
    Navbar,
    Link,
    Block,
    List,
} from 'framework7-react';

import Dom7 from "dom7";

import capacitorApp from '../assets/js/capacitor-app';
import routes from '../assets/js/routes';


import AppState from "../system/libs/dovellous-f7/state/app-data";

const MyApp = () => {

    let [authPIN, setAuthPIN] = useState('____');

    let [userData, setUserData] = useState({});

    const validAuthPIN = useState('1234');

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    let isUserLoggedIn = false;

    let validateAuthPINMode = true;
    let updateAuthPIN1 = "";
    let updateAuthPIN2 = "";
    let updateAuthPINAttempt = 0;

    let pinModal, pinModalMini;

    const device = getDevice();
    // Framework7 Parameters
    const f7params = {
        name: 'JobTrac', // App name
        theme: 'auto', // Automatic theme detection


        id: 'io.framework7.myapp', // App bundle ID
        // App store
        store: AppState,
        // App routes
        routes: routes,
        // Register service worker (only on production build)
        serviceWorker: process.env.NODE_ENV === 'production' ? {
            path: '/service-worker.js',
        } : {},
        // Input settings
        input: {
            scrollIntoViewOnFocus: device.capacitor,
            scrollIntoViewCentered: device.capacitor,
        },
        // Capacitor Statusbar settings
        statusbar: {
            iosOverlaysWebView: true,
            androidOverlaysWebView: false,
        },
    };

    const authorizePIN = () => {

        validateAuthPINMode = true;

        authPIN = "⚪⚪⚪⚪";

        f7.emit('OPEN_PIN_MODAL');

    }

    const changeUserPIN = () => {

        validateAuthPINMode = false;

        f7.on('PIN_INPUT', (value)=>{

            updateAuthPINAttempt++;

            authPIN = "⚪⚪⚪⚪";

            if (updateAuthPINAttempt === 1){

                updateAuthPIN1 = value;

                console.log("PIN 1: INPUT", value);

                f7.emit('OPEN_PIN_MODAL');

            } else if (updateAuthPINAttempt === 2){

                updateAuthPIN2 = value;

                console.log("PIN 2: INPUT", value);

                if (updateAuthPIN1 === updateAuthPIN2){
                    console.log("USER_PIN_VALID");
                }else{
                    console.log("USER_PIN_INVALID");
                }

            }else{

                console.log("PIN X: INPUT ATTEMPT#", updateAuthPINAttempt);

            }

        });

        f7.emit('OPEN_PIN_MODAL');

    }

    const logOut = () => {
        f7.dialog.confirm(
            "Are you sure you want to logout?",
            () => {
                console.log("Logout");
                f7.emit("LOGOUT");
                Dom7("#view-login").show();
                Dom7("#view-main").hide();
            },
            () => {

                console.log("Cancelled Logout");
                /*
                                helper.data.getKey(
                                    'app.themes.dark',
                                    function (data: any){
                                        console.log(data,  "DATA : Cancelled Logout");
                                    }
                                );
                */
            });
    }

    const initPINModal = () => {

        pinModal = f7.keypad.create({
            inputEl: '#demo-numpad-inline',
            containerEl: '#numpad-inline-container',
            toolbar: false,
            valueMaxLength: 4,
            dotButton: false,
            formatValue: function (value) {
                value = value.toString();
                authPIN = ('⚫⚫⚫⚫').substring(0, value.length) + ('⚪⚪⚪⚪').substring(0, 4 - value.length);
                console.log("INPUT (MASKED|UNMASKED)", authPIN, value);
                return authPIN;
            },
            on: {
                change: function (keypad, value) {
                    console.log(keypad, value);
                    value = value.toString();
                    if (value.length === 4) {

                        if (validateAuthPINMode) {

                            if (value === validAuthPIN[0]) {
                                f7.emit("PIN_CORRECT");
                                f7.emit('CLOSE_PIN_MODAL');
                            } else {
                                Dom7("#demo-numpad-inline").addClass("shake");
                                setTimeout(function () {
                                    Dom7("#demo-numpad-inline").removeClass("shake");
                                    f7.emit("PIN_INCORRECT");
                                }, 1000);
                            }

                        }else{

                            f7.emit("PIN_INPUT", value);

                        }
                    }
                }
            }
        });

        pinModal.open();



        Dom7("#numpad-mini").hide();

    }

    const AppMainView = ({userData, isLoggedInUser}) => {

        {/* Your main view, should have "view-main" class */}

        if (isLoggedInUser && userData.hasOwnProperty("username")){

            return <React.Fragment>
                <View main className="safe-areas" url="/" id="f7-view-main"/>
            </React.Fragment>

        }

        return <React.Fragment>
                <View main className="safe-areas" url="/login/" id="f7-view-login"/>
            </React.Fragment>

    }

    useEffect(() => {

        f7ready((F7Component) => {

            console.warn("F7 COMPONENT READY");

            // Init capacitor APIs (see capacitor-app.js)
            if (f7.device.capacitor) {
                capacitorApp.init(f7);
            }
            // Call F7 APIs here

            F7Component.authorizePIN = authorizePIN;

            F7Component.changeUserPIN = changeUserPIN;

            F7Component.on("AUTH_LOGGED_IN_USER", function (user) {

                if ("id" in user){

                    setIsLoggedIn(true);
                    setUserData(user);
                    console.log(":: AUTH LOGGED_IN_USER ::",isLoggedIn,user);

                }else{

                    console.log(":: AUTH FAKE LOGGED_IN_USER ::",isLoggedIn,user);

                }

            })

            F7Component.on("AUTH_LOGGED_OUT_USER", function (data) {

                setIsLoggedIn(false);
                setUserData({});
                console.log(":: AUTH_LOGGED_OUT_USER ::1", isLoggedIn,data);

            })

            F7Component.on("OPEN_USER_PIN_KEYPAD", function (e) {

                console.log("EVENT: OPEN_USER_PIN_KEYPAD", e);

                Dom7("#numpad-mini").show();

            })

            F7Component.on("OPEN_PIN_MODAL", function (e) {

                console.log("EVENT: OPEN_PIN_MODAL", e);

                f7.popup.open(".popup-pin-authentication");

            })

            F7Component.on("CLOSE_PIN_MODAL", function (e) {

                console.log("EVENT: CLOSE_PIN_MODAL", e);

                f7.popup.close(".popup-pin-authentication");

            })

            initPINModal();

        })

    }, []);

    return (
        <App {...f7params} >

            {/* Left panel with cover effect*/}
            <Panel left cover dark>
                <View>
                    <Page>
                        <Navbar title="Left Panel"/>
                        <Block>Left panel content goes here</Block>
                    </Page>
                </View>
            </Panel>


            {/* Right panel with reveal effect*/}
            <Panel right reveal dark>
                <View>
                    <Page>
                        <Navbar title="Right Panel"/>
                        <Block>Right panel content goes here</Block>
                    </Page>
                </View>
            </Panel>


            {/* Main View */}
            <AppMainView userData={userData} isLoggedInUser={isLoggedIn} />

            {/* Popup */}

            <Popup className="popup-pin-authentication" swipeToClose={false} closeOnEscape={false}>
                <Page>

                    <div className="page-content pin-keypad-screen-content">
                        {validateAuthPINMode && (
                            <Link iconIos="f7:xmark" iconAurora="f7:xmark" iconMd="material:close"
                                  popupClose=".popup-pin-authentication"/>
                        )}
                        <div className="pin-keypad-screen-title">Enter Your PIN</div>
                        <List form>
                            <input id="demo-numpad-inline"
                                   type="text" readOnly={true}
                                   value={authPIN}
                                   onInput={(e) => {
                                       setAuthPIN(e.target.value);
                                   }}
                            />
                        </List>
                        <div className="block block-strong no-padding no-margin passcode-numpad">
                            <div id="numpad-inline-container"/>
                        </div>
                    </div>

                </Page>
            </Popup>



        </App>
    )
}
export default MyApp;