/**
 * Human constructor function
 */

var Human = function(name) {
  this.name = name;
};

Human.prototype.getName = function() {
  return this.name;
};


/**
 * Man constructor function 'extends' Human constructor
 */
var Man = function(name) {
  Human.apply(this, arguments);
};
Man.prototype = new Human;

// the original prototype constructor of man pointed to the Man constructor, but now we replaced
// the prototype with an instance of Human, the Human constructor was suddenly the constructor
// of our Man constructor. We need to reset that manually to keep access to the constructor
Man.prototype.constructor = Man;

var myMan = new Man('Klaas');


/**
 * Tests
 */

console.log(myMan);
console.log(myMan instanceof Man);
console.log(myMan instanceof Human);
console.log(myMan.__proto__ instanceof Human);
console.log(myMan.__proto__.constructor === Man);
console.log(myMan.getName());