const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const fileUpload = require('express-fileupload')

mongoose.connect('mongodb://127.0.0.1:27017/apartment');



const apartmentRouter = require('./routes/apartment');
const maintenanceRouter = require('./routes/maintenance');
const serviceProviderRouter = require('./routes/serviceProvider');
const complain_Routes = require("./routes/Complain_Route");
const appointmentRouter = require ('./routes/appointment')
const imageRouter = require('./routes/UploadRoute');
const customerRouter = require('./routes/customers.js');
const otpRouter = require('./routes/otp.js');
const EmployeeRouter = require('./routes/Employee');
const imageRouter2 = require('./routes/UploadAmenityImage');
const productRouter = require('./routes/productRouter');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
  useTempFiles: true
}))

app.use('/apartment', apartmentRouter);
app.use('/maintenance', maintenanceRouter);
app.use('/service-provider',serviceProviderRouter);

//Routes to Complain

app.use("/complain",complain_Routes);


app.use('/appointment',appointmentRouter);
app.use('/upload',imageRouter);
app.use("/customer",customerRouter)
app.use("/sendOTP",otpRouter)
app.use('/employee',EmployeeRouter);
app.use('/service-provider', serviceProviderRouter);
app.use('/otp', otpRouter);
app.use('/employee', EmployeeRouter);
app.use('/api', imageRouter2);
app.use('/product', productRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var PORT = 5000;

app.listen(PORT, function (err) {
  if (err) alert('Error in server setup');
  console.log('Server listening on Port', PORT);
});

module.exports = app;
