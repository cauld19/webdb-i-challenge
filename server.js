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


server.get('/:id', async (req, res) => {

    try {
        const accounts = await db('accounts').where('id', req.params.id);
        res.json(accounts)
    } catch (err) {
        res.status(500).json({error: "Failed to retrieve account"});
    }
})

server.post('/', async (req, res) => {
    const accountData = req.body;

    try {
        const accounts = await db('accounts').insert(accountData);
        res.json(accounts)
    } catch (err) {
        res.status(500).json({error: "Failed to post account"});
    }
})

module.exports = server;