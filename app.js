const express = require('express');
const mongoose = require('mongoose');
const port = 4000;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./users/routes')
const mangaRoutes = require('./mangas/routes')
// body parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
require('dotenv').config();

// cors config
app.use(cors())

// db
mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

// routes
app.use('/users', userRoutes);
app.use('/manga', mangaRoutes);

app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
})
