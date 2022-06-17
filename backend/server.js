const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const costsRouter = require('./routes/costs');
const usersRouter = require('./routes/users');
const computesRouter = require('./routes/computes');

app.use('/costs', costsRouter);
app.use('/users', usersRouter);
app.use('/computes', computesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});