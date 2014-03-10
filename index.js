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
	λfn.λarg.(fn arg)
*/
λ.apply = function apply(fn){
	return function __apply__(arg){
		return fn.call(null, arg);
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

module.exports = λ;