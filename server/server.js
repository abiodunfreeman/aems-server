const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');

//inits app
const app = express();

// Load env variables
dotenv.config({ path: './config/config.env' });

// Body Parser
app.use(express.json());
