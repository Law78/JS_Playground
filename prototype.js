// Non pensare nella maniera classica a oggetti!
// Il modo in cui opera JS è diverso! Specialmente se hai esperienza in C++ o Java

// Parliamo di: new - construction function - etc...

var person = {
  name: 'Lorenzo',
  sayHi: function(){
    console.log("Ciao, il mio nome è", this.name);
  }
};

person.sayHi();

// Ovviamente non voglio ridefinire sayHi per ogni oggetto person:

var person2 = {
  name: 'Foo',
  sayHi: person.sayHi // Ho copiato la singola funzione all'oggetto person
};

person2.sayHi();

// Ogni singolo oggetto in JS ha un prototype. Le funzioni sono oggetti, quindi anche le funzioni
// hanno un prototype. In altri linguaggi una funzione è semplicemente un blocco di codice!

var person3 = {
  name: "<not set>",
  sayHi: function(){
    console.log("Hello, I'm", this.name);
  },
  raiseWage: function(){
    console.log("I can't do that");
    return false;
  }
};

var manager = {};
// Con questa riga vado ad impostare le funzioni e le proprietà di person3 in manager:
manager.__proto__ = person3;
manager.name = "Bossman";
manager.sayHi();
console.log(person.__proto__);
// __proto__ non va usato!
// Il prototype è un oggetto:
console.log(manager.__proto__);
console.log(manager.__proto__.__proto__.__proto__);
// Questa rappresenta la chain, per vedere se una proprietà è presente nei vari prototype
console.log(manager.hasOwnProperty("sayHi"));
console.log(manager.__proto__.hasOwnProperty("sayHi"));
manager.__proto__.sayHi.call(manager);
// Object{} ha toString:
console.log(manager.__proto__.__proto__.hasOwnProperty("toString"));

// Quando passo per il prototype non vado a replicare tutto, ma solo ciò che ridefinisco esplicitamente.
var ceo = {};
ceo.__proto__ = manager;
ceo.name = "CEO";
ceo.raiseWage = function(){
  console.log('RAISE FOR EVERYONE');
  return true;
}
ceo.sayHi();
ceo.raiseWage();

var dummy = "";
dummy.__proto__.sayHi = function(){
  console.log(this + ", Hello");
}
// Ora tutte le stringhe hanno sayHi.
"ciao".sayHi();
manager.sayHi = undefined;
// sayHi ora è undefined ma ESISTE ancora in manager e ha valore undefined!
console.log(manager);
delete manager.sayHi;
// Cancello effettivamente la proprietà e ottengo un undefined
console.log(manager.sayHi());
