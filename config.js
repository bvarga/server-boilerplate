var winston = require('winston')
  , _ = require('underscore')
  , config = function(){
    this.port = 1337;
    this.server = '127.0.0.1';
    this.mongodb = 'mongodb://127.0.0.1:27017/optika';
    this.clientdir = '../client/';

    switch(process.env.NODE_ENV){
      case 'production':
        this.port = process.env.VMC_APP_PORT
        this.server = '';
        this.mongodb = 'mongodb://127.0.0.1:27017/optika';
        break;
    }
  };

config.instance = null;

winston.setLevels(winston.config.npm.levels);
winston.add(winston.transports.File , { level: 'silly', filename: 'server.log' });
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { level: 'info', colorize: true });

winston.silly('winston silly test');
winston.debug('winston debug test');
winston.verbose('winston verbose test');
winston.info('winston info test');
winston.warn('winston warn test');
winston.error('winston error test');

winston.info('Node Environment', process.env.NODE_ENV);

config.getInstance = function() {
  if (this.instance === null) 
    this.instance = new config();
  return this.instance;
}

module.exports = config.getInstance();
