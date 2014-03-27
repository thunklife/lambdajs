/**
 * @module boolean
 * @author wilhelmson <http://wilhelmson.github.io>
 * @desc Lambda functions that can be used to express boolean logic.
 * Consider a conditional expression:
 *    <condition> ? <true> : <false>
 * This can be expressed as a pair, where the first value represents True,
 * and the second represents false.
 *
 * This module depends on the [foundation]{@link module:foundation} module.
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
var foundation = require('./foundation');

/**
 * @desc In Boolean logic, a conditional can be expressed as a pair
 * of expressions, with a condition for selecting the first or second. Therefore
 * the function for expressing a conditional is the
 * {@link module:foundation.pair pair} function.
 *
 * Lambda notation: λx.λy.λf.((f x) y)
 * @method
 * @param {function} x
 * @param {function} y
 * @param {function} f This function is a selector function, such as 'first'.
 * @returns {function} Either the first or second argument, depending on the
 * selector function.
 */
exports.cond = foundation.pair;

/**
 * @desc If a conditional expression can be expressed as a pair, then True can be
 * expressed as selecting the first item in the list. Therefore, True (truth) is
 * the {@link module:foundation.first first} function.
 *
 * Lambda notation: λx.λy.x
 * @method
 * @param {function} x
 * @param {function} y
 * @returns {function} Returns the first argument supplied
 */
exports.truth = foundation.first;

/**
 * @desc If True is expressed as λ.first, then it follows that False can be
 * expressed as selecting the second item. Therefore, False (untruth) is the
 * {@link module:foundation.second second} function.
 *
 * Lambda notation: λx.λy.y
 * @method
 * @param {function} x
 * @param {function} y
 * @returns {function} Returns the first argument supplied
 */
exports.untruth = foundation.second;

/**
 * @desc  Given a value 'x', which represents True or False, return the inverse.
 *
 * Lambda notation: λx.(((cond untruth) truth) x)
 *
 * Note: The definition above can be reduced further by substituting 'cond' for
 * the argument 'x' resulting in:
 *
 * λx.((untruth) truth)
 * @param {function} x A function representing either True or False
 * @returns {function} The inverse of the boolean function passed to the function.
 */
exports.not = function not(x){
  return x(exports.untruth)(exports.truth);
};

/**
 * @desc Given values 'x' and 'y' that represent True or False, return True if both
 * 'x' and 'y' are True.
 *
 * Lambda notation: λx.λy.(((cond y) untruth) x).
 *
 * Like 'not', the definition above can be further reduced by substituting
 * 'cond' with the argument 'x', resulting in:
 *
 * λx.((x y) untruth)
 *
 * @param {function} x A function representing True or False.
 * @param {function} y A function representing True or False.
 * @returns {function} True if 'x' and 'y' are True, otherwise False.
 */
exports.and = function and(x){
  return function(y){
    return x(y)(exports.untruth);
  };
};

/**
 * @desc Given values 'x' and 'y' that represent True or False, if 'x' is True
 * return True, if 'x' is False return 'y'.
 *
 * Lambda notation: λx.λy.(((cond truth) y) x)
 *
 * Similarly to 'and', the definition above can be reduced by substituting
 * 'cond' with the argument 'x' resulting in:
 *
 * λx.λy.((x truth) y)
 * @param {function} x A function representing True or False
 * @param {function} y A function representing True or False
 * @returns {function} True if 'x' is True, otherwise 'y'
 */
exports.or = function or(x){
  return function(y){
    return x(exports.truth)(y);
  };
};
