const path = require('path');
const express = require('express');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

require('dotenv').config({ path: './config/config.env' });

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Router files
const issueRouter = require('./routes/issues');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

// Mount routers
app.use('/issue', issueRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);

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
