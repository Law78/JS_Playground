(
  function(exports, cb){
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
      return cb(module, true);
    }
    return cb(window);
  }
)((typeof exports === 'undefined') ? window : exports, function(global, isNode){
  var testThis = function(){
    console.log('Hello, welcome to test \'this\'!');
    playground();
    return true;
  };
  !isNode ? global.testThis = testThis : global.exports = testThis;

});
// Funzione playground.
function playground(){
  a = 2;
  function foo(){
    console.log('Valore di a:', this.a);
  }
  foo();
}

/*
(function(ambiente){
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined'){
    return module.exports = ambiente = function(){
      console.log('NODE');
      return true;
    }
  } else {
    return ambiente.greet = function(){
      console.log('WEB');
      return true;
    }
  }

})((typeof exports === 'undefined') ? window : exports, function(){
  console.log('QUI');
});
*/
