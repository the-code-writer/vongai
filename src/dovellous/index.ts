import { Dovellous } from "./dovellous";
import { K, Snippets } from "./src/libraries/app/helpers";

/**
 * Dovellous F7 Plugin for Framework7 1.0.0
 * Keypad plugin extends Framework7 with additional custom keyboards
 * http://dovellous.com/f7/plugins/
 *
 * Copyright 2014-2022 Dovellous
 *
 * Released under the MIT License
 *
 * Released on: July 29, 2022
 */

const DovellousF7Plugin = {
  // Module Name
  name: "demo-module",
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
    var app = this;
    // extend app methods with debugger methods when app instance just created

    const dovellousLibs = new Dovellous(app, app.params.dovellous.modules);

    app.dovellous = {
      k: K,
      snippets: Snippets,
      libs: dovellousLibs,
      enableDebug: function () {
        app.params.dovellous.debugger = true;
      },
      disableDebug: function () {
        app.params.dovellous.debugger = false;
      },
    };
  },
  /*
  Object with default class/plugin parameters
  */
  params: {
    dovellous: {
      debugger: true,
      modules: {
        agora: { 
          appId: '',
          primaryCertificate: '',
          channels: '',
          tokens: '',
          voiceCall: '',
          videoCall: '',
          instantMessaging: '',
          liveStreaming: '',
          whiteBoard: ''
        }
      },
    },
  },
  /* proto object extends Class prototype */
  proto: {
    demoDF7() {
      return "demo-module-proto-method";
    },
    demoStaticDF7: "demo-module-proto-static",
  },
  // Extend Class with static props and methods, e.g. Class.myMethod
  static: {
    demoSTATICF7() {
      return "demo-module-class-method";
    },
    demoStaticSTATICF7: "demo-module-class-static",
  },
  /* Initialized instance Props & Methods */
  instance: {
    demoPropF7: true,
    demoMethodF7() {
      return "demo-method";
    },
  },
  /* Event handlers */
  on: {
    demoEventF7(a, b) {
      console.log("demo-event", a, b);
    },
    init: function () {
      var app = this;
      if (app.params.dovellous.debugger) console.log("app init");
    },
    pageBeforeIn: function (page) {
      const $ = page.app.$;
      const app = page.app;
      if (app.params.dovellous.debugger) console.log("pageBeforeIn", page);
    },
    pageAfterIn: function (page) {
      const $ = page.app.$;
      const app = page.app;
      if (app.params.dovellous.debugger) console.log("pageAfterIn", page);
    },
    pageBeforeOut: function (page) {
      const $ = page.app.$;
      const app = page.app;
      if (app.params.dovellous.debugger) console.log("pageBeforeOut", page);
    },
    pageAfterOut: function (page) {
      const $ = page.app.$;
      const app = page.app;
      if (app.params.dovellous.debugger) console.log("pageAfterOut", page);
    },
    pageInit: function (page) {
      const $ = page.app.$;
      const app = page.app;
      if (app.params.dovellous.debugger) console.log("pageInit", page);
    },
    pageBeforeRemove: function (page) {
      const $ = page.app.$;
      const app = page.app;
      if (app.params.dovellous.debugger) console.log("pageBeforeRemove", page);
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

export { DovellousF7Plugin as default };
