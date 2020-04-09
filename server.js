const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const errorHandler = require('./middleware/error');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const issueRouter = require('./routes/issues');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

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
