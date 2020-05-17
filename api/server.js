const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Connect to our Database and handle an bad connections
mongoose
    .connect(process.env.DATABASE, { 
        useNewUrlParser: true, 
        useFindAndModify: false,
        useUnifiedTopology: true, 
        useCreateIndex: true  
    })
    .then(() => console.log("DB server connect"))
    .catch(error => console.log("DB error", error))


const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

app.use(morgan('dev'));
app.use(bodyParser.json());

if(process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: `${process.env.CLIENT_URL}`
    }));
}

//middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`connect on the port ${port} - ${process.env.NODE_ENV}`);
});