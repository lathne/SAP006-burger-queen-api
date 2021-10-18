require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./server/routes/index');

const app = express();
const port = process.env.PORT || 3000;

// atribuindo o midware do cors, que vai tratar as requisições cruzadas
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(port);
