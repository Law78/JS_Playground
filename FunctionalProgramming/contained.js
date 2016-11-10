function not(fn){
  return function(val){
    return !fn(val);
  }
}
function contained(list){
  return function(item){
    return list.indexOf(item) >= 0;
  }
}

var list = [1,2,3];
var lista = ["Lorenzo", "Giuseppe", "Federico "];
//contained list ritorna una funzione a cui passo un valore che ritorna il risultato
console.log(contained(list)(1));

console.log( not(contained(list))(4) );

console.log( not(contained(lista)) ("Giordano") );

console.log(!!lista.indexOf("Giordano"));
