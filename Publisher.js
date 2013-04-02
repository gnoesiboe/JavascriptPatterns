// var _ = require('/lib/underscore/underscore')._;

/**
 * @type {Object}
 */
var Publisher = (function() {

  /**
   * @private
   * @type {Object}
   */
  var _callbacks = {};

  /**
   * @private
   * @param {String} identifier
   * @return {Boolean}
   */
  var _hasEvent = function(identifier) {
    return _callbacks.hasOwnProperty(identifier);
  };

  /**
   * @private
   * @param {Function} callback
   * @throws {Error}
   */
  var _validateCallbackValid = function(callback) {
    if (_.isFunction(callback) === false) {
      throw new Error('A function should be supplied as event callback');
    }
  };

  return {

    /**
     * @param {string} identifier     Event identifier
     * @param {Function} callback     Callback function that needs to be fired once the event is triggered
     * @param {Object} context        Context in which the callback function needs to be run once the event is triggered
     *
     * @return Publisher
     */
    addEventListener: function (identifier, callback, context) {
      _validateCallbackValid(callback);

      if (_hasEvent(identifier) === false) {
        _callbacks[identifier] = [];
      }

      _callbacks[identifier].push({
        callback: callback,
        context: context
      });

      // console.log(_callbacks[identifier]);

      return this;
    },

    /**
     * @param identifier
     * @param callback
     * @param context
     *
     * @return Publisher
     */
    removeEventListener: function (identifier, callback, context) {
      _validateCallbackValid(callback);

      if (_hasEvent(identifier) === false) {
        return this;
      }

      for (var i = 0, l = _callbacks[identifier].length; i < l; i++) {
        item = _callbacks[identifier][i];

        if (item.callback === callback && item.context === context) {
          delete _callbacks[identifier][i];
        }
      }

      // delete leaves empty (type = 'undefined') array values, remove the empty values
      _callbacks[identifier] = _callbacks[identifier].filter(function() {
        return true;
      });

      return this;
    },

    /**
     * @param {String} identifier
     *
     * @return Publisher
     */
    trigger: function (identifier, params) {
      if (_hasEvent(identifier) === false) {
        return this;
      }

      var callbacks = _callbacks[identifier],
          item = null;

      for (var i = 0, l = callbacks.length; i < l; i++) {
        item = callbacks[i];

        item.callback.apply(item.context || this, params);
      }

      return this;
    }
  };
})();

var myObject = {
  test: 'eigen property',

  callback: function() {
    console.log('Ik ben er! ' + this.test);
  }
};

var looseCallback = function() {
  console.log('Nu ben ik hier! ' + (this === Publisher));
};

Publisher.addEventListener('click', myObject.callback, myObject);
Publisher.addEventListener('click', looseCallback);
Publisher.addEventListener('click', looseCallback);
// Publisher.removeEventListener('click', myObject.callback, myObject);
// Publisher.subscribe('click'); // Uncaught Error: A function should be supplied as event callback

Publisher.trigger('click');