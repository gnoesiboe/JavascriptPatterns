(function() {

  /**
   * @param {Date} checkDate
   * @param {Object} options
   *
   * @returns {String}
   */
  var toTimeElapsed = function(checkDate, options) {
    if ((checkDate instanceof Date) === false) {
      checkDate = new Date(checkDate);
    }

    options = _.extend({
      seconds: 's',
      minutes: 'm',
      hours: 'u',
      days: 'd',
      months: 'ma',
      years: 'j'
    }, options || {});

    var now = new Date();

    var diffSeconds = Math.round((now.getTime() - checkDate.getTime()) / 1000);

    if (diffSeconds < 0) {
      return '0 s';
    }

    var oneSecond = 1,
        oneMinute = 60 * oneSecond,
        oneHour = 60 * oneMinute,
        oneDay = 24 * oneHour,
        oneMonth = Math.round((365 * oneDay) / 12),
        oneYear = 365 * oneDay;

    if (diffSeconds >= oneYear) {
      return Math.floor(diffSeconds / oneYear) + ' ' + options.years;
    }
    else if (diffSeconds >= oneMonth) {
      return Math.floor(diffSeconds / oneMonth) + ' ' + options.months;
    }
    else if (diffSeconds >= oneDay) {
      return Math.floor(diffSeconds / oneDay) + ' ' + options.days;
    }
    else if (diffSeconds >= oneHour) {
      return Math.floor(diffSeconds / oneHour) + ' ' + options.hours;
    }
    else if (diffSeconds >= oneMinute) {
      return Math.floor(diffSeconds / oneMinute) + ' ' + options.minutes;
    }
    else if (diffSeconds >= oneSecond) {
      return Math.floor(diffSeconds / oneSecond) + ' ' + options.seconds;
    }

    return '0 s';
  };

  var toDate = function(value) {
    console.log(value);
    if (_.isString(value) === false) {
      return false;
    }

    var matches = value.match(/^(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/);
    if (_.isArray(matches) === false) {
      return false;
    }

    console.log(matches);

    var test = [ Number(matches[1]), Number(matches[2]), Number(matches[3]), Number(matches[4]), Number(matches[5]), Number(matches[6]) ];

    console.log(test);

    return new Date(
      Number(matches[1]),
      Number(matches[2]) - 1, // months are zero based
      Number(matches[3]),
      Number(matches[4]),
      Number(matches[5]),
      Number(matches[6])
    );
  };

  console.log(toDate('2012-11-03 05:02:13'));

  var myFirstDate = new Date();



  // console.log(toTimeElapsed('2013-03-04 17:08:13'));
})();