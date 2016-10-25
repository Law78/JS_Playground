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
