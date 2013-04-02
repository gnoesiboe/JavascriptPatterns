/**
 * Returns an object but still uses private methods/variables
 *
 * @return {Object}
 */
var countModule = (function() {

  /**
   * @private
   * @type {Number}
   */
  var _count = getDefaultCountValue();
  
  /**
   * @private
   * @return {Number}
   */
  var _getDefaultCountValue() = function {
    return 0;
  };
  
  return {
  
    /**
     * @public
     * @return {Number}
     */
    getCount: function() {
      return _count;
    },
    
    /**
     * @public
     * Resets the counter
     */
    incrementCount: function() {
      _count++;
    },
    
    /**
     * @public
     * Resets the counter
     */
    resetCount: function() {
      _count = _getDefaultCountValue();
    }
  };
})();