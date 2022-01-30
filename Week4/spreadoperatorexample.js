//spread operator and arrays
let getOriginalCountries = () => {
  let origianlCountries = ['Camada<--origianl', 'USA<--origianl'];
  let endCountries = ['England<--End', 'Japan<--End'];

  origianlCountries.push(...endCountries); // appends on the end
  return origianlCountries;
};

let getAllCountries = () => {
  let original = getOriginalCountries();
  let beginCountries = ['Germany<--begin', 'Mexico<--begin'];

  original.unshift(...beginCountries); // appends to the beginning
  return original;
};

getAllCountries().map(country => console.log(country));

let foo =  (...args) => console.log(args[3]); // example of ... as REST operator

const arr = [1, 2, 3, 4, 5];

foo(...arr); // example of ... as spread operator, like calling foo(1,2,3,4,5)
// foo(arr) // undefined error because we are not passing an args[3] just 1 array.