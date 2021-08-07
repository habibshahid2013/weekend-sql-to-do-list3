const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000; // 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

const tasks = require('./routes/tasks.router');
app.use('/tasks', tasks);

app.listen(PORT, () => {
    console.log(`Server is Active - http://localhost:${PORT} 💫`);
});