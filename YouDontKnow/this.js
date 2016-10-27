
// 'use strict';
// Per usare JSC anzichè NODE, creo un riferimento a console.log.
// SE USI JSC:
/*var Console = function(){
  this.log = function(msg){
    debug(msg)
  };
};

var console = new Console();
*/
/*
Comportamenti diversi tra NODE e JSC e altri ambienti come REPL.it.
Lancia il file index.html nel browser e lancia this.js con node per vedere le differenze!!!!
L'esempio mostra come viene interpretato il this in diversi ambienti:
*/
var a = 2;
var self = this;
var that = this;
function foo(){

  console.log(this.a); // undefined in Node - 2 in JSC a meno di non usare strict
  console.log(self === this); // false in Node - true in JSC a meno di non usare strict
  that = this;
  bar();
}

function bar(){
  console.log(that === this);
}
foo();
bar();

/*
Questo perchè NODEJS effettua un WRAP al nostro codice:

(function(exports, require, module, __filename, __dirname){
  var hello = function(){
    console.log('Hello World!');
  }
});

*/

function fooFunzionante(){
  var a = 2;

  bar();
  function bar(){
    console.log(this.a);
  }
}

// Devo legare a al global scope e per farlo devo omettere var per ottenere una vera a "globale"
a = 12;
fooFunzionante(); // Il this sarà quello globale


// L'implicit binding: il call-site in questo caso è un oggetto di invocazione
var obj = {
  a:100,
  fooImplicitBinding: fooImplicitBinding
}

function fooImplicitBinding(){
  console.log(this.a);
}

obj.fooImplicitBinding();

var lostImplicit = {
  a: 200,
  fooImplicitBinding: fooImplicitBinding
}

// Qui lost è un alias di una funzione, per cui non risponde più all'implicit binding bensì al default binding
var lost = lostImplicit.fooImplicitBinding;
lost();
// Ma anche questo perde l'implicit binding, in quanto il primo parametro non è altro che un riferimento
// ad una funzione che verrà trattata con una assegnazione esplicita e verrà richiamata con una plain call.
// Per questo verrà applicatio il default binding.
setTimeout(obj.fooImplicitBinding, 500);

// Vediamo nel dettaglio costruendo una custom setTimeout:
function setCustomTimeout(fn, delay){
  //wait
  var cur_d = new Date();
   var cur_ticks = cur_d.getTime();
   var ms_passed = 0;
   while(ms_passed < delay) {
       var d = new Date();  // Possible memory leak?
       var ticks = d.getTime();
       ms_passed = ticks - cur_ticks;
       d = null;  // Prevent memory leak?
   }
  fn(); // PLAIN CALL
}

setCustomTimeout(obj.fooImplicitBinding, 2000);
// con l'explicit binding andiamo a mutare esplicitamente l'oggetto a cui legherò il this
setCustomTimeout(obj.fooImplicitBinding.bind(obj), 2000);

/*
Attenzione all'hard bound. Ovvero creare una funzione che wrappa una chiamata ad un'altra funzione
e che imposta l'oggetto di contesto per il this.
*/

function hardBound(){
  hard.call(obj)
}

function hard(){
  console.log(this.a);
}

var obj = {
  a: 300,

}

hardBound();

hardBound.call(this); // Non cambierò mai il this perchè è hard bounded!

// Che risolvo con il bind:

function hardBound2(){
  hard2()
}

function hard2(){
  console.log(this.a);
}

var obj = {
  a: 300,

}

hardBound2();

hardBound2.bind(this);

// Questo mi apre uno scenario:

function add(a, b){
  return a + b;
}

var prima = add.bind(null, 3)
console.log(prima)
console.log(prima(2))
