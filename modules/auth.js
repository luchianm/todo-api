const express = require('express');
const axios = require('axios');
const mailgun = require('mailgun-js');
const joi=require('joi');

const router = express.Router();

router.post('/login', login);

const schema = joi.object({
    username: joi
        .string()
        .alphanum()
        .min(3)
        .max(50)
        .required(),
    password: joi
        .string()
        .min(3)
        .max(50)
        .required()
});

async function login ({body}, res){
    const url = 'http://localhost:5984/_session';
    await schema.validateAsync(body);
    const { data } = await axios.post(url,body);
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