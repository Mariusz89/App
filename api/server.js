const express = require('express');

const app = express();

app.get('/api/signup', (req, res) => {
    res.json({
        data: 'You hit signup endpoint OK'
    });
});

const port = process.env.port || 8000;

app.listen(port, () => {
    console.log(`connect on the port ${port}`);
});