const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes')();

// Customize yargs version
yargs.version('1.1.0')

// add
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        },
    },
    handler: (argv) => {
        const { title, body } = argv;
        console.log('Adding a new note!')
        console.log(chalk.green(`Title: ${title}`));
        console.log(chalk.blue(`Body: ${body}`));
    }
});

// remove
yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    handler: () => {
        console.log('Removing a new note!')
    }
});

// read
yargs.command({
    command: 'read',
    describe: 'Read a new note',
    handler: () => {
        console.log('Readinging a new note!')
    }
});


// list
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: () => {
        console.log('Linsting all notes!')
    }
});

yargs.parse();