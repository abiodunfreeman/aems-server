const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');

//inits app
const app = express();

// Load env variables
dotenv.config({ path: './config/config.env' });

// Body Parser
app.use(express.json());

//Cors
app.use(cors());

app.get('/', (req, res, next) => {
  res.status(200).json({ fuck: 'you' });
});

const startServer = async () => {
  const PORT = process.env.PORT;
  const portString = `${PORT}`.brightYellow;

  const server = app.listen(PORT, () => {
    console.log(
      ` Server running in ${process.env.NODE_ENV} , App listening on port ${portString}!`
        .yellow.bold
    );
  });
};
startServer();
