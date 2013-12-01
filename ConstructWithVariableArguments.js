var Test = function(eerste, tweede) {
  this.eerste = eerste;
  this.tweede = tweede;
};

// default setup
var myTest1 = new Test('eerste', 'tweede');
console.log(myTest1, myTest1 instanceof Test, myTest1.constructor === Test);


// use apply
var myTest2 = {};
Test.call(myTest2, 'eerste', 'tweede');
console.log(myTest2, myTest2 instanceof Test, myTest2.constructor === Test);


// use bind and apply
function applyToConstructor(Constructor, arguments) {
    
    // prepent an empty item as for some reason the first argument is ignored??
    var args = [ null ].concat(arguments); 
    
    
    var FactoryFunction = Constructor.bind.apply(Constructor, args);
    return new FactoryFunction();
}

var myTest3 = applyToConstructor(Test, [ 'eerste', 'tweede' ]);
console.log(myTest3, myTest3 instanceof Test, myTest3.constructor === Test);