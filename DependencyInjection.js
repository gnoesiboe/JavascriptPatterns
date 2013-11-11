/**
 * Simple service container
 *
 * @type {Object}
 */
var serviceContainer = (function() {
  
  /**
   * @type {Object}
   */
  var services = {};
  
  /**
   * @param {Function} target
   * @return {Array}
   */
  var parseFunctionArguments = function(target) {
    var stripCommentsRegex = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
        parseArgumentsRegex = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
        toArrayRegex = /,\s*/m;
    
    return target.toString()
      .replace(stripCommentsRegex, '')
      .match(parseArgumentsRegex)[1]
      .split(toArrayRegex)
    ;
  };
 
  /**
   * @param {String} key
   * @throws {Error}
   */
  var validateKeyIsString = function(key) {
    if (toString.call(key) != '[object String]') {
      throw new Error('Key should be a String');
    }
  };
  
  /**
   * @param {Function|Object} service
   * @throws {Error}
   */
  validateServiceIsFunctionOrObject = function(service) {
    if (toString.call(service) != '[object Function]' && service !== Object(service)) {
      throw new Error('Service should either be a function or an Object');
    }
  };
  
  /**
   * Gathers the list of required services
   *
   * @param {Array} list
   */
  var gatherServices = function(list) {
    return list.map(function(key) {
      console.log('gather dependency: ' + key);
      return publicInterface.get(key);
    });
  };
  
  /**
   * @param {String} key
   * @throws {Error}
   */
  var validateHas = function(key) {
    if (publicInterface.has(key) === false) {
      throw new Error('No service with key: \'' + key + '\'');
    }
  }
  
  // return public interface
  return publicInterface = {
    
    /**
     * @param {String} key
     * @param {Function|Object} service
     */
    register: function(key, service) {
      validateKeyIsString(key);
      validateServiceIsFunctionOrObject(service);
      
      services[key] = service;
    },
    
    /**
     * @param {String} key
     * @return {Function|Object}
     */
    get: function(key) {
      validateHas(key);
      
      return services[key];
    },
    
    /**
     * @param {String} key
     */
    has: function(key) {
      validateKeyIsString(key);
      return services.hasOwnProperty(key);
    },
    
    /**
     * Supplies a function with it's dependencies
     * from this container and executes it.
     *
     * @param {Function} target
     */
    process: function(target) {
      target.apply(target, gatherServices(parseFunctionArguments(target)));
    }
  }
})();


/////// REGISTER DEPENDENCIES //////////

serviceContainer.register('first', {
  title: 'first dependency'
});

serviceContainer.register('second', {
  title: 'second dependency'
});



/////// EXECUTE TEST //////////

var myModule = serviceContainer.process(function(/* first item */ first, /* second item */ second) {
  console.log('I got my dependencies: ', first, second);
});