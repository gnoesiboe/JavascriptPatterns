"use strict";

/**
 * @type {Function}
 * @Constructor
 *
 * @param {Function} creator
 * @param {Boolean} doCache
 */
var Service = function(creator, doCache) {
  var validateIsFunction = function(creator) {
    if (toString.call(creator) != '[object Function]') {
      throw new Error('Creator should be of type Function');
    }
  };
  
  validateIsFunction(creator);
  
  this.creator = creator;
  this.doCache = doCache !== false;
};

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
   * @type {Object}
   */
  var cache = {};
  
  /**
   * @param {Function} target
   * @return {Array}
   */
  var parseFunctionArguments = function(target) {
    var stripCommentsRegex = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
        parseArgumentsRegex = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
        toArrayRegex = /,\s*/m;
        
    var argsString = target.toString()
      .replace(stripCommentsRegex, '')
      .match(parseArgumentsRegex)[1];
      
    if (argsString.length === 0) {
      return [];
    }
    
    return argsString.split(toArrayRegex);
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
  var validateServiceIsService = function(service) {
    if ((service instanceof Service) === false) {
      throw new Error('Service should be an instanceof of Service');
    }
  };
  
  /**
   * Gathers the list of required services
   *
   * @param {Array} list
   */
  var gatherServices = function(list) {
    return list.map(function(key) {
      return pi.get(key);
    });
  };
  
  /**
   * @param {String} key
   * @throws {Error}
   */
  var validateHas = function(key) {
    if (pi.has(key) === false) {
      throw new Error('No service with key: \'' + key + '\'');
    }
  };
  
  /**
   * @param {Function} target
   * @throws {Error}
   */
  var validateTargetIsFunction = function(target) {
     if (toString.call(target) != '[object Function]') {
        throw new Error('Target should be of type Function');
     }
  };
  
  // define the public interface
  var pi = {
    
    /**
     * @param {String} key
     * @param {Function|Object} service
     */
    registerModule: function(key, service) {
      validateKeyIsString(key);
      validateServiceIsService(service);
      
      services[key] = service;
    },
    
    /**
     * @param {String} key
     * @return {Function|Object}
     */
    get: function(key) {
      validateHas(key);
      
      var service = services[key],
          generatedService = null;
      
      if (service.doCache === true) {
        if (cache.hasOwnProperty(key) === true) {
          return cache[key];
        }
        else {
           cache[key] = this.process(service.creator);
           return cache[key]; 
        }
      }
      else {
        // no cache
        
        return this.process(service.creator);
      }
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
      validateTargetIsFunction(target);
      
      return target.apply(target, gatherServices(parseFunctionArguments(target)));
    }
  };
  
  return pi;
})();


/////// REGISTER DEPENDENCIES //////////

serviceContainer.registerModule('first', new Service(function(second) {
  console.log('I am the first module. I got my dependency: ', second);
  
  return {
    title: 'first dependency'
  };
}, true));

serviceContainer.registerModule('second', new Service(function() {
  console.log('I am the second module. I got no dependencies');
  
  return {
    title: 'second dependency'
  }
}, false));



/////// EXECUTE TEST //////////

var myTest = serviceContainer.process(function(first, second) {
  console.log('I am myTest. I got my dependencies: ', first, second);
  
  console.log('First is cached (\'singleton\'): ', first === serviceContainer.get('first'));
  console.log('Second is cached (\'singleton\'): ', second === serviceContainer.get('second'));
});