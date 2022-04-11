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

// cors config
app.use(cors())

// db
mongoose.connect("mongodb://localhost:27017/visionary", { useUnifiedTopology: true, useNewUrlParser: true });

// routes
app.use('/users', userRoutes);
app.use('/manga', mangaRoutes);

app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
})
