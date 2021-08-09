const express = require('express');
const pool = require('../module/pool');
const todoRouter = express.Router();

// DB CONNECTION


//POST
//Notice how the URL only uses the /.
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
            res.sendStatus(201);
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

todoRouter.put('/:id', (req, res) => {
    // console.log('params', req.params);
    console.log('ready param', req.params.id);
    // let ready = req.params.ready;
    // console.log('ready variable check', ready);
    let sqlQuery = `
    UPDATE "todo" SET "iscompleted" =$1 WHERE id = $2;
  `;

    let sqlParams = [
        req.body.iscompleted, // $1
        req.params.id  // $2
    ]

    pool.query(sqlQuery, sqlParams)
        .then((dbRes) => {
            res.send(201);
        })
        .catch((err) => {
            console.log("post error", err);
            res.sendStatus(500);
        });
});


// DELETE
todoRouter.delete('/:id', (req, res) => {
    console.log('got them to delete', req.params.id);
    let idToDelete = req.params.id
    let sqlQuery = `DELETE FROM "todo" WHERE id=$1;`
    let sqlParams = [idToDelete]
    pool.query(sqlQuery, sqlParams)
        .then((dbRes) => {
            console.log('It works');

            res.sendStatus(200)
        }).catch((err) => {
            console.log('DELETE error', err);
            res.sendStatus(500)

        })
})

module.exports = todoRouter;