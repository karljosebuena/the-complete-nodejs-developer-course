const chalk = require('chalk');
const notes = require('./notes')();

notes.getNotes();

console.log(chalk.inverse('Success!'));