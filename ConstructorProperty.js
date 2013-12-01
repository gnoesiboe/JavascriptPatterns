var Person = function(name) {
  this.name = name;
};

var Santa = function(name, age) {
  Person.call(this, name);
};
Santa.prototype = new Person;

var klaas = new Santa('klaas'),
    karel = new Person('karel');

console.log(klaas, karel); // output: { name: 'klaas' } { name: 'karel' }
console.log('Klaas is an instance of Person: ' + (klaas instanceof Person)) // output: Klaas is an instance of Person: true
console.log('Klaas is an instance of Santa: ' + (klaas instanceof Santa)) // output: Klaas is an instance of Santa: true

// as the prototype of Santa was changed to an instance of Person, the constructor
// changed with it
console.log(klaas.constructor === Person); // output: true
console.log(karel.constructor === Person); // output: true

// Therefor we need to reset the constructor after instantiating as it is changed to the constructor function of Person
Santa.prototype.constructor = Santa;

var pietje = new Santa('pietje');
console.log(pietje.constructor === Santa); // output: true


