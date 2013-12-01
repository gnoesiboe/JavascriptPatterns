var Human = function() { };

Human.prototype.getFullName = function() {
  return this._firstname + ' ' + this._surname;
};

// create a new object (with no parent object);
var klaas = Object.create(Human.prototype, {
  firstname: {
    configurable: true,
    get: function() {
      return this.klaas.toUpperCase();
    },
    set: function(value) {
      this.klaas = value.toLowerCase();
    }
  },
  gender: {
    writable: false,
    configurable :false,
    value: 'male'
  }
});

klaas.firstname = 'Klaas';

console.log(klaas, klaas.__proto__ === Human.prototype);