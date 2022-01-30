// sample function using REST operator ...
let calculateTotalCost = (id, name, ...costs) => {
    let totalCost = 0;
    // if no costs come in then we will get an empty array
    costs.forEach(amount => (totalCost += amount));

    // send the JSON back including the newly calculated total
    return {
        productId: id,
        productNmae: name,
        totalCost: totalCost
    };
};

// define some costs related to a product
let mfgCost = 1000.00;
let shipping = 12.99;
let taxes = 5.43;
let insurance = 3.22;

// call the function and pass all variables
let productInfo = calculateTotalCost(1, 'Widget', mfgCost, shipping, taxes, insurance);
let fmtCost = productInfo.totalCost.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
console.log(`Product ${productInfo.productNmae} has a total cost of ${fmtCost}`);
