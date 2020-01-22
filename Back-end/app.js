const express = require('express');
const expressValidator = require('express-validator');
var passport   = require('passport')
var bodyParser = require('body-parser')
const db = require('./config/database');
var cors = require('cors');
const auth=require('./middlewares/auth')



app = express();
app.use(cors());

// Body Parser
bodyParser = {
  json: {limit: '50mb', extended: true},
  urlencoded: {limit: '50mb', extended: true}
};
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({limit: '50mb', extended: true}));

app.use(passport.initialize());
require('./config/passport')(passport);
// Routes
app.use('/', require('./routes/users'));
app.use('/services', require('./routes/services'));
app.use('/comments', require('./routes/comments'));
app.use('/skills',auth,require('./routes/skills'));
app.use('/users',require('./routes/users'));
app.use('/categories',require('./routes/categories'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
