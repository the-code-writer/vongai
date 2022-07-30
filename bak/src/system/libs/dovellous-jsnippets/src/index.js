/* Simple JavaScript Inheritance
 * By John Resig https://johnresig.com/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function () {
  let initializing = false, fnTest = /xyz/.test(function () {
    xyz;
  }) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function () {
  };

  // Create a new Class that inherits from this class
  Class.extend = function (prop) {
    let _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    let prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (let name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
      typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function (name, fn) {
          return function () {
            let tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            let ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if (!initializing && this.init)
        this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
})();

const DovellousJSnippets = Class.extend({

  init: function (events, options) {

    let self = this;

    this.events = events;

    this.jSnippets.params = self;

    this.jSnippets.test.init(this, options);


  },
  jSnippets: (function () {

    let parent = {

      isLoaded: false,

      params: null,

      test: {

        isReady: false,

        params: {
          foo: "MODULE_BAR",
        },

        init: (app, options) => {

          parent.test.params.options = options;

          parent.params.events.OnJSnippetsReady([app, parent.test.params]);

          //console.log(":: PARAMS ::", parent.test.params);

        },

        helloWorld: async function () {

          return parent.test.params;

        },

      },
    };

    return parent;

  })()

});


// Parent constructor
function DovellousJSnippetsEvent(name) {
  this.name = name;
}

/**
 * Event dispatcher template:
 * param object data
 * return null
 */
DovellousJSnippetsEvent.prototype.dispatch = function (name, data) {

  // Dispatch the event
  window.dispatchEvent(new CustomEvent(name, {detail: data}));

};

// Child constructor
function DovellousJSnippetsApplicationEvent(name) {

  this.ON_DOVELLOUS_SNIPPETS_READY = "ON_DOVELLOUS_SNIPPETS_READY";

  // Call parent constructor with proper arguments
  DovellousJSnippetsEvent.call(this, name);

}

// Inheritance
DovellousJSnippetsApplicationEvent.prototype = Object.create(DovellousJSnippetsEvent.prototype);
DovellousJSnippetsApplicationEvent.prototype.constructor = DovellousJSnippetsApplicationEvent;

/**
 *
 * @returns {*}
 * @constructor
 */
DovellousJSnippetsApplicationEvent.prototype.OnJSnippetsReady = function (data) {
  // Call parent method
  let name = this.ON_DOVELLOUS_SNIPPETS_READY;
  return DovellousJSnippetsEvent.prototype.dispatch.call(this, name, data);
};

/**
 *
 * @type {DovellousJSnippetsApplicationEvent}
 */
const dovellousJSnippetsApplicationApiEvent = new DovellousJSnippetsApplicationEvent("dovellousJSnippetsApplicationEvent");

const initDovellousJSnippets = (options) => {

  /**
   * @type {DovellousJSnippets}
   */
  return new DovellousJSnippets(dovellousJSnippetsApplicationApiEvent, options);

}
