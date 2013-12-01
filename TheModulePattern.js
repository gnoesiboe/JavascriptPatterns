/**
 * Returns an object but still uses private methods/variables
 *
 * @return {Object}
 */
var countModule = (function () {

    /**
     * @private
     * @return {Number}
     */
    var _getDefaultCountValue = function () {
        return 0;
    };

    /**
     * @private
     * @type {Number}
     */
    var _count = _getDefaultCountValue();

    return {

        /**
         * @public
         * @return {Number}
         */
        getCount: function () {
            return _count;
        },

        /**
         * @public
         * Resets the counter
         */
        incrementCount: function () {
            _count++;
        },

        /**
         * @public
         * Resets the counter
         */
        resetCount: function () {
            _count = _getDefaultCountValue();
        }
    };
})();