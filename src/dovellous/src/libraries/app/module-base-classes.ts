/* Simple JavaScript Inheritance
 * By John Resig https://johnresig.com/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype

// The base Class implementation (does nothing)
const Class = function() {};

(function() {

	let initializing = false;
	
	const fnTest = /xyz/.test(()=>{ xyz; }) ? /\b_super\b/ : /.*/;

	// Create a new Class that inherits from this class
	Class["extend"] = function(prop: any) {

		let _super = this.prototype;

		// Instantiate a base class (but only create the instance,
		// don't run the init constructor)
		initializing = true;
		let prototype = new this();
		initializing = false;

		// Copy the properties over onto the new prototype
		for (let name in prop) {
			// Check if we're overwriting an existing function
			prototype[name] =
				typeof prop[name] == "function" &&
				typeof _super[name] == "function" &&
				fnTest.test(prop[name]) ?
				(function(name, fn) {
					return function() {
						let tmp = this._super;

						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = _super[name];

						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						let ret = fn.apply(this,
							arguments);
						this._super = tmp;

						return ret;
					};
				})(name, prop[name]) :
				prop[name];
		}

		// The dummy class constructor
		function Class() {
			// All construction is actually done in the init method
			if (!initializing && this.init) this.init.apply(
				this, arguments);
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

// Class Library Events

// Parent constructor
class DovellousEvent {
	eventName: any;
	constructor(_eventName: any) {
		this.eventName = _eventName;
	}
	/**
	 * Event dispatcher template:
	 * param object data
	 * return null
	 */
	dispatch(name: string, data: any) {
		// Dispatch the event
		window.dispatchEvent(new CustomEvent(name, {
			detail: data
		}));
	}
}


// Child constructor
class DovellousLibraryEvent {
	constructor(eventName: any) {
		// Call parent constructor with proper arguments
		new DovellousEvent(eventName);
	}
}

// Inheritance
//DovellousLibraryEvent.prototype = Object.create(DovellousEvent.prototype);

Object.setPrototypeOf(DovellousLibraryEvent.prototype, DovellousEvent);

function DovellousEventDispatcher(DovellousEventItems: { [x: string]: { [x: string]: any; }; }){

	Object.keys(DovellousEventItems).map((objKey, objIndex) => {

		Object.keys(DovellousEventItems[objKey]).map((key, index) => {
			/**
			 *
			 * @returns {*}
			 * @constructor
			 */
			DovellousLibraryEvent.prototype[DovellousEventItems[objKey][key]] = (
				data: any, 
				f7: { emit: (arg0: any, arg1: any) => void; }
			) => {

				if(f7){

					f7.emit(DovellousEventItems[objKey][key], data);

				}
				
				// Call parent method
				return DovellousEvent.prototype.dispatch.call(
					this, 
					DovellousEventItems[objKey][key], 
					data
				);

			};

		});

	});

}

export {Class, DovellousEvent, DovellousLibraryEvent, DovellousEventDispatcher}