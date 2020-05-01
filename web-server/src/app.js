const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '../public');
const app = express();

app.use(express.static(publicDir));

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'It\'s hot as hell',
        location: 'Manila, Philippines'
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
