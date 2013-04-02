/**
 * @return {Object}
 */
var Singleton = (function() {

  /**
   * @type {Singleton}
   */ 
  var instance = null;
  
  /**
   * @return {Object}
   */
  function init() {
    return {
      publicMethod: function() {
        console.log('this is a public method');
      },
      
      publicProperty: 'public property'
    };
  }
  
  return {
    getInstance: function() {
      if (instance === null) {
        instance = init();
      }
      return instance;
    }
  };
})();

var firstSingletonInstance = Singleton.getInstance();
var secondSingletonInstance = Singleton.getInstance();

console.log(firstSingletonInstance === secondSingletonInstance); // logs 'true'