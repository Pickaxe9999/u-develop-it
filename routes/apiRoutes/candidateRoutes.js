const express = require('express');
const router = express.Router();
const db = require('../../db/connection.js');
const inputCheck = require('../../utils/inputCheck.js');

//return all the data in the candidates table
router.get('/candidates', (req, res) => {
    const sql = `SELECT candidates.*, parties.name AS party_name FROM candidates LEFT JOIN parties ON candidates.party_id = parties.id`;

    db.query(sql, (err, rows) => {
        if(err){
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
    })
})

//select a single candidate from the table
router.get('/candidate/:id', (req, res) => {
    const sql = `SELECT candidates.*, parties.name AS party_name FROM candidates LEFT JOIN parties ON candidates.party_id = parties.id WHERE candidates.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if(err){
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: row
        })
    })
})

//create a candidate
router.post('/candidate', ({body}, res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
    if(errors){
        res.status(400).json({error: errors})
        return;
    }

    //if no errors were found in the input then add the candidate to the database
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];

    db.query(sql, params, (err, result) => {
        if(err){
            res.status(400).json({error: err.message})
            return;
        }
        res.json({
            message: 'success',
            data: body
        })
    })
})

//delete a candidate
router.delete('/candidate/:id', (req, res) =>{
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if(err){
            res.statusMessage(400).json({error: message});
        }else if(!result.affectedRows){
            res.json({
                message: 'Candidate not found!'
            })
        }else{
            res.json({
                message: 'Candidate Deleted',
                changes: result.affectedRows,
                id: req.params.id
            })
        }
    })
})

//update a candidates party
router.put('/candidate/:id', (req, res) => {
    const errors = inputCheck(req.body, 'party_id');
    if(errors){
        res.status(400).json({error: errors});
        return;
    }

    const sql = `UPDATE candidates SET party_id = ? WHERE id = ?`;
    const params = [req.body.party_id, req.params.id];

    db.query(sql, params, (err, result) => {
        if(err){
            res.status(400).json({error: err.message});
            return;
        }else if(!result.affectedRows){
            res.json({message: 'Candidate not found!'});
        }else{
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            })
        }
    })
})

module.exports = router;