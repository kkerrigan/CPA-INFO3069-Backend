require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const myroutes = require('./project1routes');

const app = express();
const port = process.env.PORT || 5000;

/*app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","OPTIONS, GET, POST, PUT, DELETE");
    next()
});*/

app.use(express.static("public"));

//parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/project1', myroutes);

app.get('/', (req, res) => {
    res.send('\n\nHello world!\n\n')
});

app.listen(port, () => {
    console.log(`listening on port ${ port } using ${process.env.NODE_ENV}`)
});