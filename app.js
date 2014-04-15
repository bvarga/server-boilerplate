var 
  // config modules
    config = require('./config')
  , winston = require('winston')
  
  // express modules
  , express = require('express')
  , path = require('path')
  , favicon = require('static-favicon')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , session = require('express-session')
  , errorHandler = require('errorhandler')
  , stylus = require('stylus')
  
  , http = require('http')
  , app = express()
//  , mysql = require('./lib/mysql')
  , routes = require('./routes/index')
  
  , clientdir = path.resolve(__dirname, config.clientdir)
  ;

winston.info('Client path:', clientdir );
app.set('port', config.port);
app.set('views', path.join(clientdir, 'views'));
app.set('view engine', 'jade');
app.set('view options', { layout: false })

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'supersecretcatmeow', key: 'sid'}));

app.use(stylus.middleware({
    debug: true
  , src: path.join(clientdir, 'stylus') 
  , dest: path.join(clientdir, 'public')
  , compile: function (str, lpath) {
    return stylus(str)
      .set('filename', lpath)
      .set('warn', true)
      .set('compress', true)
      .define('url', stylus.url({ paths: [ path.join( clientdir, 'public','css')] }))
    }
}));

app.use(express.static(path.join(clientdir, 'public')));
app.use('/', routes);
app.use(errorHandler({ dumpExceptions: true, showStack: true }));
http.createServer(app).listen(config.port);
