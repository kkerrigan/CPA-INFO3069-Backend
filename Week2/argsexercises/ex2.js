process.argv.forEach((val, index, array) => {
   if(index === 2 || index ===3) { // look for the first 2 args
       switch(val) {
           case 'on' :
               console.log(`We've entered an argument for Ontario`);
               break;
           case 'ab' :
               console.log(`We've entered an argument for Alberta`);
               break;
           case 'bc' :
               console.log(`We've entered an argument for British Columbia`);
               break;
           default :
               console.log(`Arguemnt ${val} is not a provincial argument`);
       }
   }
});