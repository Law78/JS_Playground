var ast = [
  ['plainText', 'Questo è un testo.'],
  ['paragraph'],
  ['alternative', 1, 'testo'],
  ['plainText', 'Qui devo andare a capo...'],
  ['plainText', 'e questa proseguirla.'],
  ['alternative', 2, 'testo'],
  ['alternative', 0, 'testo'],
  ['paragraph'],
  ['plainText', 'Questo è un altro paragrafo,'],
  ['plainText', 'e questo il suo continuo.'],
];

function nodesByTypes(type, ast){
  return ast.filter(function(node){
    return contains(type, node[0]);
  });
}

function contains(type, list){
  return type.indexOf(list) >= 0;
}

function prepareView(ast){
  return splitBy(nodesByTypes(['plainText','paragraph'], ast)).map(function(val){
    return val.join(" ");
  }).join("\n");
}

function isParagraph(node){
  return node == 'paragraph';
}

function splitBy(list){
  var results = [];
  list.map(function(elem){
    if(isParagraph(elem) || results.length == 0){
      results.push([]);
    }
    // Inserisco la frase
    results[results.length-1].push(elem[1]);
  });
  return results;
}

console.log(prepareView(ast));
