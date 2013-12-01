/**
 * @return {Object}
 */
var Singleton = (function () {

    /**
     * @type {Object}
     */
    var instance = null;

    /**
     * @return {Object}
     */
    function init() {

        // return the public interface of this object
        return {
            publicMethod: function () {
                console.log('this is a public method');
            },

            publicProperty: 'public property'
        };
    }

    // return the public interface of this singleton
    return {

        /**
         * @returns {Object}
         */
        getInstance: function () {
            if (instance === null) {
                instance = init();
            }

            return instance;
        }
    };
})();

var firstSingletonInstance = Singleton.getInstance();
var secondSingletonInstance = Singleton.getInstance();

console.log(firstSingletonInstance === secondSingletonInstance); // output: true