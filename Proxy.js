"use script";

/**
 * Create a simple object with a callback function
 */

var someObject = {
  doSomething: function(callback) {
    var firstArgument = 'first',
        secondArgument = 'second';
    
    callback(firstArgument, secondArgument);
  }
};


/**
 * Create proxy
 */ 

var util = {
  createProxy: function(callback, context) {
    return function() {
      callback.apply(context, arguments);
    };
  }
};


/**
 * Test
 */

var otherObject = {
  callSomeObject: function() {
    someObject.doSomething(this.onCallback);
    someObject.doSomething(util.createProxy(this.onCallback, this));
  },
  
  onCallback: function() {
    console.log(this === otherObject, arguments);
  }
};


otherObject.callSomeObject();

/**
 * output:
 *
 * false { '0': 'first', '1': 'second' }
 * true { '0': 'first', '1': 'second' }
 */
