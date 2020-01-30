const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {

    // db('accounts') 
    //     .then( accounts => {
    //         res.status(200).json(accounts)
    //         console.log(accounts)
    //     })
    //     .catch ( err => {
    //         res.status(500).json({error: "Failed to retreive accounts"})
    //     })
    
    try {
        const accounts = await db('accounts');
        res.json(accounts);
    } catch (err) {
        res.status(500).json({error: "Failed to retrieve accounts"});
    }

});

module.exports = server;