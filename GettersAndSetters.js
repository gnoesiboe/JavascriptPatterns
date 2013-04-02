/**
 * @type {Object}
 */
var myObject = (function() {

  /**
   * @private
   * @type {String}
   */
  var _value = 'test';

  /**
   * Return value of this self executed function
   *
   * @private
   * @type {Object}
   */
  var _return = {};

  Object.defineProperty(_return, 'eerste', {
    get:        function() {
      return _value;
    },
    set:       function(value) {
      _value = value + ' anders';
    }
  });

  return _return;
})();

console.log(myObject);

console.log('voor:    ' + myObject.eerste);

myObject.eerste = 'nog wat';

console.log('na:      ' + myObject.eerste);