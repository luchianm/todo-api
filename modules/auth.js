const express = require('express');
const axios = require('axios');
const mailgun = require('mailgun-js');

const router = express.Router();

router.post('/login', login);

async function login (req, res){
    const url = 'http://localhost:5984/_session';
    const { data } = await axios.post(url,req.body);
    console.log(data);
    res.send(data);
    const email = {
        to: 'mihai@test.ro',
        from: "contact@crystalmatrix.com",
        subject: 'Hi',
        html: `<h1>hi ${name}</h1>`
    }
    mailgun.messages(email, (err, body) => {})
}

module.exports = router;