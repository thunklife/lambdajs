/**
 * All function names, and definitions take from 'An Introduction to Functional Programming Through Lambda Calculus' by Greg Michaels.
 * http://amazon.com/gp/product/048647883
 */

var λ = {};

/**
 * λx.x
 *
 * The identity function. Given a value 'x', it will return that value,
*/
λ.id = function id(x){
  return x;
};

/**
 * λs.(s s)
 *
 * Given a function 's', it will apply 's' over 's'.
 */
λ.applySelf = function applySelf(s){
  return s(s);
};

/**
 * λf.λx.(f x)
 *
 * Given a function 'f', and an arugment 'x', applies 'f' over 'x'.
*/
λ.apply = function apply(f){
  return function(x){
    return f(x);
  };
};

/**
 * λx.λy.x
 *
 * Given a value 'x', and a value 'y', returns 'x'.
 * This function can be used in pairs to return the first item.
 * It can also be used in conditionals (<expression> ? <true> : <false>), to represent true.
*/
λ.truth = λ.first = function first(x){
  return function(y){
    return x;
  };
};

/**
 * λx.λy.y
 *
 * Given a value 'x' and a value 'y', returns 'y'.
 * This function is the inverse of λ.true (λ.first). It could be expressed in much the same way as the previous function.
 * However, the returned function is equivilant to the identity function, so simply returning λ.id is simpler.
 */
λ.untruth = λ.second = function second(x){
  return λ.id;
};

/**
 * λx.λy.λf.((f x) y)
 *
 * Given the values 'x' and 'y', and a function 'f', Returns the result of applying 'f' over 'x'  and 'y'.
 * This function illustrates if/else conditions as well as pairs.
 * For example:
 * λ.pair(λ.id)(λ.apply)(λ.first) //=> λ.id
 */
λ.cond = λ.pair = function pair(x){
  return function(y){
    return function(f){
      return f(x)(y);
    };
  };
};

/**
 * λx.(((λ.cond λ.untruth) λ.truth) x)
 *
 * The definition above can be reduced further by substituting λ.cond for the argument 'x' resulting in:
 * λx.((λ.untruth) λ.truth)
 *
 * Given a value 'x', which represents True or False, return the inverse.
 */
λ.not = function not(x){
  return x(λ.untruth)(λ.truth);
};

/**
 * λx.λy.(((λ.cond y) λ.untruth) x)
 *
 * Like λ.not, the definition above can be further reduce by substituting λ.cond with the argument 'x', resulting in:
 * λx.((x y) λ.untruth)
 *
 * Given values 'x' and 'y' that represent True or False, return True if both 'x' and 'y' are True.
 */
λ.and = function and(x){
  return function(y){
    return x(y)(λ.untruth);
  };
};

/**
 * λx.λy.(((λ.cond λ.truth) y) x)
 *
 * Similarly to λ.and, the definition above can be reduced by substituting λ.cond with the argument 'x' resulting in:
 * λx.λy.((x λ.truth) y)
 *
 * Given values 'x' and 'y' that represent True or False, if 'x' is True return True, if 'x' is False return 'y'.
 */
λ.or = function or(x){
  return function(y){
    return x(λ.truth)(y);
  };
};

module.exports = λ;
