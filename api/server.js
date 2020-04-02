const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const authRoutes = require('./routes/auth');

app.use(morgan('dev'));
app.use(bodyParser.json());

if(process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: `http://localhost:3000`
    }));
}

app.use('/api', authRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`connect on the port ${port} - ${process.env.NODE_ENV}`);
});