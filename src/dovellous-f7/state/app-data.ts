import Framework7 from 'framework7/bundle';

import {createStore} from 'framework7';
import K from '../src/libraries/app/konstants';
import { CapacitorStorage } from '../src/libraries/storage/capacitor-js-storage/CapacitorStorage';
import Encryption from '../src/libraries/cryptography/encryption';

const capacitorStorage = new CapacitorStorage(true);

const encryptionService = Encryption;

import {encryptPublicLong, decryptPrivateLong} from '@lsqswl/rsaencrypt';

const AppState = createStore({

    state: {

        /* ######## AUTH ######## */
 
        authLoginIsLoading: false,
        authLoginWithPIN: true,
        authLoginPINLength: 6,

        /* ######## AUTH ######## */

        defaultLanguage: 'en',

        loggedIn: false,
        isSigningIn: false,
        isSigningUp: false,
        hasAccessToken: false,
        firebaseIsReady: false,
        biometricIsReady: false,
        biometricType: false,
        securityE2E: {
            keys: {
                deviceKey: false,
                privateKey: false,
                publicKeys: {
                    server: false,
                    device: false,
                }
            },
            tokens: {
                FCM: false,
            }
        },
        oauth: {
            accessToken: '',
            accessTokenPayload: '',
            refreshToken: '',
            clientToken: '',
            clientId: '',
            clientSecret: '',
            grantType: 'password',
        },
        settings: {
            allow_push_notifications: ['on'],
            auto_lock: [],
            currency: 'USD',
            enable_2fa: [],
            enable_fingerprint_auth: [],
            enable_kiosk_mode: [],
            enable_dark_theme: [],
            enable_solid_theme: [],
            enable_color_theme: 'THEME_LIGHT',
            auto_detect_device_theme: ['on'],
        },
        userInfo: {
            username: '',
            password: '',
            userId: 1,
            firstname: '',
            lastname: '',
            uuid: '',
            dob: '1970-01-01',
            gender: '',
            bio: '',
            roles: []

        },
        userMeta: {
            addresses: [],
            orders: [],
            transactions: [],
            wishlist: [],
            cart: {},
            data: {},
        },
        accountInfo: {
            displayName: '',
            email: '',
            photoURL: '',
        },
        firebaseInfo: {

            photoURL: false,
            displayName: false,
            phoneNumber: false,
            email: false,
            uid: false,

        },
        deviceInfo: {

        },
        app: {
            ui: {
                views: {},                
                popups: {},
                popovers: {},
                labels: {
                    en: {}
                }
            },
            content: {
                niche: {},
                ecommerce: {},
                listViews: {
                    drawer: {},
                    messenger: {}
                }
            },
            version: {
                number: 100000000,
                revision: "1.0.0",
                code: "100.000.000",
                created: 17324597043743,
                updated: 24393298235784,
                checksum: ''
            },
            api: {
                currentDomainIndex: 0,
                domains: [
                    {
                        protocol: 'https',
                        domain: 'dovellous.com',
                        subdomain: 'api',
                        path: '',
                        version: 'v1'
                    },
                    {
                        protocol: 'http',
                        domain: '[::1]:8088',
                        subdomain: false,
                        path: 'api/public',
                        version: 'v1'
                    },
                    {
                        protocol: 'http',
                        domain: '[::1]',
                        subdomain: false,
                        path: 'api/public',
                        version: 'v1'
                    },
                    {
                        protocol: 'https',
                        domain: 'hyperefficient2.net',
                        subdomain: 'api',
                        path: false,
                        version: 'v1'
                    },
                    {
                        protocol: 'https',
                        domain: 'inboxgroup.ai',
                        subdomain: 'api',
                        path: false,
                        version: 'v1'
                    },
                ],
                endpoints: {
                    signIn: {
                        path: '/oauth/signin',
                        method: K.RequestMethods.POST,
                        auth: K.Oauth.BEARER_TOKEN,
                        contentType: 'text/json',
                    },
                    signUp: {
                        path: 'oauth/sign_up',
                        method: K.RequestMethods.POST,
                        auth: K.Oauth.BEARER_TOKEN,
                        contentType: 'text/json',
                    },
                    registerUser: {
                        path: 'user/register',
                        method: K.RequestMethods.POST,
                        auth: K.Oauth.BASIC,
                        contentType: 'application/x-www-form-urlencoded',
                        timeout: 0,
                    },
                    getAccessToken: {
                        path: 'user/login',
                        method: K.RequestMethods.POST,
                        auth: K.Oauth.BASIC,
                        contentType: 'application/x-www-form-urlencoded',
                        timeout: 0,
                    },
                    clientRegister: {
                        path: 'device/register',
                        method: K.RequestMethods.POST,
                        auth: K.Oauth.NONE,
                        contentType: 'text/json',
                    },
                    clientUpdateFirebaseToken: {
                        path: 'oauth/client_update_firebase_token',
                        method: K.RequestMethods.POST,
                        auth: K.Oauth.BEARER_TOKEN,
                        contentType: 'text/json',
                    },
                    accountSendConfirmationCode: {
                        path: 'oauth/account_send_confirmation_code',
                        method: K.RequestMethods.POST,
                        auth: K.Oauth.BEARER_TOKEN,
                        contentType: 'text/json',
                    },
                    accountVerifyConfirmationCode: {
                        path: 'oauth/account_verify_confirmation_code',
                        method: K.RequestMethods.POST,
                        auth: K.Oauth.BEARER_TOKEN,
                        contentType: 'text/json',
                    },
                    accountUpdatePassword: {
                        path: 'oauth/account_update_password',
                        method: K.RequestMethods.POST,
                        auth: K.Oauth.BEARER_TOKEN,
                        contentType: 'text/json',
                    },
                    sendFeedback: {
                        path: 'contacts/send_feedback',
                        method: K.RequestMethods.POST,
                        auth: K.Oauth.BEARER_TOKEN,
                        contentType: 'text/json',
                    },
                    getFeeds: {
                        path: 'feeds',
                        method: K.RequestMethods.GET,
                        auth: K.Oauth.BEARER_TOKEN,
                        contentType: 'text/json',
                    },
                    getBlog: {
                        path: 'blog',
                        method: K.RequestMethods.GET,
                        auth: K.Oauth.BEARER_TOKEN,
                        contentType: 'text/json',
                    },
                    getProducts: {
                        path: 'products',
                        method: K.RequestMethods.GET,
                        auth: K.Oauth.BEARER_TOKEN,
                        contentType: 'text/json',
                    },
                },
            },

            settings: [
                {
                    header: 'Authentication',
                    icon: false,
                    iconClass: false,
                    configs: [
                        {
                            label: false,
                            placeholder: false,
                            inputName: false,
                            inputType: K.Inputs.TOGGLE,
                            iconColor: false,
                            iconOS: {
                                android: {
                                    name: false,
                                    class: false,
                                },
                                ios: {
                                    name: false,
                                    class: false,
                                },
                                aurora: {
                                    name: false,
                                    class: false,
                                },
                            }
                        }
                    ]
                }

            ],

            socialAccountsArray: [
                {
                    title: "Google",
                    icon: "logo_google",
                    image: "assets/png/logos/google.png",
                    provider: "GOOGLE",
                    id: "google",
                    domain: "google.com",
                    color: "#f44336"
                },
                {
                    title: "Facebook",
                    icon: "logo_facebook",
                    image: "assets/png/logos/facebook.png",
                    provider: "FACEBOOK",
                    id: "facebook",
                    domain: "facebook.com",
                    color: "#3f51b5"
                },
                {
                    title: "Twitter",
                    icon: "logo_twitter",
                    image: "assets/png/logos/twitter.png",
                    provider: "TWITTER",
                    id: "twitter",
                    domain: "twitter.com",
                    color: "#2196f3"
                },
                {
                    title: "Microsoft",
                    icon: "logo_windows",
                    image: "assets/png/logos/microsoft.png",
                    provider: "MICROSOFT",
                    id: "microsoft",
                    domain: "microsoft.com",
                    color: "#03a9f4"
                },
                {
                    title: "Apple",
                    icon: "logo_apple",
                    image: "assets/png/logos/apple.png",
                    provider: "APPLE",
                    id: "apple",
                    domain: "apple.com",
                    color: "#121212"
                },
            ]

        },
        languages: {},
        contacts: [],
        location: {},

    },
    getters: {

        defaultLanguage({state}) {
            return state.defaultLanguage;
        },

        /* ######## AUTH ######## */
 
        authLoginIsLoading({state}) {
            return state.authLoginIsLoading;
        },

        authLoginWithPIN({state}) {
            return state.authLoginWithPIN;
        },

        authLoginPINLength({state}) {
            return state.authLoginPINLength;
        },

        /* ######## AUTH ######## */

        getloggedIn({state}) {
            return state.loggedIn;
        },
        isSigningIn({state}) {
            return state.isSigningIn;
        },
        isSigningUp({state}) {
            return state.isSigningUp;
        },
        hasAccessToken({state}) {
            return state.hasAccessToken;
        },        
        getFirebaseIsReady({state}) {
            return state.firebaseIsReady;
        },
        getBiometricIsReady({state}) {
            return state.biometricIsReady;
        },
        getBiometricType({state}) {
            return state.biometricType;
        },
        deviceKey({state}) {
            return state.securityE2E.keys.deviceKey;
        },
        devicePrivateKey({state}) {
            return state.securityE2E.keys.privateKey;
        },
        devicePublicKey({state}) {
            return state.securityE2E.keys.publicKeys.device;
        },
        serverPublicKey({state}) {
            return state.securityE2E.keys.publicKeys.server;
        },
        clientAccessToken({state}) {
            return state.oauth.accessToken;
        },
        clientAccessTokenPayload({state}) {
            return state.oauth.accessTokenPayload;
        },
        clientRefreshToken({state}) {
            return state.oauth.refreshToken;
        },
        clientId({state}) {
            return state.oauth.clientId;
        },
        clientToken({state}) {
            return state.oauth.clientToken;
        },
        clientSecret({state}) {
            return state.oauth.clientSecret;
        },
        grantType({state}) {
            return state.oauth.grantType;
        },
        settings({state}) {
            return state.settings;
        },
        userInfo({state}) {
            return state.user_info;
        },
        userMeta({state}) {
            return state.userMeta;
        },
        accountInfo({state}) {
            return state.accountInfo;
        },
        firebaseInfo({state}) {
            return state.firebaseInfo;
        },
        deviceInfo({state}) {
            return state.device_info;
        },
        getApp({state}) {
            return state.app;
        },
        getAppUI({state}) {
            return state.app.ui;
        },
        getAppUIViews({state}) {
            return state.app.ui.views;
        },
        getAppUIPopups({state}) {
            return state.app.ui.popups;
        },
        getAppUIPopovers({state}) {
            return state.app.ui.popovers;
        },
        getAppContent({state}) {
            return state.app.content;
        },
        getAppContentNiche({state}) {
            return state.app.content.niche;
        },
        getAppContentEcommerce({state}) {
            return state.app.content.ecommerce;
        },
        getAppContentListViews({state}) {
            return state.app.content.listViews;
        },
        getAppContentListViewsDrawer({state}) {
            return state.app.content.listViews.drawer;
        },
        getAppContentListViewsMessenger({state}) {
            return state.app.content.listViews.messenger;
        },
        getAppDataVersion({state}) {
            return state.app.version;
        },
        getAppAPI({state}) {
            return state.app.api;
        },
        getAppAPIProtocol({state}) {
            return state.app.api.protocol;
        },
        getAppAPICurrentDomainIndex({state}) {
            return state.app.api.currentDomainIndex;
        },
        getAppAPIDomains({state}) {
            return state.app.api.domains;
        },
        getAppAPIEndpoints({state}) {
            return state.app.api.endpoints;
        },
        getSocialAccountsArray({state}) {
            return state.app.socialAccountsArray;
        },
        /* ######## AUTH ######## */

    },
    actions: {

        /* ######## AUTH ######## */

        initializeState: function ({state, dispatch}) {

            dispatch("restoreState", (stateData: any): void => {

                    console.log(":: STATE RESTORE ::", stateData);

                });

        },

        backupState: function ({state, dispatch}) {

            dispatch("saveState", (stateData: any): void => {

                    console.log(":: STATE BACKUP ::", stateData);

                });

        },

        initializeData: function ({state, dispatch}) {

            dispatch("restoreAppData", (appData: any): void => {

                    console.log(":: APP DATA RESTORE ::", appData);

                });

        },

        backupData: function ({state, dispatch}) {

            dispatch("saveAppData", (appData: any): void => {

                    console.log(":: APP DATA BACKUP ::", appData);

                });

        },

        /* ######## AUTH ######## */

        saveState({state}, callbackFunction) {
            capacitorStorage.setKey(
                'state',
                state,
                (data) => {
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        restoreState({state}, callbackFunction) {
            capacitorStorage.getKey(
                'state',
                (data) => {
                    state = data;
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        setAppData({state, dispatch}, data) {
            state.securityE2E.keys.publicKeys.server = data;
            dispatch("saveAppData", data);
        },
        saveAppData({state}, callbackFunction) {
            capacitorStorage.setKey(
                'state.app',
                state.app,
                (data) => {
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        restoreAppData({state}, callbackFunction) {
            capacitorStorage.getKey(
                'state.app',
                ( data ) => {
                    state.app = data;
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },

        /* ######## AUTH ######## */

        authLoginIsLoading({state}: any, isLoading: any) {
            state.authLoginIsLoading = isLoading;
        },

        authLoginPINLength({state}: any, len: number) {
            state.authLoginPINLength = len;
        },

        /* ######## AUTH ######## */

        /* ######## AUTH ######## */

        /* ######## AUTH ######## */

        /* ######## AUTH ######## */

        /* ######## AUTH ######## */

        /* ######## AUTH ######## */

        updateRecentItemsSheetModalList({state}, list) {
            state.recentItemsSheetModalList = list;
        },
        updateRecentItemsSheetModalTitle({state}, title) {
            state.recentItemsSheetModalTitle = title;
        },

        /* ######## AUTH ######## */

        securityEncrypt: function ({state}, data) {

            const encryptedData = encryptPublicLong(data.text, state.securityE2E.keys.publicKeys.server);

            if( data.hasOwnProperty("callbackSuccess") && typeof data.callbackSuccess === "function"){

                data.callbackSuccess(encryptedData);

            }

            return encryptedData;

        },

        securityDecrypt: function ({state}, data) {

            const decryptedData = decryptPrivateLong(data.text, state.securityE2E.keys.privateKey);

            if( data.hasOwnProperty("callbackSuccess") && typeof data.callbackSuccess === "function"){

                data.callbackSuccess(decryptedData);

            }

            return decryptedData;

        },

        ajaxGET({state}, url, callbackSuccess, callbackError) {

            Framework7.request.get(url)
                .then(function (res) {
                    callbackSuccess(res.data);
                })
                .catch(function (err) {
                    callbackError(err.xhr, err.status, err.message);
                });

        },
        ajaxPOST({state}, url, data, callbackSuccess, callbackError) {

            Framework7.request.post(url, data)
                .then(function (res) {
                    callbackSuccess(res.data);
                })
                .catch(function (err) {
                    callbackError(err.xhr, err.status, err.message);
                });

        },
        ajaxJSONGET({state}, url, callbackSuccess, callbackError) {

            Framework7.request.json(url)
                .then(function (res) {
                    callbackSuccess(res.data);
                })
                .catch(function (err) {
                    callbackError(err.xhr, err.status, err.message);
                });

        },
        ajaxJSONPOST({state}, url, data, callbackSuccess, callbackError) {

            Framework7.request.postJSON(url, data)
                .then(function (res) {
                    callbackSuccess(res.data);
                })
                .catch(function (err) {
                    callbackError(err.xhr, err.status, err.message);
                });

        },
        ajaxRegisterUser({ state, dispatch }, data) {

            const currentDomain = state.app.api.domains[state.app.api.currentDomainIndex];

            const url = `${currentDomain.protocol}://` + (currentDomain.subdomain ? currentDomain.subdomain + '.' : '') + `${currentDomain.domain}/${currentDomain.path === ''?'':currentDomain.path + '/'}${state.app.api.endpoints.registerUser.path}`;

            let payload = data.userData;

            payload.clientToken = data.clientToken;

            const options = {
                "url": url,
                "method": state.app.api.endpoints.registerUser.method,
                "timeout": state.app.api.endpoints.registerUser.timeout,
                crossDomain: true,
                "headers": {
                    "Authorization": data.hasOwnProperty("authorization") ? data.authorization : "Basic " + btoa(data.clientID + ":" + data.clientSecret),
                },
                "data": payload,
                beforeSend: function (xhr) {
                },
                dataType: "text"
            };

            console.log(":: REGISTER USER SETTINGS ::", options);

            Framework7.request(options)
                .then(function (res) {

                    if(res.hasOwnProperty('data')){

                        if(res.data !== null){

                            try{

                                let serverResponse = JSON.parse(res.data);

                                console.log(":: REGISTER - USER_DATA - serverResponse ::", serverResponse);

                                data.callbackSuccess(serverResponse);

                            } catch (error){

                                console.warn(":: ERROR REGISTERING DATA PARSING ERROR :1:", res.data, JSON.parse(res.data));

                                let errorObject = {status: "error", code: 400, message: 'Error parsing server response message', response: {messages: {json: 'Error parsing server response message'}}, data: res.data, raw: null};

                                data.callbackError(errorObject);

                            }

                        }

                    }

                })
                .catch(function (error) {

                    let responseText = error.xhr.responseText;

                    let errorObject = {};

                    try{

                        responseText = JSON.parse(error.xhr.responseText);

                    } catch (e) {

                        //

                    } finally {

                        errorObject = {status: "error", code: error.xhr.status, message: error.xhr.statusText, response: responseText, raw: error.xhr};

                    }

                    console.warn(":: ERROR REGISTERING USER :2:", errorObject);

                    data.callbackError(errorObject);

                });

        },
        ajaxGetAccessToken({ state, dispatch }, data) {

            const currentDomain = state.app.api.domains[state.app.api.currentDomainIndex];

            const url = `${currentDomain.protocol}://` + (currentDomain.subdomain ? currentDomain.subdomain + '.' : '') + `${currentDomain.domain}/${currentDomain.path === ''?'':currentDomain.path + '/'}${state.app.api.endpoints.getAccessToken.path}`;

            const options = {
                "url": url,
                "method": state.app.api.endpoints.getAccessToken.method,
                "timeout": state.app.api.endpoints.getAccessToken.timeout,
                crossDomain: true,
                "headers": {
                    "Authorization": data.hasOwnProperty("authorization") ? data.authorization : "Basic " + btoa(data.clientID + ":" + data.clientSecret),
                },
                "data": {
                    "grant_type": data.grantType,
                    "username": data.username,
                    "password": data.password
                },
                beforeSend: function (xhr) {
                },
                dataType: "text"
            };

            console.log(":: GET ACCESS TOKEN SETTINGS ::", options);

            Framework7.request(options)
                .then(function (res: { hasOwnProperty: (arg0: string) => any; data: string | null; }) {

                    if(res.hasOwnProperty('data')){

                        if(res.data !== null){

                            let serverResponse;

                            try{

                                serverResponse = JSON.parse(res.data);

                            } catch (error){

                                console.warn(":: ERROR GETTING ACCESS TOKEN :1:", error.status, error.message);

                                data.callbackError({status: "error", message: "", error: error});

                            } finally {

                                if( serverResponse ){


                                    console.log(":: GET ACCESS TOKEN - USER_DATA - serverResponse ::", serverResponse);

                                    let userData = serverResponse.user_data;

                                    let _data = {};

                                    _data.username = userData.email;

                                    _data.email = userData.email;

                                    _data.userId = userData.id;

                                    _data.firstname = userData.firstname;
                                    _data.lastname = userData.lastname;

                                    _data.idnumber = userData.id_number;
                                    _data.dob = userData.dob;
                                    _data.gender = userData.gender;

                                    _data.bio = userData.bio;

                                    _data.roles = userData.roles;

                                    _data.accountNumber = userData.account_number;

                                    if(userData.display_name === null){

                                        _data.displayName = userData.firstname + " " + userData.lastname;

                                    }else{

                                        _data.displayName = userData.display_name;

                                    }

                                    state.accountInfo = {
                                        displayName: userData.firstname + " " + userData.lastname,
                                        email: userData.email,
                                        photoURL: userData.photo_url
                                    };

                                    let firebaseData = {};

                                    if(userData.display_name === null){

                                        firebaseData.displayName = userData.firstname + " " + userData.lastname;

                                    }else{

                                        firebaseData.displayName = userData.display_name;

                                    }

                                    firebaseData.phoneNumber = userData.phone_number;

                                    firebaseData.photoURL = userData.photo_url;

                                    firebaseData.uid = userData.uid;

                                    firebaseData.email = userData.user_email;

                                    state.user_info = _data;

                                    state.firebase_user_info = firebaseData;

                                    state.oauth.accessToken = serverResponse.access_token;

                                    state.loggedIn = true;

                                    const userInfo = {
                                        firebase: firebaseData,
                                        user: _data
                                    };

                                    data.callbackSuccess({status: "success", user_data: userInfo, rawUserData: userData, access_token: serverResponse.access_token});

                                }

                            }

                        }

                    }

                })
                .catch(function (error) {

                    let responseText = error.xhr.responseText;

                    let errorObject = {};

                    try{

                        responseText = JSON.parse(error.xhr.responseText);

                    } catch (e) {

                        //

                    } finally {

                        errorObject = {status: "error", code: error.xhr.status, message: error.xhr.statusText, response: responseText, raw: error.xhr};

                    }

                    console.warn(":: ERROR LOGIN / GETTING ACCESS TOKEN USER :2:", errorObject);

                    data.callbackError(errorObject);

                });

        },
        ajaxRegisterClient({ state, dispatch }, data) {

            const currentDomain = state.app.api.domains[state.app.api.currentDomainIndex];

            const url = `${currentDomain.protocol}://` + (currentDomain.subdomain ? currentDomain.subdomain + '.' : '') + `${currentDomain.domain}/${currentDomain.path === ''?'':currentDomain.path + '/'}${state.app.api.endpoints.clientRegister.path}`;

            let _data = data.deviceInfo;

            _data.publicKey = btoa(state.securityE2E.keys.publicKeys.device);

            const options = {
                "url": url,
                "method": state.app.api.endpoints.clientRegister.method,
                "timeout": state.app.api.endpoints.clientRegister.timeout,
                crossDomain: true,
                "headers": { },
                "data": _data,
                beforeSend: function (xhr) {
                },
                dataType: "text"
            };

            //console.log(":: REGISTER DEVICE SETTINGS ::", options);

            Framework7.request(options)
                .then(function (res) {

                    if(res.hasOwnProperty('data')){

                        if(res.data !== null){

                            try{

                                let serverResponse =JSON.parse(res.data);

                                //console.warn(":: REGISTER DEVICE :1:", serverResponse);

                                let serverPubKey = serverResponse.serverPubKey;

                                dispatch("setServerPublicKey", serverPubKey);

                                let clientToken = serverResponse.clientToken;

                                dispatch("setClientToken", clientToken);

                                let clientId = serverResponse.client_id;

                                encryptionService.decrypt(
                                    function (decryptedData) {

                                        console.log(":: CLIENT ID FROM SERVER DECRYPTED::", decryptedData);

                                        clientId = decryptedData;

                                        dispatch("setClientId", clientId);

                                    },
                                    function (errror) {

                                    },
                                    state.securityE2E.keys.privateKey,
                                    clientId,
                                );

                                let clientSecret = serverResponse.client_secret;

                                encryptionService.decrypt(
                                    function (decryptedData) {

                                        console.log(":: CLIENT SECRET FROM SERVER DECRYPTED::", decryptedData);

                                        clientSecret = decryptedData;

                                        dispatch("setClientSecret", clientSecret);

                                    },
                                    function (errror) {

                                    },
                                    state.securityE2E.keys.privateKey,
                                    clientSecret,
                                );

                                //clientId = decryptPrivateLong(atob(clientId), state.securityE2E.keys.privateKey);

                                //clientSecret = decryptPrivateLong(atob(clientSecret), state.securityE2E.keys.privateKey);

                                let grantType = serverResponse.grant_types;

                                dispatch("setGrantType", grantType);

                                if(data.hasOwnProperty("callbackSuccess")){

                                    if(typeof data.callbackSuccess === "function"){

                                        data.callbackSuccess({
                                            clientToken: clientToken,
                                            clientId: clientId,
                                            clientSecret: clientSecret,
                                            grantType: grantType,
                                            serverPubKey: serverPubKey
                                        });

                                    }

                                }

                            } catch (error){

                                console.warn(":: REGISTER DEVICE ERROR :1:", error);

                                data.callbackError({status: "error", message: "", error: error});

                            }

                        }

                    }

                })
                .catch(function (error) {

                    console.warn(":: REGISTER DEVICE ERROR :2:", error.xhr, error.status, error.message);

                    data.callbackError({status: "error", message: "", error: error});

                });

        },
        apiGetProducts({state}, product) {

            const currentDomain = state.app.api.domains[state.app.api.currentDomainIndex];

            const fetchUrl = `${state.app.api.protocol}://${currentDomain.subdomain}${currentDomain.subdomain === '' ? '' : '.'}${currentDomain.domain}${currentDomain.path}${state.app.api.endpoints.getProducts}`;

            console.log(":: GET PRODUCTS ::", fetchUrl);

            // fetch users from API
            fetch(fetchUrl)
                .then((res) => res.json())
                .then((users) => {
                    // assign new users to store state.users
                    state.users = [...state.users, users];
                });

        },
        apiGetFeeds({state}, feeds) {
            state.feeds = [...state.products, feeds];
        },
        apiGetBlog({state}, blog) {
            state.blog = [...state.blog, blog];
        },
        addProduct({state}, product) {
            state.products = [...state.products, product];
        },
        setProductsMenu({state}, products) {
            state.productsMenu = products;
        },
        addUserInfo({state}, data) {
            state.user_info = data;
        },
        addAccountInfo({state}, data) {
            state.accountInfo = data;
        },
        setAccountInfo({state, dispatch}, data) {
            state.accountInfo = data;
        },
        setFirebaseIsReady({state}, data) {
            state.firebaseIsReady = data;
        },
        setBiometricIsReady({state}, data) {
            state.biometricIsReady = data;
        },
        setBiometricType({state}, data) {
            state.biometricType = data;
        },
        setFirebaseUserData({state}, data) {

            state.firebase_user_info = data;

            const names = data.displayName.split(" ");

            state.user_info.firstname = names[0];
            state.user_info.lastname = names[1];
            state.user_info.email = data.email;
            state.user_info.phoneNumber = data.phoneNumber;

        },
        setUserInfo({state, dispatch}, data) {
            state.user_info = data;
            dispatch("saveUserInfo", data);
        },
        saveUserInfo({state}, callbackFunction) {
            capacitorStorage.setKey(
                'state.user_info',
                state.user_info,
                ( data ) => {
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        restoreUserInfo({state}, callbackFunction) {
            capacitorStorage.getKey(
                'state.user_info',
                ( data ) => {
                    state.user_info = data;
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        setSettings({state, dispatch}, data) {
            state.settings = data;
            dispatch("saveSettings", data);
        },
        saveSettings({state}, callbackFunction) {

            let _settings = state.settings;

            try{

                _settings = JSON.stringify(state.settings);

            } catch (e) {

                _settings = state.settings;

            }

            capacitorStorage.setKey(
                'state.settings',
                _settings,
                ( data ) => {
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        restoreSettings({state}, callbackFunction) {
            capacitorStorage.getKey(
                'state.settings',
                ( data ) => {
                    let _settings = data;
                    try{
                        _settings = JSON.parse(data);
                    } catch (e) {
                        _settings = data;
                    } finally {
                        state.settings = _settings;
                    }

                    if(typeof callbackFunction === "function"){
                        callbackFunction(_settings);
                    }
                }, 
                (error) => {

                }
            );
        },
        setDeviceInfo({state}, data) {
            state.device_info = data;
        },
        setDeviceKey({state}, data) {
            state.securityE2E.keys.deviceKey = data;
        },
        setDevicePrivateKey({state, dispatch}, data) {
            state.securityE2E.keys.privateKey = data;
            dispatch("saveDevicePrivateKey", data);
        },
        saveDevicePrivateKey({state}, callbackFunction) {
            capacitorStorage.setKey(
                'state.securityE2E.keys.privateKey',
                state.securityE2E.keys.privateKey,
                ( data ) => {
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        restoreDevicePrivateKey({state}, callbackFunction) {
            capacitorStorage.getKey(
                'state.securityE2E.keys.privateKey',
                ( data ) => {
                    state.securityE2E.keys.privateKey = data;
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        setDevicePublicKey({state, dispatch}, data) {
            state.securityE2E.keys.publicKeys.device = data;
            dispatch("saveDevicePublicKey", data);
        },
        saveDevicePublicKey({state}, callbackFunction) {
            capacitorStorage.setKey(
                'state.securityE2E.keys.publicKeys.device',
                state.securityE2E.keys.publicKeys.device,
                ( data ) => {
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        restoreDevicePublicKey({state}, callbackFunction) {
            capacitorStorage.getKey(
                'state.securityE2E.keys.publicKeys.device',
                ( data ) => {
                    state.securityE2E.keys.publicKeys.device = data;
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        setServerPublicKey({state, dispatch}, data) {
            state.securityE2E.keys.publicKeys.server = data;
            dispatch("saveServerPublicKey", data);
        },
        saveServerPublicKey({state}, callbackFunction) {
            capacitorStorage.setKey(
                'state.securityE2E.keys.publicKeys.server',
                state.securityE2E.keys.publicKeys.server,
                ( data ) => {
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        restoreServerPublicKey({state}, callbackFunction) {
            capacitorStorage.getKey(
                'state.securityE2E.keys.publicKeys.server',
                ( data ) => {
                    state.securityE2E.keys.publicKeys.server = data;
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        setServerFirebaseCloudMessagingToken({state}, data) {
            console.log(":: SAVING DEVICE TOKEN ::", data);
        },
        setFirebaseCloudMessagingToken({state, dispatch}, data) {
            state.securityE2E.tokens.FCM = data;
            dispatch("saveFirebaseCloudMessagingToken", data);
        },
        saveFirebaseCloudMessagingToken({state}, callbackFunction) {
            capacitorStorage.setKey(
                'state.securityE2E.tokens.FCM',
                state.securityE2E.tokens.FCM,
                ( data ) => {
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        restoreFirebaseCloudMessagingToken({state}, callbackFunction) {
            capacitorStorage.getKey(
                'state.securityE2E.tokens.FCM',
                ( data ) => {
                    state.securityE2E.tokens.FCM = data;
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        
        setAppUI({state}, data) {
            state.app.ui = data;
        },

        setAppUIViews({state}, data) {
            state.app.ui.views = data;
        },

        setAppUIPopups({state}, data) {
            state.app.ui.popups = data;
        },

        setAppUIPopovers({state}, data) {
            state.app.ui.popovers = data;
        },

        setAppContent({state}, data) {
            state.app.content = data;
        },

        setAppContentNiche({state}, data) {
            state.app.content.niche = data;
        },

        setAppContentEcommerce({state}, data) {
            state.app.content.ecommerce = data;
        },

        setAppContentListViews({state}, data) {
            state.app.content.listviews = data;
        },

        setAppContentListViewsDrawer({state}, data) {
            state.app.content.listviews.drawer = data;
        },

        setAppContentListViewsMessenger({state}, data) {
            state.app.content.listviews.messenger = data;
        },

        setAppDataVersion({state}, data) {
            state.app.version = data;
        },

        setAppAPI({state}, data) {
            state.app.api = data;
        },

        setAppAPIProtocol({state}, data) {
            state.app.api.protocol = data;
        },

        setAppAPICurrentDomainIndex({state}, data) {
            state.app.api.currentDomainIndex = data;
        },

        setAppAPIDomains({state}, data) {
            state.app.api.domains = data;
        },

        setAppAPIEndpoints({state}, data) {
            state.app.api.endpoints = data;
        },

        setSocialAccountsArray({state}, data) {
            state.app.socialAccountsArray = data;
        },

        setLoggedIn({state}, data) {
            state.loggedIn = data;
        },
        setIsSigningIn({state}, data) {
            state.isSigningIn = data;
        },
        setIsSigningUp({state}, data) {
            state.isSigningUp = data;
        },
        setHasAccessToken({state}, data) {
            state.hasAccessToken = data;
        },
        setClientAccessToken({state, dispatch}, data) {
            state.oauth.accessToken = data;
            dispatch("saveClientAccessToken", data);
        },
        saveClientAccessToken({state}, callbackFunction) {
            capacitorStorage.setKey(
                'state.oauth.accessToken',
                state.oauth.accessToken,
                ( data ) => {
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        restoreClientAccessToken({state}, callbackFunction) {
            capacitorStorage.getKey(
                'state.oauth.accessToken',
                ( data ) => {
                    state.oauth.accessToken = data;
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        setClientAccessTokenPayload({state, dispatch}, data) {
            state.oauth.accessTokenPayload = data;
            dispatch("saveClientAccessTokenPayload", data);
        },
        saveClientAccessTokenPayload({state}, callbackFunction) {
            capacitorStorage.setKey(
                'state.oauth.accessTokenPayload',
                state.oauth.accessTokenPayload,
                ( data ) => {
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        restoreClientAccessTokenPayload({state}, callbackFunction) {
            capacitorStorage.getKey(
                'state.oauth.accessTokenPayload',
                ( data ) => {
                    state.oauth.accessTokenPayload = data;
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        setClientRefreshToken({state, dispatch}, data) {
            state.oauth.refreshToken = data;
            dispatch("saveClientRefreshToken", data);
        },
        saveClientRefreshToken({state}, callbackFunction) {
            capacitorStorage.setKey(
                'state.oauth.refreshToken',
                state.oauth.refreshToken,
                ( data ) => {
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        restoreClientRefreshToken({state}, callbackFunction) {
            capacitorStorage.getKey(
                'state.oauth.refreshToken',
                ( data ) => {
                    state.oauth.refreshToken = data;
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        setClientToken({state, dispatch}, data) {
            state.oauth.clientToken = data;
            dispatch("saveClientToken", data);
        },
        saveClientToken({state}, callbackFunction) {
            capacitorStorage.setKey(
                'state.oauth.clientToken',
                state.oauth.clientToken,
                ( data ) => {
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        restoreClientToken({state}, callbackFunction) {
            capacitorStorage.getKey(
                'state.oauth.clientToken',
                ( data ) => {
                    state.oauth.clientToken = data;
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        setClientId({state, dispatch}, data) {
            state.oauth.clientId = data;
            dispatch("saveClientId", data);
        },
        saveClientId({state}, callbackFunction) {
            capacitorStorage.setKey(
                'state.oauth.clientId',
                state.oauth.clientId,
                ( data ) => {
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        restoreClientId({state}, callbackFunction) {
            capacitorStorage.getKey(
                'state.oauth.clientId',
                ( data ) => {
                    state.oauth.clientId = data;
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        setClientSecret({state, dispatch}, data) {
            state.oauth.clientSecret = data;
            dispatch("saveClientSecret", data);
        },
        saveClientSecret({state}, callbackFunction) {
            capacitorStorage.setKey(
                'state.oauth.clientSecret',
                state.oauth.clientSecret,
                ( data ) => {
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        restoreClientSecret({state}, callbackFunction) {
            capacitorStorage.getKey(
                'state.oauth.clientSecret',
                ( data ) => {
                    state.oauth.clientSecret = data;
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        setGrantType({state, dispatch}, data) {
            state.oauth.grantType = data;
            dispatch("saveGrantType", data);
        },
        saveGrantType({state}, callbackFunction) {
            capacitorStorage.setKey(
                'state.oauth.grantType',
                state.oauth.grantType,
                ( data ) => {
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
        restoreGrantType({state}, callbackFunction) {
            capacitorStorage.getKey(
                'state.oauth.grantType',
                ( data ) => {
                    state.oauth.grantType = data;
                    if(typeof callbackFunction === "function"){
                        callbackFunction(data);
                    }
                }, 
                (error) => {

                }
            );
        },
    },
})

export default AppState;
