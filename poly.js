function poly(){
	// Ed ecco i nostri bei parametri. Arguments è simile ad un array, ma non è un array.
  	console.log(arguments);
  	// Vado a fare una delega del metodo slice su [] il cui contesto è argumentss, cioè il this di slice
  	var args = [].slice.call(arguments, 0); 
  	console.log(args);
  	// la shift può essere chiamata da args in quanto vero e proprio array. Rimuove il primo elemento.
  	console.log(args.shift())
}
// Vediamo come una funzione prende i parametri
poly(1, 2, 3);


// Definiamo un oggetto contenente 3 metodi
var methods = {
	init : function(){
		return 'Init func()';
	},
	hello: function(value){
		return 'Hello ' + value;
	},
	goodbye: function(value){
		return 'Bye, ' + value;
	}
}

var greet = function(options){
	
	console.log('options:', options);
	console.log(arguments);
	var args = [].slice.call(arguments, 0);
	if(typeof options === 'string' && typeof methods[options] === 'function'){
		var action = args.shift();
		console.log(action);
		return methods[action](args);
	}
	return methods['init']();
}

console.log(greet('hello', 'Lorenzo'));	
console.log(greet());	

