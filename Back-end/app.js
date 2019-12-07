const express = require('express');
const db = require('./config/database');

app = express();

// Body Parser
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/', require('./routes/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));