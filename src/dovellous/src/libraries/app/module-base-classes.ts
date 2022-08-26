type DovellousModuleOptions = {
	alive: boolean;
	age: number;
  };
  
  class DovellousModule {
	id: string;
	options: DovellousModuleOptions;
  
	constructor() {
  
	  this.id = "_" + Math.random();
  
	  this.options = {
		alive: true,
		age: 25,
	  };
  
	}
  }
  
  
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
  
  export {
	DovellousModule, 
	DovellousModuleOptions, 
	DovellousEvent, 
	DovellousLibraryEvent, 
	DovellousEventDispatcher
}
  