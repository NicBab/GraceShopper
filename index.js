const express = require('express');
const cors = require('cors');
const server = express();

const morgan = require('morgan');
server.use(morgan('dev'));

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const path = require('path');
server.use(express.static(path.join(__dirname, 'build')));

server.use('/api', require('./routes'));

server.use((req, res, next) => {
    res.sendFile(paht.join(__dirname, 'build', 'index.html'))
});

const { client } = require('./db');

const PORT = process.envPORT || 5000;
server.listen(PORT, async () => {
    console.log(`Server is running on port ${ PORT}!`);

    try {
        await client.connect()
        console.log('Database is open for business!');
        
    } catch (error) {
      console.error("Database is closed for repairs!\n", error)
    }
});

