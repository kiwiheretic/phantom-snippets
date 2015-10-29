function hello() {
	console.log("hello");
}

hello();
var x = "hello()";
eval(x);
phantom.exit();
