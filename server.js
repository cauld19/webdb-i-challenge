const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

const AccountHandler = require('./accounts/accountDb');

server.get('/', async (req, res) => {

    // const { name } = req.query;
    
    console.log(req.query);

    AccountHandler.get(req.query)
        .then( accounts => {
            res.status(200).json(accounts)
        })
        .catch ( err => {
            res.status(500).json({error: "Failed to retreive accounts"})
        })

            
    // try {
    //     const accounts = await db('accounts');
    //     res.json(accounts);
        
    // } catch (err) {
    //     res.status(500).json({error: "Failed to retrieve accounts"});
    // }
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
});

server.put('/:id', async (req, res) => {
    const updateData = req.body;

    try {
        console.log(updateData);
        const account = await db('accounts').update(updateData).where('id', req.params.id);
        console.log(account);
        res.json(account);
        
    } catch (err) {
        res.status(500).json({error: "Failed to post data"});
    }
});

server.delete('/:id', async (req, res) => {
    try {
        const account = await db('accounts').where('id', req.params.id).del();
        res.json(account);
    } catch (err) {
        res.status(500).json({error: "Failed to delete data"});
    }
})
module.exports = server;