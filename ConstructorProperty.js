var Person = function(name) {
  this.name = name;
}

var Santa = function(name, age) {
  Person.call(this, name);
}
Santa.prototype = new Person;

var klaas = new Santa('klaas'),
    karel = new Person('karel');

console.log(klaas, karel);
console.log('Klaas is an instance of Person: ' + (klaas instanceof Person))
console.log('Klaas is an instance of Santa: ' + (klaas instanceof Santa))

// as the prototype of Santa was changed to an instance of Person, the constructor
// changed with it
console.log(klaas.constructor === Person);
console.log(karel.constructor === Person);

// Therefor we need to reset the constructor after instantiating
Santa.prototype.constructor = Santa;

var pietje = new Santa('pietje');
console.log(pietje.constructor === Santa);


