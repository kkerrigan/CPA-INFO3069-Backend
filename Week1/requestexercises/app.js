//Load the request module
const request = require('request');
//Lets try to make an HTTP GET request to Fanshawe's website.
request('http://www.fanshawec.ca', (error, response, body) => {
    if (!error && response.statusCode === 200) {
        console.log(body); // Show the HTML for the Fanshawe homepage.
    }
});