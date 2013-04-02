/**
 * Promotes loose coupling. Each component can exist without difficult dependencies 
 * of other components. Communication can however be achieved using this pattern.
 * Arguably, the largest benefit of using the Observers is the ability to break down 
 * your applications into smaller, more loosely coupled modules, which can also improve
 * general manageability.
 * 
 * @return {Object}
 */
var observer = (function() {

  /**
   * @type {Object}
   */
  var _subscribers = {};
  var _tokenCounter = 0;

  return {
  
    /**
     * @param {String} event    Name of the Event
     * @param {Object} params   Params that are send to all listeners
     * 
     * @return {Object}
     */
    publish: function(event, params) {
      if (!_subscribers[event]) {
        throw new Error('This publisher doesn\'t publish the event: ' + Event);
      }
      
      var subscribers = _subscribers[event];
      var l = subscribers ? subscribers.length : 0;

      while (l--) {
        subscribers[l].func(event, args);
      }
      
      return this;
    },
    
    /**
     * @param {String} event          Name of the event to subscribe to
     * @param {Function} callback     Function that is called when the event is fired
     *
     * @return {String}               Returns a token that can be used to unsubscribe
     */
    subscribe: function(event, callback) {
      if (!_subscribers[event]) {
        _subscribers[event] = [];
      }
      
      var token = (_tokenCounter).toString();
      _subscribers[event].push({
        token:    token,
        callback: callback        
      });
      
      _tokenCounter++;
      return _token;
    },
    
    /**
     * @param {String} token
     * @return {Object}
     */
    unsubscribe: function(token) {
      for (var m in _subscribers) {
        if (_subscribers[m]) {
          for ( var i = 0, j = _subscribers[m].length; i < j; i++ ) {
            if ( _subscribers[m][i].token === token) {
              _subscribers[m].splice( i, 1 );
              return this;
            }
          }
        }
      }
      
      throw new Error('No subscriber exists with token: ' + token); 
    }
  };
})();

var subscriber = observer.subscribe('inbox/newMessage', function(params) {
  console.log('published!');
});

observer.publish();