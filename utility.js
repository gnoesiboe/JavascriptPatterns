var Utility = (function() {
  return {

    /**
     * Trunacates a string
     *
     * @param {String} text
     * @param {Number} length
     * @param {Object} options
     */
    truncate: function(text, length, options) {
      if (text === '') {
        return '';
      }

      // merge provided options with defaults
      options = _.extend({
        by_word: false,         // wether or not the string should be truncated by word
        strip_tags: false,      // wether or not to strip (x)HTML/xml tags
        truncate_string: '..'   // the end of the truncated string
      }, options || {});

      // remove length of truncate string from user supplied length to make sure that
      // the actual string length matches
      length = length - options.truncate_string.length;

      // stript tags if needed
      text = options.strip_tags === true ? Utility.stripTags(text) : text;

      // if the text is smaller then the allowed length, just return the text
      if (text.length <= length) {
        return text;
      }

      if (options.by_word === true) {
        var words = text.split(' ');

        // make sure the first word of isn't already smaller then the allowed
        // length. If it is, truncate within word
        if (words[0].length > length) {
          return words[0].substring(0, length) + options.truncate_string ;
        }

        var currentLength = 0;
        text = '';
        for (i = 0, l = words.length; i < l; i++) {
          if (currentLength + words[i].length + 1 <= length) {
            text += words[i] + (i < l - 1 ? ' ' : '');
            currentLength += words[i].length + 1;
          } else {
            break;
          }
        }
      } else {
        text = text.substring(0, length);
      }

      // remove last space
      text = Utility.trim(text);

      return text + options.truncate_string;
    },

    /**
     * Strips (x)html tags from a string
     *
     * @param {String} text
     * @return {String}
     */
    stripTags: function(text) {
      return text.replace(/(<([^>]+)>)/ig, '');
    },

    /**
     * Removes proceeding and training spaces from
     * the supplied string.
     *
     * @param {String} text
     * @return {String}
     */
    trim: function(text) {
      return text.replace(/^\s+|\s+$/g, '');
    }
  };
})();

var test = 'Dit <b>is een veel</b> te lange <a href="#">tekst</a> die getruncate moet worden';
//var test = 'water';
//var test = 'watwdrfasdfasdfsdfwatwdrfasdfasdfsdf ate';
var response = Utility.truncate(test, 15, {
  strip_tags: true,
  by_word: true
});
console.log(response);