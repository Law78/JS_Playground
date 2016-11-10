var ast = [
  //type
  ['plainText', 'questo è un testo'],
  ['paragraph'],
  ['alternative', 1, 'testo'],
  ['alternative', 2, 'testo'],
  ['alternative', 0, 'testo']
];

function nodesByType(type, ast){
    var results = [];
    for(var i = 0; i < ast.length; i++){
      if(type === ast[i][0]){
        results.push(ast[i]);
      }
    }
    return results;
}

function filter2(predicate, list){
  var results = [];
  for(var i = 0; i < list.length; i++){
    if(predicate(list[i])){
      results.push(list[i]);
    }
  }
  return results;
}

function nodesByType_2(type, ast){
  return filter2(function(node){
    return node[0] === type
  }, ast)
}

function nodesByType_FP(type, ast){
  return ast.filter(function(val){
    return val[0] === type
  })
}
var res = nodesByType('alternative', ast);
console.log(res);

res = nodesByType_2('alternative', ast);
console.log(res);

res = nodesByType_FP('alternative', ast);
console.log(res);
