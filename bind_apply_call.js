// Call e Apply eseguono subito la funzione
// Bind lega il contesto ma non esegue la funzione

// Cosa succede quando richiamo una funzione con il new ? Creo un this :)
function test1(){
	console.log('This test1:', this);
}

new test1();


function test2(){
	console.log('This test2:', this);
	test1.apply(obj2);
}

var obj1 = { name: 'My name is Obj1'};
var obj2 = { name: 'My name is Obj2'};

test2.call(obj1);
test2.apply(obj1);
test2.bind(obj1).call();
test2.bind(obj1)();

var lampadina = {
	isOn: false,
	interruttore: function(){
		this.isOn = !this.isOn;
	}
}
console.log(lampadina.isOn);
var l = lampadina.interruttore;
l(); // qui la l non avrà effetto sulla lampadina!
console.log(lampadina.isOn);
l.bind(lampadina)();
console.log(lampadina.isOn);
l.apply(lampadina);
console.log(lampadina.isOn);
l.call(lampadina);
console.log(lampadina.isOn);

function myFunction(one, two){
	console.log(arguments);
}

myFunction("one", "two");

function myBind(context){
	//console.log(context);
	var func = [].slice.call(arguments, 1).shift();
	return function(){
		var fn = func || [].slice.call(arguments, 0).shift();
		var args = [].slice.call(arguments, 1);
		// Uso la apply anzichè la call altrimenti ottengo un array e non una stringa
		return typeof fn === 'function' ? fn.apply(context, args) : undefined;
	};
}

var b = myBind(obj1);
console.log(b(test1));
b();
console.log('B2');
var b2 = myBind(obj1, test2);
b2();

var log = myBind(console);
log(console.log, "hello", "world", "!!!", ";)");


function add(x, y){
  //console.log(x, y);
  return x + y;
}
// Somma con il precedente: 1 3 5 7 9
console.log(array.map(add.bind(array)));
// Somma gli elementi +1
console.log(array.map(add.bind(array, 1)));
// Somma gli elementi dell'array: 15
console.log(array.reduce(add.bind(array)));
