import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverPort } from '../etc/config.json';

import * as db from './utils/DataBaseUtils';

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

app.get('/', (req, res) => {
    //res.send("hello main2");
    db.listNotes().then(data => res.send(data));
});

app.get('/notes', (req, res) => {
    db.listNotes().then(data => res.send(data));
});

// RESTful api handlers
app.get('/notes', (req, res) => {
    db.listNotes().then(data => res.send(data));
});

app.post('/notes', (req, res) => {
    db.createNote(req.body).then(data => res.send(data));
});

app.delete('/notes/:id', (req, res) => {
    db.deleteNote(req.params.id).then(data => res.send(data));
});

//
//Project routing
//

app.get('/projects', (req, res) => {
    db.listProjects().then(data => res.send(data));
});

app.put('/project', (req, res) => {
    db.createProject(req.body).then(data => res.send(data));
});

app.delete('/project/:id', (req, res) => {
    db.deleteProject(req.params.id).then(data => res.send(data));
});

app.post('/project', (req, res) => {
    db.updateProject(req.body).then(data => res.send(data));
});

const server = app.listen(serverPort, function () {
    console.log(`Server is up and running on port ${serverPort}`);
});
