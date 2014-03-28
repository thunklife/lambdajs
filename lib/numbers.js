/**
 * @module numbers
 * @author wilhelmson <http://wilhelmson.github.io>
 * @desc Lambda functions that can be used to express natural numbers
 *
 * Natural numbers can be expressed a number of successions from zero, and zero
 * can be expressed as the identity function. For example, give a function 'zero'
 * and a function 'succ' we can create the numbers 1-5:
 * ```
 * var one    = succ(zero);
 * var two    = succ(succ(zero));
 * var three  = succ(succ(succ(zero)));
 * var four   = succ(succ(succ(succ(zero))));
 * var five   = succ(succ(succ(succ(succ(zero))))))
 * ```
 * A succession is expressed as a pair, where the second item is the current
 * predecessor; multiple successionis build up nested pairs.
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
var pair = foundation.pair;
var first = foundation.first;
var second = foundation.second;
var  identity = foundation.identity;
var zero, iszero;

/**
 * @desc Zero is the {@link module:foundation.identity identity} function.
 * If numbers are pairs, and items are selected from pairs using
 * {@link module:foundation.first first} or {@link module:foundation.second second},
 * zero represents the last item in a succession of pairs. See
 * {@link module:numbers.pred pred} for more details.
 *
 * Lambda notation: λx.x
 * @param {function} x
 * @returns {function} x
 * @method
 * @static
 */
zero = exports.zero = identity;

/**
 * @desc Given a number 'n', create a pair where {@link module:foundation.second second}
 * is the first item and 'n' is the second. In this way we can express numbers
 * as such:
 *
 * ```
 * var one = succ(zero) //=> [second, zero];
 * var two = succ(one) //=> [second, [second, zero]]
 * ```
 * Lambda notation: λn.λs((second) n)
 * @param {function} n A function representing a number
 * @param {function} s A selector function
 * @returns {function} A function representing a number which is the successor of 'n'
 * @method
 * @static
 */
exports.succ = function succ(n){
  return pair(second)(n);
};

/**
 * @desc Given a number 'n', returns True if that number is zero, otherwise returns
 * False.
 *
 * Since a number can be expressed as a pair, where the first item is
 * {@link module:foundation.second second}, which is the same as
 * {@link module:boolean.untruth untruth} or False, we can select the first
 * value from the pair to determine if the number is zero. When
 * {@link module:foundation.first first} is applied to a number,
 * {@link module:boolean.untruth untruth} is returned. When
 * {@link module:foundation.first first} is applied to {@link module:numbers.zero zero}
 * which is {@link module:foundation.identity identity}, it returns itself
 * (which is the same as {@link module:boolean.truth truth} or True)
 *
 * Lambda notation: λ.n(n first);
 * @param {function} n A function representing a number.
 * @returns {function} A function representing True or False.
 * @method
 * @static
 */
exports.iszero = iszero = function iszero(n){
  return n(first);
};
/**
 * @desc Given a number a number 'n', represented as a {@link module:foundation.pair pair},
 * return zero if the number is zero, otherwise return the second item from the pair.
 *
 * Keeping in mind that a number is a pair, which is a function waiting for a
 * selector, consider a number in the form: [false, [false, zero]]. Applying
 * {@link module:numbers.iszero iszero} returns {@link module:boolean.untruth untruth}
 * or False, which is the selector function {@link module:foundation.second second}.
 * {@link module:foundation.second second} is then passed to 'n' to retrieve the
 * second value. {@link module:numbers.zero}, and the previously selected value
 * (the predecessor) are then passed to the result of {@link module:numbers.iszero iszero},
 * which returns the predecessor.
 *
 * For example:
 *
 * ```
 * ### Finding the predecessor of 2
 * var two = succ(succ(zero)); //=> [untruth, [untruth, zero]
 * var selector = iszero(two); //=> untruth = second
 * var predecessor = selector(zero)(two(second)) //=> [false, zero] = one
 *
 * ### Finding the predecessor of 0
 * var selector = iszero(zero) //=> first. iszero is defined as n(first); therefore, if n is zero, which is the identity function, first is returned.
 * var predecessor = selector(zero)(zero(second)) //=> zero
 *```
 * Lambda notation: λ.n(((iszero n) zero) (n second))
 * @param {function} n A function representing a number.
 * @returns {function} A function representing a number which is the predecessor of 'n'
 */
exports.pred = function pred(n){
  return iszero(n)(zero)(n(second));
};
