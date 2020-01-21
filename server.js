const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const cors = require('cors');
const config = require('config');
//require('dotenv').config();
const PORT = 8080;

// Setup express app
const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
const urlString = 'mongodb://localhost:27017/sms_db';

const Public_Key =
  'BDoMxb4OYULOpUmdGBhRs69fLhtBeYDAPRf_VL2p8wpjCn7LesynsTzTJU5Kwi_1KHdFnjzLpVJVZEYvcHYSkDY';
const Private_Key = 'KWy5VBFHiQLms8_LTKlTIFm7SqywbwwpKpG5_IRfGxo';
webpush.setVapidDetails('mailto:jonhzono@gmail.com', Public_Key, Private_Key);

mongoose.connect(urlString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
mongoose.connection
  .once('open', () => console.log('Database connected!'))
  .on('error', error => console.log('Could not connect', error));

//@API ROUTE
app.use('/api/admin', require('./route/api/admin'));
app.use('/api/lists', require('./route/api/listsData'));
app.use('/api/user', require('./route/api/user'));
app.use('/api/staff', require('./route/api/staff'));
app.use('/api/student', require('./route/api/student'));
app.use('/api/classfeedback', require('./route/api/classFeedback'));
app.use('/api/analyze', require('./route/api/analyze'));
app.use('/api/post', require('./route/api/post'));
app.use('/api/exam', require('./route/api/examScore'));
app.use('/api/duefee', require('./route/api/dueFee'));

app.get('/', (req, res) => {
  res.send('SMS Backend Server');
});
app.listen(PORT, () => console.log(`Node JS is running on port ${PORT}`));
