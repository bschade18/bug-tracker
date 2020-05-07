const path = require('path');
const express = require('express');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

require('dotenv').config({ path: './config/config.env' });

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Routes
// change /issue routes to /issues
app.use('/issue', require('./routes/issues'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/user'));

app.use(errorHandler);

// server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
