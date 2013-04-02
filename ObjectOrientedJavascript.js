/**
 * object access. Only private and public, there is no protected
 */
(function() {

  /**
   * This variable holds a self executing function that returns a
   * public interface, but has access to all private functions
   * within. Also called the 'module pattern'.
   *
   * @type {Object}
   */
  var myObject = (function() {

    /**
     * @private
     * @type {String}
     */
    var _something = null;

    /**
     * @private
     */
    var _doSomethingWithIt = function() {
      _something += ' with something else';
    };

    // return the public interface
    return {

      /**
       * @returns {String}
       */
      getSomething: function() {
        _doSomethingWithIt();
        return _something;
      },

      /**
       * @param {String} value
       */
      setSomething: function(value) {
        _something = value;
      }
    };
  })();

  myObject.setSomething('something');
  console.log(myObject.getSomething());
  console.log(myObject);
})();

console.log('------------------');

/**
 * the apply() and call() functionality makes it possible to re-use
 * functions in different contexts.
 */
(function() {

  var myFirstObject = {
    _value: 'my first object value',

    getValue: function(addition, secondAddition) {
      return this._value + ' - ' + addition + ' - ' + secondAddition;
    }
  };

  console.log(myFirstObject.getValue('something', 'somethingElse'));

  var mySecondObject = {
    _value: 'my second object value'
  };

  // call the getValue function but apply a different context. The difference between
  // call() and apply() is only the syntax
  console.log(myFirstObject.getValue.apply(mySecondObject, ['addition', 'secondAdition' ]));
  console.log(myFirstObject.getValue.call(mySecondObject, 'addition', 'secondAdition'));

})();

console.log('------------------');

/**
 * Constructor functions
 */
(function() {

  /**
   * Constructor functions are always defined with a capital first letters.
   *
   * @param {String} name
   * @param {String} type
   *
   * @constructor
   */
  var Car = function(name, type) {
    this.name = name;
    this.type = type;
  };

  // you can create an instance like you create a class instance in PHP
  var myFirstCarInstance = new Car('Klara', 'Ferrari');

  // instantiating a constructor function is basically calling the function
  // with an object as context, as shown below:
  var mySecondCarInstance = {};
  Car.apply(mySecondCarInstance, [ 'Petra', 'Porche' ]);

  // the only difference is that the logged object is called differently..
  console.log(myFirstCarInstance, mySecondCarInstance);

  // .. therefor mySecondCarInstance is not an instance of Car
  console.log(mySecondCarInstance instanceof Car);

  // .. but myFirstCarIinstance is
  console.log(myFirstCarInstance instanceof Car);
})();

console.log('-----------');

/**
 * Prototype VS constructor function
 */
(function() {

  /**
   * @constructor
   */
  var User = function(name) {

    /**
     * @protected
     * @type {String}
     */
    this._name = name;

    /**
     * @returns {string}
     */
    this.getNameWithExtension = function() {
      return this.getName() + '.something';
    }
  };

  _.extend(User.prototype, {

    /**
     * @returns {String}
     */
    getName: function() {
      return this._name;
    }
  });

  var myFirstUser = new User('Peter');
  var mySecondUser = new User('Klaas');

  // two objects are created from the User contructor function
  console.log(myFirstUser, mySecondUser); // logs the two user objects

  // these objects both have the same prototype, being User.prototype. As the getName function resides in the
  // prototype, this means that the getName functions from both objects are exactly the same function
  console.log(myFirstUser.getName === mySecondUser.getName); // returns true

  // the getNameWithExtension function however resides in the constructor function and is therefor created
  // seperately for every object that is created using the constructor.
  console.log(myFirstUser.getNameWithExtension === mySecondUser.getNameWithExtension); // returns false

  // That is also why we put the '_name' property in the constructor function instead of the prototype. Otherwise
  // both names would be the same..
  console.log(myFirstUser.getName() + ' en ' + mySecondUser.getName());
})();

console.log('------------------');

(function() {

  /**
   * @param {String} name
   *
   * @constructor
   */
  var Human = function(name) {
    this._name = name;
  };

  _.extend(Human.prototype, {

    /**
     * @returns {String}
     */
    getName: function() {
      return this._name;
    }
  });

  /**
   * @constructor
   */
  var Male = function() {

    // apply any arguments that we have to the prototype constructor, to make sure that
    // the _name variable is set with the name of the Man
    Human.apply(this, arguments);
  };

  // extend the functionality of all objects that are instantiated using the Male constructor with the
  // Human functionalities
  Male.prototype = new Human();

  var myFirstMale = new Male('Jantje');

  // therefor the myFirstMale is both an instance of Male as it is an instance of Human
  console.log(myFirstMale instanceof Male && myFirstMale instanceof Human);

  // therefor we are now able to call the getName function on our Male instance object
  console.log(myFirstMale.getName());
})();

console.log('-----------------');

/**
 * Backbone like extending functionality
 */
(function() {
  var BaseClass = function(something) {
    this._property = something;
  };

  _.extend(BaseClass.prototype, {
    getSomeString: function() {
      return 'doing something with ' + this._property + '..';
    }
  });

  var myBaseClass = new BaseClass('water');
  console.log(myBaseClass.getSomeString());

  var extend = function(protoProps, staticProps) {

    // define the parent constructor function
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) {
      _.extend(child.prototype, protoProps);
    }

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  BaseClass.extend = extend;

  var ChildClass = BaseClass.extend({
    getSomeString: function() {
      return ChildClass.__super__.getSomeString.apply(this, arguments) + ' and adding something..';
      //which is basically the same as .. return BaseClass.prototype.getSomeString.apply(this, arguments) + ' and adding something..';
    }
  });

  var myChildClass = new ChildClass('water');
  console.log(myChildClass.getSomeString());
  console.log(myChildClass);
})();

console.log('-----------');