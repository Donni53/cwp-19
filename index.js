const express = require('express');
const bodyParser = require('body-parser');

const validator = require('./validator');

const app = express();

app.use(bodyParser.json());

app.post('/signin', postLogic);
app.post('/signup', postLogic);
app.post('/drinks', postLogic);
app.post('/recipes', postLogic);

function postLogic(req, res, next){
    const validationResult = validator.check(req.route.path, req.body);

    if (validationResult.error) {
        res.status(400).json({
            succeed: false,
            message: validationResult.error.details
        });
    } else {
        res.json({ succeed: true });
    }
}

app.listen(3000, () => console.log('Example app listening on port 3000!'));