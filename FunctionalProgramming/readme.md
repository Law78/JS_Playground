# Intro

1° Principio della FP:
"Le funzioni non cambiano lo stato", questo vuol dire che le funzioni possono alterare solo i valori interni ad esse ma non valori ricevuti dall'esterno, come gli argomenti passati ad esse. Il codice che si ottiene è molto più manutenibile e testabile, nonchè aperto alla programmazione concorrente.

2° Principio della FP:
"Descriviamo il problema in termini di cosa fare anzichè come", ovvero il problema viene descritto in maniera matematica anzichè essere descritto in maniera "meccanina", step-by-step. In questo modo riusciamo ad astrarre il problema, lasciando la macchina il compito di svolgere ciò che è stato descritto. Ciò è in contrapposizione alla programmazione imperativa-procedurale.

La FP ci fornisce gli strumenti per una programmazione di astrazione di più alto livello rispetto alla programmazione
imperativa.

```
function somma(numeri){
  var sum = 0;
  if(!numeri) return sum;

  for(var i = 0; i < numeri.length; i++){
    sum += numeri[i];
  }
  console.log('Somma', sum);
}

function somma_fp(numeri){
  sum = numeri.reduce(function(sum,val){
    return sum + val
  }, 0);
  console.log('Somma_Fp', sum);
}

somma([1,2,3]);
somma_fp([1,2,3]);
```

Si evitano effetti collaterali (side-effect). Nella FP non vado a modificare il parametro di ingresso.

Referential Transparency (espressioni che non hanno side effects e non accedono a valori globali): Il codice di una funzione può essere rimpiazzato dai valori che la funzione ritorna ed il comportamento del nostro programma sarà lo stesso. Una funzione pura è una funzione Referential Transparency. Pure functions accedono solo agli argomenti passati e non li modificano. Non accedono a dati esterni ne globali!
Se una funzione JS aggiorna il DOM o acquisisce dei dati dal DOM, questa funzione non è pura!

Importante è il concetto di Immutabilità del dato che non può cambiare. La FP incoraggia la immutabilità.

```
var arr = [1,2,3];
var newArr = arr.concat(4) // concat non cambia l'array arr, ne crea uno nuovo!
```
Creiamo dei dati nuovi! Non è inefficiente, in questo modo ho un altro step nella Referential Transparency, vuol dire che il nostro stato varia il meno possibile, migliorando la leggibilità e la manutenibilità del codice e fa si che la programmazione concorrente sia più facile.

Lazy evaluation: non farlo finchè non è strettamente necessario!

Le caratteristiche salienti della FP sono:
- Usare le funzioni e gli array per il controllo del flusso del programmazione
- Scrivere funzioni pure, funzioni anonime, funzioni ricorsive, usare le chaining functions
- Le funzioni sono First Class Citizen
- Amare gli strumenti come: map, filter e reduce nonchè slice (che non muta l'array a differenza di splice)

Entriamo nel dettaglio.

#High order functions

First class function - First Class Citizen: JS supporta questa feature cruciale per la FP, questo ci permette di trattare le funzioni come valori e che posso assegnare a variabili o passare ad altre funzioni o ritornarle dalle funzioni, assegnarle come proprietà ad un oggetto. Inoltre le funzioni in JS sono OGGETTI e quindi posso avere proprietà appartenenti ad esse. Ad esempio una funzione ha la proprietà prototype (utilizzata con il new) e la proprietà lenght, che restituisce il numero di parametri della funzione:

```
var hello = function(greet){
  console.log(greet);
}

console.log(hello.length)
```

oppure vediamo funzioni come argomento:

```
var greet = function(name, fn){
  return fn + ' ' + name;
}

var language = function(lang){
  switch(lang){
    case 'IT': return 'Ciao';
    case 'EN': return 'Hi';
    default: return 'Yo!';
  }
}

var italiano = language('IT');
var english = language('EN');
var unknow = language();
var nome = 'Lorenzo';
greet(nome, italiano);
greet(nome, english);
greet(nome, unknow);
```

Nota: Per accedere alla lista degli argomenti di una funzione mi basta fare:

```
var args = Array.prototype.slice.call(arguments);
```

Ricorda però che arguments è un oggetto simile ad un array, non un array. Per questo ho dovuto usare l'istruzione precedente per convertirla in array.

Quando eseguo una funzione, oltre agli argomenti, passo implicitamente un valore detto _this_ !
E' l'oggetto che viene associato alla chiamata della funzione, il contesto. Il come viene associato il valore di this è "governato" dalle regole dell'engine JS. La prima regola è quella di applicare a this il valore dell'oggetto globale, se la funzione viene invocata così com'è, senza new, apply, call, bind o come metodo di un oggetto. Quando viene invocata come funzione di un oggetto, allora ho un implicito binding del valore this a questo oggetto. Quando la funzione viene invocata con il new, allora la funzione stessa è trattata come costruttore ed il this è legato al nuovo oggetto che "costruisce" la funzione (di norma la funzione costruttore deve avere la prima lettera maiuscola). Infine ho il binding esplicito tramite l'uso di call, apply e bind.

Un'altro importante argomento per la FP è il concetto di _closure_, ovvero uno scope creato al momento della dichiarazione della funzione che incorpora lo scope esterno della funzione. In pratica ci permette di accedere al contenuto "esterno" della funzione.
Con le closure è possibile ricreare il concetto di incapsulamento dei dati, rendere quindi private alcune parti del codice, all'esterno:

```
function privateTest(){
  var points=0;
  this.getPoints=function(){
    return points;
  };
  this.score=function(){
    points++;
  };
}

var private = new privateTest();
private.score();
console.log(private.points); // undefined
console.log(private.getPoints());
```

E' possibile creare funzioni che ritornano valori a cui posso concatenare altre funzioni un pò come il comando pipe | di Unix o le espressioni LINQ. Questa tecnica è possibile vederla nel file function_chaining.js e ci permette il "Chaining delle Funzioni"
