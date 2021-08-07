const express = require('express');
const pool = require('../module/pool');
const todoRouter = express.Router();

// DB CONNECTION


//POST
todoRouter.post('/', (req, res) => {
    let task = req.body;
    let sqlQuery = `
            INSERT INTO "todo" ("task", "iscompleted")
            VALUES
	        ($1, $2);`
    let sqlParams = [req.body.task, req.body.iscompleted]
    pool.query(sqlQuery, sqlParams)
        .then((result) => {
            console.log("success in posting to DB");
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(500)
            console.log("we have an error", err);
        })

});

// GET
todoRouter.get('/', (req, res) => {
    let sqlQuery = `SELECT * FROM "todo";`
    pool.query(sqlQuery)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            res.sendStatus(500)
            console.log("we have an error", err);
        })

});


// PUT


// DELETE

module.exports = todoRouter;