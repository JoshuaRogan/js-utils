"use strict";

/**
 * Pretty printing console logger for CLI node applications
 * 
 */

import winston from 'winston';
import chalk from 'chalk';

//Options 
let debug = false; 
let divider = true; 

//Basic Winston Logger
winston.loggers.add('logger', {
    console: {
      level: 'silly',
      colorize: true,
      prettyPrint: true,
      label: false,
      showLevel : true
    }
});

/**
 * Log all of the arguments with winston 
 * 
 */
function logger(){
  if(divider) console.log('\n------------START WINSTON------------');
  for(let i=0; i < arguments.length; i++){
    log(arguments[i]);
    if(i !== arguments.length - 1) {
      console.log('');
    }
  }
  if(divider) console.log('-------------END WINSTON-------------\n');
}


/**
 * Log one argument not crashing on Winston errors
 * 
 * @param  {mixed} arg 
 */
function log(arg){
  try {
    winston.loggers.get('logger').info(arg);
  }
  catch(err){
    if(debug) console.error(chalk.red('[WINSTON ERROR]'), chalk.bold.red(err)); 
    console.log(arg); 
  }
}

module.exports = logger;

