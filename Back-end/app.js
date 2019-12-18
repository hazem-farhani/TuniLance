const express = require('express');
const expressValidator = require('express-validator');
const db = require('./config/database');

app = express();

// Body Parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use('/', require('./routes/users'));
app.use('/services', require('./routes/services'));
app.use('/comments', require('./routes/comments'));
app.use('/skills', require('./routes/skills'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));