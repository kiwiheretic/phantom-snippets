var cars = ["Saab", "Volvo", "BMW"];
console.log(cars);

var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
console.log(person);  // displays [object Object]
console.log( JSON.stringify(person, null, 4));


phantom.exit();