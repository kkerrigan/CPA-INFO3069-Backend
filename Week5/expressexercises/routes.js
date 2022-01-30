const express = require('express');
const router = express.Router();

//define a default route
router.get('/', (req, res) => {
    res.send(`this would be a response from the default root`)
});

//define a get route with a name parameter
router.get('/:name', (req, res) => {
    let name = req.params.name;
    res.send(`this would be a response using the ${name} parameter`)
});

module.exports = router;