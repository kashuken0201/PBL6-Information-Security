require('dotenv').config();
const authRouter = require('express').Router();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const network = require('./fabric/network.js');
const router = require('./routes/index.js');

async function main() {

    await network.enrollAdmin(true, false);
    await network.enrollAdmin(false, true);
    const app = express();

    app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use(cors());

    app.use('/', router);

    const port = process.env.PORT || 8080;
    app.listen(port, () => {
        console.log(`Server running at ${port}/`);
    });
}

main();
