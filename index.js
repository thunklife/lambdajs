var λ = {};

/**
    λx.x
*/
λ.id = function id(x){
    return x;
};

/**
    λs.(s s)
*/
λ.applySelf = function applySelf(fn){
    return fn(fn);
};

/**
    λf.λx.(f x)
*/
λ.apply = function apply(fn){
    return function __apply__(arg){
        return fn(arg);
    };
};

/**
    λx.λy.x
*/
λ.first = function first(optA){
    return function __first__(optB){
        return optA
    }
}

/**
    λx.λy.y
*/
λ.second = function second(optA){
    return λ.id;
}

/**
	λx.λy.λf.((f x) y)
*/
λ.pair = function(x){
	return function(y){
		return function(f){
			return f(x)(y);
		}
	}
}
module.exports = λ;