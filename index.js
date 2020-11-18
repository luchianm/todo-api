// Require

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

// Initialization
const app = express();
app.use(bodyParser.json());
const port = 3001;
const server = app.listen(port,() => {
    console.log(`Server started at ${port}`);
});
app.use(bodyParser.json());

// Global parameters
const globalUrl = 'http://localhost:5984/todos';


// Routes

app.get('/', (req,res) => {
    res.send("Welcome to your To Do list:");
});

app.get('/todos/:view', getToDos);


// Posts
app.post('/new-todo', postNewTodo);
app.put('/:id/update', updateTodo);

// Functions

async function postNewTodo(req,res){
    try {
        const url = `${globalUrl}`;
        console.log(req.body);
        const { data } = await axios.post(url,req.body);
        res.send(data);
    }
    catch (e) {

    }
}

async function getToDos( { params: {view} } ,res) {
    try {
        const url = `${globalUrl}/_design/todos/_view/${view}`;
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

async function updateTodo(req,res){
    try{
        const todo = await axios.get(`${globalUrl}/${req.params.id}`);
        const url = `${globalUrl}/${todo.data._id}?rev=${todo.data._rev}`;
        console.log(url);
        const axiosResponse = await axios.put(`${globalUrl}/${todo.data._id}?rev=${todo.data._rev}`,req.body);
        res.send(axiosResponse);
    }
    catch (e) {

    }
}
