Array.prototype.where = function (inclusionTest) {
  let results = [];
  this.map(function(elem){
    if(inclusionTest(elem)){
      results.push(elem);
    }
  });
  return results;
};

Array.prototype.select=function(projection){
  let results = [];
  this.map(function(elem){
    results.push(projection(elem));
  });
  return results;
};

var items = [1,2,3,4,5,6,7,8,9,10];
console.log(items.where(function(thing){ return thing % 2 ==0;}));
let children = [{ id: 1, Name: "Lorenzo" },
{ id: 2, Name: "Giuseppe" },
{ id: 3, Name: "Giordano" },
{ id: 4, Name: "Federico" },
{ id: 5, Name: "Carmen" }];
let filteredChildren = children.where(function (x) {
  return x.id % 2 == 0;
}).select(function (x) {
  return x.Name;
});
console.log(filteredChildren);
