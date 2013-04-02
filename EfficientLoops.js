/**
 * Checking the length of an array during every iteration can be realy slow and
 * should therefor be avoided.
 *
 * Consider:
 */

var names = ['Gijs', 'Pietje', 'Klaas'];

for (var i = 0; i < names.length; i++) {
  // the length of the names array is considered again with each
  // loop iteration!
}

/**
 * Better (and faster) is to only get the length of the array
 * once, like:
 */

for (var i = 0, l = names.length; i < l; i++) {
  // the length of the names array is only checked one and then stored
  // within the 'l' variable
}
