const express = require('express');
const app = express();

const authRoutes = require('./routes/auth');

app.use('/api', authRoutes);

const port = process.env.port || 8000;

app.listen(port, () => {
    console.log(`connect on the port ${port}`);
});