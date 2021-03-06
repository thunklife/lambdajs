/**
 * @module λ
 * @author <wilhelmson](http://wilhelmson.github.io>
 * @desc All function names, and definitions take from '[An Introduction to Functional
 * Programming Through Lambda Calculus](http://amazon.com/gp/product/04867883)'
 * by Greg Michaels.
 *
 * **Note**
 *
 * All functions accept a single parameter. If a function is documented as
 * having multiple parameters, it means that the initial function application
 * returns a function which also takes a single parameter; and so on until all
 * arguments are supplied.
 *
 * For example:
 * ```applySelf(func)(arg);```
*/


var λ = {};

/**
 * @desc The identity function. Given a value 'x', it will return that value.
 *
 * Lambda notation:   λx.x
 * @param {*}  x Any value.
 * @returns {*} The value passed in.
*/
exports.identity = function identity(x){
  return x;
};

/**
 * @desc Given a function 's', applies 's' over 's'.
 *
 * Lambda notation:   λs.(s s)
 * @instance
 * @param {function} s Any function
 * @returns {*} The result of apply 's' to itself.
 */
exports.applySelf = function applySelf(s){
  return s(s);
};

/**
 * @desc Give a function 'f', and an argument 'x', applies 'f' over 'x'.
 *
 *  Lambda notation:   λf.λx.(f x)
 * @param {function} f A function
 * @param {*} x The argument to pass to 'f'
 * @returns {*} The result of applying 'f' over 'x'.
 *
 */
exports.apply = function apply(f){
  return function(x){
    return f(x);
  };
};

/**
 * λx.λy.x
 *
 * Given a value 'x', and a value 'y', returns 'x'.
 * This function can be used in pairs to return the first item.
*/
λ.first = function first(x){
  return function(y){
    return x;
  };
};

/**
 * λx.λy.y
 *
 * Given a value 'x' and a value 'y', returns 'y'.
 * This function is the inverse of λ.first. It could be expressed in much
 * the same way as the previous function. However, the returned function is
 * equivilant to the identity function, so simply returning λ.id is simpler.
 */
λ.second = function second(x){
  return λ.identity;
};

/**
 * λx.λy.λf.((f x) y)
 *
 * Given the values 'x' and 'y', and a function 'f', Returns the result of
 * applying 'f' over 'x'  and 'y'.This function illustrates if/else conditions
 * as well as pairs.
 *
 * For example:
 * λ.pair(λ.id)(λ.apply)(λ.first) //=> λ.id
 */
λ.pair = function pair(x){
  return function(y){
    return function(f){
      return f(x)(y);
    };
  };
};

/**
 * Boolean Logic
 * -------------
 * Consider a conditional expression:
 *    <condition> ? <true> : <false>
 * This can be expressed as a pair, where the first value represents True,
 * and the second represents false.
 */

/**
 * In Boolean logic, a conditional can be expressed as a pair of expressions,
 * with a condition for selecting the first or second.
 */
λ.cond = λ.pair;

/**
 * If a conditional expression can be expressed as a list, then True can be
 * expressed as selecting the first item in the list.
 */
λ.truth = λ.first;

/**
 * If True is expressed as λ.first, then it follows that False can be expressed
 * as selecting the second item.
 */
λ.untruth = λ.second;

/**
 * λx.(((λ.cond λ.untruth) λ.truth) x)
 *
 * Given a value 'x', which represents True or False, return the inverse.
 *
 * The definition above can be reduced further by substituting λ.cond for the
 * argument 'x' resulting in:
 * λx.((λ.untruth) λ.truth)

 */
λ.not = function not(x){
  return x(λ.untruth)(λ.truth);
};

/**
 * λx.λy.(((λ.cond y) λ.untruth) x)
 *
 * Given values 'x' and 'y' that represent True or False, return True if both
 * 'x' and 'y' are True.
 *
 * Like λ.not, the definition above can be further reduce by substituting
 * λ.cond with the argument 'x', resulting in:
 * λx.((x y) λ.untruth)
 */
λ.and = function and(x){
  return function(y){
    return x(y)(λ.untruth);
  };
};

/**
 * λx.λy.(((λ.cond λ.truth) y) x)
 *
 * Given values 'x' and 'y' that represent True or False, if 'x' is True return
 * True, if 'x' is False return 'y'.
 *
 * Similarly to λ.and, the definition above can be reduced by substituting
 * λ.cond with the argument 'x' resulting in:
 * λx.λy.((x λ.truth) y)
 */
λ.or = function or(x){
  return function(y){
    return x(λ.truth)(y);
  };
};

/**
 * Numbers
 * -------
 * Natural numbers can be expressed as a number of successions from zero, and
 * zero can be expressed as the identity function.
 * and so on.
 */
λ.zero = λ.identity;

/**
 * λn.λs((λ.second) n)
 *
 * Given a number 'n', create a pair where λ.second is the first item and 'n'
 * is the second. In this way, we can express numbers as such:
 * one = λ.succ(λ.zero) == [λ.second, λ.zero]
 * two = λ.succ(one) == [λ.second, one] == [λ.second, [λ.second, λ.zero]]
 * And so on.
 */
λ.succ = function succ(n){
  return λ.pair(λ.second)(n);
};

/**
 * λn.(n λ.first)
 *
 * Given a number 'n', returns True if that number is zero, otherwise returns
 * False.
 *
 * Since a number can be expressed as a pair, where the first item is λ.second,
 * which is λ.untruth or False, we can select the first value from the pair
 * to determine if the number is zero. When λ.first is applied to a number,
 * λ.untruth is returned. When λ.first is applied to λ.zero, which is
 * λ.identity, it returns itself (which is the same as λ.truth or True)
 */
λ.iszero = function(n){
  return n(λ.first);
};

λ.pred = function pred(n){
  return λ.iszero(n)(λ.zero)(n(λ.second));
};

exports.λ = λ;
