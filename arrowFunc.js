var myFunction = () => console.log('Hello, World');
myFunction();

var myFunction2 = arg => console.log('Hello,', arg);
myFunction2("Lorenzo");

var myFunction3 = name => `Hello, ${name}`;
console.log(myFunction3('guys!'));

var array = [1, 2, 3, 4, 5];
console.log(array.map(function(item){
  return item * 2;
}));
// Più sintetica:
console.log(array.map(item => item * 2));

var obj = {
  name: 'Obj1',
  value: 10,
  myFunc: function(){
    var _this = this;
    var array = [1, 2, 3, 4, 5];
    console.log(array.map(function(item){
      return item + _this.value;
    }))
  },
  // Vedi su Babeljs come viene tradatto la arrow function:
  myArrowFunc: function(){
    var _this = this;
    var array = [1, 2, 3, 4, 5];
    console.log(array.map(item => item + this.value));
  }
};

obj.myFunc();
obj.myArrowFunc();
