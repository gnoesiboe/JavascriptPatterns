var debug = (function() {

  /**
   * @type {Object}
   * @private
   */
  var _self = this;

  /**
   * @private
   * @param {Number} _nestingLevel
   * @return {String}
   */
  var _toIndent = function(_nestingLevel) {
    var _return = '  ';
    for (var i = 0; i < _nestingLevel; i++) {
      _return += '  ';
    }

    return _return;
  };

  var _toString = function(_value, _nestingLevel) {
    _nestingLevel = _nestingLevel || 0;
    var _return = '';
    var _indent = _toIndent(_nestingLevel);

    switch (typeof _value) {
      case 'string':
        _return += '"' + _value + '"';
        break;

      case 'object':
        _return += debug.logObject(_value, false, _nestingLevel + 1);
        _return += _indent + (_value instanceof Array ? ']' : '}');
        break;

      default:
        _return += _value.toString();
        break;
    }

    return _return;
  };

  return {

    /**
     * @param {Object} _object
     * @param {Boolean} _log
     */
    logObject: function(_object, _log, _nestingLevel) {
      _log = _log !== false;
      _nestingLevel = _nestingLevel || 0;
      var _isArray = _object instanceof Array;
      var _indent = _toIndent(_nestingLevel);
      var _return = _isArray === true ? '[\n' : typeof _object + ' {\n';

      for (var _key in _object) {
        if (_object.hasOwnProperty(_key) === true) {
          _return += _indent + _key + ': ' + _toString(_object[_key], _nestingLevel) + ',\n';
        }
      }

      if (_nestingLevel === 0) {
        _return += _isArray === true ? ']\n' : '}\n';
      }

      if (_log === true) {
        console.log(_return);
      }

      return _return;
    }
  };
})();

var testObject = {
  'string': 'test',
  'object': {
    test: 'eerste',
    anders: 49.291,
    nogwat: {
      eerste: 293,
      tweede: 'test'
    }
  },
  'boolean': true,
  'functie': function() {
    alert('test');
  },
  'cijfer': 12,
  'array': [
    'eerste',
    {
      test: 3,
      nogwat: {
        'alert': function() {
          alert('nogwat');
        },
        'derde': false
      },
      tewad: function(_test, _anders) {
        alert('anders');
      },
      dus: 3
    },
    391,
    'anders'
  ]
};

debug.logObject(testObject);