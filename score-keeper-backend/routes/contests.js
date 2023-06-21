const express = require('express')
const fetchUser = require('../middleware/fetchUser')
const jwt = require('jsonwebtoken')
const router = express.Router()
require('dotenv').config()
const secret_key = process.env.SECRET_KEY
let contest_list = {}

// Create Contests
router.post('/createContest', fetchUser, (req, res)=> {
    try {
        let user_name = req.body.user_name;
        console.log(user_name)
        let date = Date.now()
        const jToken = jwt.sign({user_name, type:'JudgeKey'}, secret_key)
        const pToken = jwt.sign({user_name, type:'ParticipantKey'}, secret_key)
        const cToken = jwt.sign({user_name, type:'ContestKey'}, secret_key)
        console.log("TOKEN: ")
        console.log(contest_list[cToken])
        console.log(cToken in contest_list)
        if(user_name in contest_list) {
            res.status(400).send("One Contest is already live. Terminate Current Contest to start a new one");
            return;
        }
        console.log(req.body)
        let score_list = [];
        for(let i=0; i<req.body.participantCnt; i++) {
            score_list.push(0)
        }
        contest_list[user_name]={
            user_name:user_name,
            'contest-name':req.body['contest-name'],
            participantCnt:req.body.participantCnt,
            scores:score_list,
            date:date
        };
        console.log(contest_list)
        res.json({jToken, pToken, cToken})
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Unexpected Error")
    }
})

router.get('/leaderboard/:ctoken/:ptoken', (req, res)=> {
    try {
        console.log(req.params.ctoken)
        const ctoken = req.params.ctoken;
        const data = jwt.verify(ctoken, secret_key);
        console.log(data)
        const contest = contest_list[data.user_name]
        console.log(contest)
        res.status(200).json(contest)
    } catch(err) {
        console.log(err.message);
        res.status(400).send("INVALID TOKEN");
    }
})

module.exports = router