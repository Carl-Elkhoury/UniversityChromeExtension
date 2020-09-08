const express = require('express');
const app = express();
var cors = require('cors')
const port = 5270;
let initPageAndExtract = require('./index').initPageAndExtract;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/notifications', async (req, res) => {
    let notifications = await initPageAndExtract();
    res.send(notifications);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));