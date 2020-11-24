// Require

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const joi = require('joi');

// Initialization
const app = express();
app.use(bodyParser.json());
const port = 3001;
const server = app.listen(port,() => {
    console.log(`Server started at ${port}`);
});
app.use(bodyParser.json());

// Global parameters
const databaseUrl = 'http://localhost:5984/todos';

// Validation

const todoValidation = joi.object({
        title: joi
            .string()
            .alphanum()
            .min(3)
            .max(50)
            .required(),

        project: joi
            .string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        description: joi
            .string()
            .max(250),

        responsible: joi
            .string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        hoursBooked: joi
            .string()
            .alphanum(),

        createdAt: joi
            .string()
            .required(),

        startedAt: joi
            .string(),

        finishedAt: joi
            .any(),

        state: joi
            .string()
            .required(),

        deleted: joi
            .boolean()
            .required(),

});


// Routes

app.get('/', (req,res) => {
    res.send("Welcome to your To Do list:");
});

app.get('/todos/:view', getToDos);


// Posts
app.post('/new-todo', postNewTodo);
app.put('/update/:id', updateTodo);

// Functions

async function postNewTodo(req,res){

    try {
        const validation  = todoValidation.validate(req.body);
        console.log(validation.error);
        if (typeof (validation.error) == "undefined"){
            const url = `${databaseUrl}`;
            const { data } = await axios.post(url,validation);
            console.log('validation complete');
            res.send(data);
        }
        else {
            console.log(validation.error.details);
            res.send(validation.error.details);
        }
    }
    catch (e) {

    }
}

async function getToDos( { params: {view} } ,res) {
    try {
        const url = `${databaseUrl}/_design/todos/_view/${view}`;
        const { data } = await axios.get(url);
        console.log(data);
        res.send(data.rows.map(obj => {
            return {
                _id: obj.value._id,
                title: obj.value.title,
                description: obj.value.description,
                responsible: obj.value.responsible,
                createdAt: obj.value.createdAt,
                state: obj.value.state,
                deleted: obj.value.deleted
            }
        }));
    }
    catch (e) {

    }
}

// comment

async function updateTodo ( req,res){
    try{
        const url = `${databaseUrl}/${req.params.id}`;
        const todo = await axios.get(url);
        Object.keys(req.body).forEach(
            key => {
                if (todo.data[key]){
                todo.data[key] = req.body[key];
                    }
                else{
                    console.log("no such parameter");
                }
            }
        );

       const response = await axios.put(url,todo.data);
       console.log(response.data);
       res.send(response.data);

    }
    catch (e) {

    }
}

