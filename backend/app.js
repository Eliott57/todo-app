require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');

const user = process.env.MONGO_USER;
const pwd = process.env.MONGO_PWD;
const cluster = process.env.MONGO_URL;
const db = process.env.MONGO_DB;
const port = process.env.MONGO_PORT;

mongoose.connect(
    `mongodb://${cluster}:${port}/${db}`,
{
        pass: pwd,
        user: user,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((e) => console.log(e, 'Connexion à MongoDB échouée'));

const todosRoutes = require('../routes/Todo/routes.js');
const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3001'
}));

app.use('/ping', (req, res) => {
    res.status(200).send('PING OK');
});

app.use('/api/v1/todos', todosRoutes);

module.exports = app;

