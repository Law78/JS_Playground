function test(opt){
	return function(){
		var opt = opt || 10;
		console.log(opt);
	}
}


function test2(opt){
	return function(){
		var opt2 = opt || 10;
		console.log(opt2);
	}
}

test(20)();
test2(20)();


var array = [1, 2, 3, 4, 5];
array.forEach(console.log);

var log = console.log;
log("Hello");
