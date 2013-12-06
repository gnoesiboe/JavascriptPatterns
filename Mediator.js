"use strict";

/**
 * Mediator pattern
 */

var mediator = (function() {
  
  var items = {};
  
  return {
    add: function(identifier, callback) {
      if (typeof items[identifier] === 'undefined') {
        items[identifier] = [];
      }
      
      items[identifier].push(callback);
    },
    
    broadcast: function(identifier, params) {
      if (typeof items[identifier] === 'undefined') {
        return false;
      }
      
      var callbacks = items[identifier];
      
      for (var i = 0, l = callbacks.length; i < l; i++) {
        var callback = callbacks[i];
        
        callback.apply(this, params);
      }
    }
  }
})();

mediator.add('something', function() {
  console.log('first call!')
});

mediator.add('something', function() {
  console.log('second call!')  
});

mediator.broadcast('something'); // output: 'first call!' and 'second call!'