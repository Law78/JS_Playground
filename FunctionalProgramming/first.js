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

var greet = function(name, fn){
  console.log(fn + ' ' + name);
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
