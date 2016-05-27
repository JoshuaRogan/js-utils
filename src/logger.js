"use strict";

/**
 * Pretty printing console logger for CLI node applications
 * 
 */

import winston from 'winston';
import chalk from 'chalk';

//Options 
let debug = false; 
let divider = false; 
let compact = true; 
let level = true;

//Basic Winston Logger
winston.loggers.add('logger', {
    console: {
      level: 'silly',
      colorize: true,
      prettyPrint: true,
      label: false,
      showLevel : level
    }
});

/**
 * Log all of the arguments with winston 
 * 
 */
function logger(){
  if(!compact) newLine(); 
  if(divider) console.log('\n------------START WINSTON------------');
  for(let i=0; i < arguments.length; i++){
    log(arguments[i]);
    if(i !== arguments.length - 1) {
      console.log('');
    }
  }
  if(divider) console.log('-------------END WINSTON-------------\n');
  if(!compact) newLine(); 
}

function newLine(){
  console.log(''); 
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
module.exports.setDebug = function(bool){debug = bool ? true : false;};
module.exports.setDivider = function(bool){divider = bool ? true : false;};
module.exports.setCompact = function(bool){compact = bool ? true : false;};
module.exports.setLevel = function(bool){level = bool ? true : false;};
