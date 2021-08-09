const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000; // 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

const router = require('./routes/tasks.router');

//this ensure the connection between the router and the server 
app.use('/tasks', router);

//This is the port that listens to the other connections 
app.listen(PORT, () => {
    console.log(`Server is Active - http://localhost:${PORT} 💫`);
});