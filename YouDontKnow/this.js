
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
