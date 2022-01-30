// Arrow Functions Example #1 - basic syntax 2 parameters
// eS5
 //var multiply = function(x, y) {
    //return x*y;
//};
//console.log('es5 answer = ' + multiply(4,3))
//
// eS6/eS2015
let multiply = (x, y) => { return x * y };
// fyi - braces are not required if only one expression is present.
// The preceding example could also be written as:
// let multiply = (x, y) => x * y;
console.log(`es6 answer = ${multiply(4,3)}`);

// Arrow Functions Example #2 - returning objects
// eS5
//var setValuesWithEs5 = function setValues(id, name, age) {
    //return {id: id, name: name, age: age};
//};

//var student = setValuesWithEs5(2,'Kristian',23)
//console.log('id: ' + student.id + ' name: ' + student.name + ' age: ' + student.age);
// eS6/es2015
let setValuesWithEs6 = (id, name, age) => ({ id: id, name: name, age: age });
let student = setValuesWithEs6(3,'Kristian',24);
console.log(`id: ${student.id} name: ${student.name} age: ${student.age}`);

// Arrow Functions Example #3 solve "this" lexical scope issue in es5
// here is the issue:
//var dog = {name: 'Rufus', color: 'tan', age: 5,

//printInfo: function() {
 // 1st logging works as expected this is a Object (dog)
 //console.log(Object.prototype.toString.call(this));
 //console.log('Name:', this.name, 'Color:', this.color, 'Age:', this.age);

 // 2nd logging, loses scope, this is a Object (node's global Object)
//nestedFunction = function() {
//console.log(Object.prototype.toString.call(this));
//console.log('Name:', this.name, 'Color:', this.color, 'Age:', this.age);
 //}

//nestedFunction();
 //}
 //}
//dog.printInfo(); //prints Name: window Color: undefined Age: undefined

// es5 way of solving problem - copy this to a different var (that)
//
// es2015 way no need for separate var when using fat arrows
let dog = { name: 'Kristian', color: 'tan', age: 5,

    printInfo: function() {
 // 1st logging works as expected this is a Object (dog)
console.log(Object.prototype.toString.call(this));
console.log('Using ES6==> Name:', this.name, 'Color:', this.color, 'Age:', this.age);
// // 2nd logging, scope retained this is still a Object (dog)
 nestedFunction = () => {
     console.log(Object.prototype.toString.call(this));

 console.log(`Using ES6==> Name:, ${this.name}, Color:, ${this.color}, Age:, ${this.age}`);
 };
 nestedFunction();
 }
 };
 dog.printInfo(); // prints Name: Color:, Age: correctly