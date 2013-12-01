/**
 * Instantiates a Constructor function while utilizing another function. Strategy could be
 * used on Dependency Injection techniques for javascript
 */

/**
 * @param {*} eerste
 * @param {*} tweede
 *
 * @constructor
 */
var Test = function (eerste, tweede) {
    this.eerste = eerste;
    this.tweede = tweede;
};

// default setup
var myTest1 = new Test('eerste', 'tweede');
console.log(myTest1, myTest1 instanceof Test, myTest1.constructor === Test); // output: { eerste: 'eerste', tweede: 'tweede' } true true

/**
 * @param {Function} Constructor
 * @param {Array} arguments
 *
 * @returns {Object}
 */
function applyToConstructor(Constructor, arguments) {

    // prepent an empty item as the first argument is considered the target object
    var args = [ null ].concat(arguments);

    var FactoryFunction = Constructor.bind.apply(Constructor, args);
    return new FactoryFunction();
}

var myTest3 = applyToConstructor(Test, [ 'eerste', 'tweede' ]);
console.log(myTest3, myTest3 instanceof Test, myTest3.constructor === Test); // { eerste: 'eerste', tweede: 'tweede' } true true