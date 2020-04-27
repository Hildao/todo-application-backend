// import express from "express";
// React apps get Transpiled
// This version of NodeJS does support import statements and there is no transpilation step

const serverlessHttp = require('serverless-http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Logically separate 4 sections of code according to the method of the HTTP request received

// Export a single function, called app

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/tasks', function (request, response) {
  // Should make a SELECT * FROM Tasks query to the DB and return the results
  response.status(200).send({
    tasks: [
      {
        Id: 1,
        Description: 'Wash the dishes',
        DueDate: '2020-04-12',
        Completed: true,
        UserId: 1
      },
      {
        Id: 2,
        Description: 'Learn React',
        DueDate: '2020-04-12',
        Completed: true,
        UserId: 1
      },
      {
        Id: 3,
        Description: 'call the Dentist',
        DueDate: '2020-04-13',
        Completed: false,
        UserId: 2
      },
    ],
  });
});

app.delete('/tasks/:id', function (request, response) {
  const id = request.params.id;
  //  Should delete the task with the specified ID from the database
  response.status(200).send(`Deleted task with ID ${id}!`);
});

app.post('/tasks', function (request, response) {
  const data = request.body;  //{}
  //  Should INSERT INTO the database the new task
  response.status(201).send(`New task of ${data.text} created`);
});

app.put('/tasks/:id', function (request, response) {
  const id = request.params.id;
  const data = request.body;
  //  Should UPDATE a task in the DB
  response.status(200).send(`Updated task with ID ${id} and data ${JSON.stringify(data)}`);
});

module.exports.app = serverlessHttp(app);