/**
 * @module foundation
 * @author wilhelmson <http://wilhelmson.github.io>
 * @desc A few foundationals lambda functions
 *
 * **NOTE**
 *
 * All functions accept a single parameter. Any functions that are documented
 * as having multiple parameters will return a new function after the initial
 * application, and so on until all arguments are supplied.
 *
 * For example
 * ```applySelf(func)(arg);```
 */

/**
 * @desc The identity function. Given a value 'x', it will return that value.
 *
 * Lambda notation:   λx.x
 * @param {function}  x
 * @returns {function} The argument originally passed
*/
exports.identity = function identity(x){
  return x;
};

/**
 * @desc Given a function 's', applies 's' over 's'.
 *
 * Lambda notation:   λs.(s s)
 *
 * @param {function} s
 * @returns {function} The result of apply 's' to itself.
 */
exports.applySelf = function applySelf(s){
  return s(s);
};

/**
 * @desc Give a function 'f', and an argument 'x', applies 'f' over 'x'.
 *
 *  Lambda notation:   λf.λx.(f x)
 * @param {function} f
 * @param {function} x The argument to pass to 'f'
 * @returns {function} The result of applying 'f' over 'x'.
 *
 */
exports.apply = function apply(f){
  return function(x){
    return f(x);
  };
};

/**
 * @desc Given a value 'x', and a value 'y', returns 'x'.
 * This function can be used in pairs to return the first item.
 *
 * Lambda notation: λx.λy.x
 * @param {function} x
 * @param {function} y
 * @returns {function} Returns the first argument supplied
*/
exports.first = function first(x){
  return function(y){
    return x;
  };
};

/**
 * @desc  Given a value 'x' and a value 'y', returns 'y'.
 * This function is the inverse of λ.first. It could be expressed in much
 * the same way as the previous function. However, the returned function is
 * equivilant to the identity function, so simply returning 
 * {@link module:foundation.identity identity} is simpler.
 *
 * Lambda notation: λx.λy.y
 * @param {function} x
 * @param {function} y
 * @returns {function} Returns the first argument supplied
 */
exports.second = function second(x){
  return exports.identity;
};

/**
 * @desc Given the values 'x' and 'y', and a function 'f', Returns the result of
 * applying 'f' over 'x'  and 'y'.This function illustrates if/else conditions
 * as well as pairs.
 * For example:
 * λ.pair(id)(apply)(first) //=> id
 *
 * Lambda notation: λx.λy.λf.((f x) y)
 * @param {function} x
 * @param {function} y
 * @param {function} f This function is a selector function, such as 'first'.
 * @returns {function} Either the first or second argument, depending on the
 * selector function.
 */
exports.pair = function pair(x){
  return function(y){
    return function(f){
      return f(x)(y);
    };
  };
};
