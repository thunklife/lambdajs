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
 * Given a function 'f', and an arugment 'x', applies 'x' over 'f'.
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
λ.true = λ.first = function first(x){
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
λ.false = λ.second = function second(x){
  return λ.id;
};

/**
 * λx.λy.λf((f x) y)
 *
 * Given the values 'x' and 'y', and a function 'f', Returns the result of applying 'x' and 'y' over 'f'.
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
module.exports = λ;
