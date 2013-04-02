// global score
var MyObject = {
  name: "Pieter",
  getName: function() {
    console.log(this);
  }
};

MyObject.getName(); // logging of this returns "Object"

var test = MyObject.getName;
test();  // logging of this returns "Window"
test.call(MyObject); // logging of this returns "Object" as it calls the 'test' function from the MyObject context

var OtherObject = {
  name: "Klaartje",
  getName: MyObject.getName
};
OtherObject.getName(); // logging of this returns "Object" where the object is OtherObject ie. the OtherObject context is used



// within inherantance
var Mammal = function() {
  var type = 'mammal';

  var getType = function() {
    return type;
  };

  return {
    getType: getType
  };
};

var Human = function() {

  var getType = function() {
    return Human.prototype.getType() + ' but human';
  };

  return {
    getType: getType
  };
};
Human.prototype = new Mammal();

var myHuman = new Human();
console.log(myHuman.getType()); // logs 'mammal but human'. We call the parent function via prototype