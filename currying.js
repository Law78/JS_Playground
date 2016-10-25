

var multiply = function(a, b){
	return a * b;
}

var partial = function(fn){
	var args = [].slice.call(arguments, 1);

	return function(){
		return fn.apply(null, args.concat([].slice.call(arguments)));
	}
}

double = partial(multiply, 2);

console.log(double(4));

/*
La tecnica del currying è quella di chiamare una funzione con n argomenti tramite una funzione con m argomenti
dove m < n.
Questo effetto è ottenuto legando alcuni parametri con una chiamata ad una prima funzione e cioè rimangono nella
chiusura della funzione che ritorno successivamente.
*/

function greeting(greet, name){
	return greet + ' ' + name;
}

function greeting2(greet){
	return function(name){
		return greet + ' ' + name;
	}
}

// Ricevo una funzione fn e un argomento
function greeting3(fn){
	// salvo l'argomento
	var greet = [].slice.call(arguments, 1);
	// ritorna una funzione che accetta un nome
	return function(nome){
		var combinedArgs = greet.concat(nome);
		return fn.apply(null,combinedArgs);
	}
}

console.log(greeting('Hello', 'Lorenzo'));
var g = greeting2('Hi');
console.log(g('Lorenzo'));
var g3 = greeting3(greeting, 'Ciao');
console.log(g3('Federico'));


function add(left, right){
	return left + right;
}

var array = [1, 2, 3, 4, 5];

console.log(array.map(add.bind(null,5)));

// Ho una nuova funzione con un primo argomento pari a 5
var add5= add.bind(undefined, 5); // prefill
// Invoco questa funzione con un secondo (unico) argomento 10
console.log(add5(10));