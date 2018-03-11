var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var db = require('./db.js');

var apiResponse = require('./app/apiResponse');

var index = require('./routes/index');
var api = require('./routes/api1');

var app = express();

// view engine setup
// As this is API only, this can be removed
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public/stylesheets'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
  prefix: '/stylesheets',
  debug: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/1', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(new apiResponse({}, req, err));
});

module.exports = app;
