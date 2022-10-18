import { Dovellous } from "./dovellous";
import { K } from "./src/libraries/app/helpers";
import { Snippets } from "./src/libraries/app/helpers";
import { StorageIM } from "./src/modules/im/store/im-store";
import { StorageContacts } from "./src/modules/im/store/contacts-store";

import moment from "moment";

import Dom7 from "dom7";

import './assets/styles/main.scss';

/**
 * Dovellous F7 Plugin for Framework7 1.0.0
 * Dovellous F7 Plugin extends Framework7 with modules for instant messaging and calls
 * https://apps.dovellous.com/plugins/f7
 *
 * Copyright 2014-2022 Dovellous
 *
 * Released under the MIT License
 *
 * Released on: July 29, 2022
 */

const Framework7DovellousPlugin = {

  // Module Name
  name: "Framework7 Dovellous Plugin",
  /* Install callback
  It will be executed right after component is installed
  Context of this callback points to Class where it was installed
  */
  install() {
    const Class = this;
  },
  /* Create callback
  It will be executed in the very beginning of class initilization (when we create new instance of the class)
  */
  create() {

    const app = this;
    const $ = app.$;
    // extend app methods with debugger methods when app instance just created

    const dovellousInstance = new Dovellous(app);

    app.dovellous = {
      konstants: K,
      helpers: Snippets,
      instance: dovellousInstance,
      enableDebug: function () {
        app.params.dovellous.debugger = true;
      },
      disableDebug: function () {
        app.params.dovellous.debugger = false;
      },
      appInstance: app,
    };

  },
  /*
  Object with default class/plugin parameters
  */
  params: {
    dovellous: {
      debugger: true,
      agora: {
        appId: K.Env.AGORA_APP_ID,
        primaryCertificate: K.Env.AGORA_PRIMARY_CERTIFICATE,
        clientMode: K.Env.AGORA_CLIENT_MODE,
        clientCodec: K.Env.AGORA_CLIENT_CODEC,
        imCallConfig: {
          audioSettings: K.Env.AGORA_AUDIO_SETTINGS_ENCODING_PRESET || 
            {
                sampleRate:  parseInt(K.Env.AGORA_AUDIO_SAMPLE_RATE),
                stereo: Snippets.strings.isBooleanTrue(K.Env.AGORA_AUDIO_STEREO),    
                bitrate: parseInt(K.Env.AGORA_AUDIO_BITRATE),
            },
          localAudioTrack: {
            volume: parseInt(K.Env.AGORA_LOCAL_AUDIO_TRACK_VOLUME),
          },
          remoteAudioTrack: {
            volume: parseInt(K.Env.AGORA_REMOTE_AUDIO_TRACK_VOLUME),
          },
          videoSettings: K.Env.AGORA_VIDEO_SETTINGS_ENCODING_PRESET || 
            {
              width: { 
                ideal: Math.ceil(parseInt(K.Env.AGORA_VIDEO_SETTINGS_ENCODING_WIDTH)*.75), 
                min: Math.ceil(parseInt(K.Env.AGORA_VIDEO_SETTINGS_ENCODING_WIDTH)*.5), 
                max: Math.ceil(parseInt(K.Env.AGORA_VIDEO_SETTINGS_ENCODING_WIDTH)),
              },
              height: { 
                ideal: Math.ceil(parseInt(K.Env.AGORA_VIDEO_SETTINGS_ENCODING_HEIGHT)*.75), 
                min: Math.ceil(parseInt(K.Env.AGORA_VIDEO_SETTINGS_ENCODING_HEIGHT)*.5), 
                max: Math.ceil(parseInt(K.Env.AGORA_VIDEO_SETTINGS_ENCODING_HEIGHT)),
              },
              frameRate:  parseInt(K.Env.AGORA_VIDEO_SETTINGS_ENCODING_FRAMERATE),
              bitrateMin: parseInt(K.Env.AGORA_VIDEO_SETTINGS_ENCODING_BIT_MIN), 
              bitrateMax: parseInt(K.Env.AGORA_VIDEO_SETTINGS_ENCODING_BIT_MAX),
          }
        }
      },
      firebase : {
				apiKey: K.Env.FIREBASE_API_KEY,
				authDomain: K.Env.FIREBASE_AUTH_DOMAIN,
				projectId: K.Env.FIREBASE_PROJECT_ID,
				storageBucket: K.Env.FIREBASE_STORAGE_BUCKET,
				messagingSenderId: K.Env.FIREBASE_MESSAGING_SENDER_ID,
				appId: K.Env.FIREBASE_APP_ID,
				measurementId: K.Env.FIREBASE_MEASUREMENT_ID
			},
    },
  },
  /* Initialized instance Props & Methods */
  instance: {
    dovellousKonstants: K,
    dovellousHelpers: Snippets,
    dovellousConsole(output: string | boolean | null, ...args: any) {

      const app = this;

      if (app.params.dovellous.debugger) {

        if (output && output !== null) {

          const time = moment().format(`[${output?.toString().toUpperCase()}] :: YYYY-MM-DD, H:mm:ss :: `);

          switch (output.toString().toLowerCase()) {

            case 'error': {
              console.error(time, args);
              break;
            }

            case 'warn': {
              console.warn(time, args);
              break;
            }

            case 'log': {
              console.log(time, args);
              break;
            }

            case 'info': {
              console.info(time, args);
              break;
            }

            default: {
              console.log(time, args);
              break;
            }

          }

        }else{
          console.log(args);
        }

      }

    },
    dovellousEventsOn(eventName: string, eventCallBackFunction: any) {
      
      const app = this;
      app.on(eventName, eventCallBackFunction);

    },
    dovellousEventsEmit(eventName: string, eventDetail: any) {
      
      const app = this;
      app.emit(eventName, eventDetail);

    },
    dovellousDomSelector(el: string) {
      
      return Dom7(el);

    },
  },
  /* Event handlers */
  on: {
    init: function () {

      var app = this;

      app.dovellousConsole("log","app init");

      app.emit('DOVELLOUS_READY', app.params.dovellous);

    },
    pageBeforeIn: function (page: any) {
      const app = page.app;
      const $ = app.$;
      app.dovellousConsole("log","pageBeforeIn", page);
    },
    pageAfterIn: function (page: any) {
      const app = page.app;
      const $ = app.$;
      app.dovellousConsole("log","pageAfterIn", page);
    },
    pageBeforeOut: function (page: any) {
      const app = page.app;
      const $ = app.$;
      app.dovellousConsole("log","pageBeforeOut", page);
    },
    pageAfterOut: function (page: any) {
      const app = page.app;
      const $ = app.$;
      app.dovellousConsole("log","pageAfterOut", page);
    },
    pageInit: function (page: any) {
      const app = page.app;
      const $ = app.$;
      app.dovellousConsole("log","pageInit", page);
    },
    pageBeforeRemove: function (page: any) {
      const app = page.app;
      const $ = app.$;
      app.dovellousConsole("log","pageBeforeRemove", page);
    },
  },
  /* Handle clicks */
  clicks: {
    // prop name means CSS selector of element to add click handler
    p: (_$clickedEl: any, data: any): void => {
      // $clickedEl: Dom7 instance of clicked element
      // data: element data set (data- attributes)
    },
  },
};

export { Framework7DovellousPlugin as default, K, Snippets, StorageIM, StorageContacts };
