const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes')();

const log = console.log;

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
        if (title === '' || body === '') {
            return log(chalk.white.bgRed('Title or body cannot be empty string.'))
        }
        log(chalk.inverse('Adding a new note.'));
        const result = notes.addNote(title, body);
        if (result)
            return log(chalk.white.bgGreen('Successfully saved added note.'))
        log(chalk.white.bgRed('Note already exists.'))
    }
});

// remove
yargs.command({
    command: 'remove',
    describe: 'Remove a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        const { title  } = argv;
        if (title === '') {
            return log(chalk.white.bgRed('Title cannot be empty string.'))
        }
        log(chalk.inverse(`Removing ${title} note.`));
        const result = notes.removeNote(title);
        if (result)
            return log(chalk.white.bgGreen('Successfully removed note.'))
        log(chalk.white.bgRed('Note not found.'))
    }
});

// read
yargs.command({
    command: 'read',
    describe: 'Read a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        const { title  } = argv;
        if (title === '') {
            return log(chalk.white.bgRed('Title cannot be empty string.'))
        }
        log(chalk.inverse(`Searching ${title} note.`));
        const note = notes.readNote(title);
        if (note) {
            log(chalk.green(`Title: ${note.title}`));
            log(chalk.blue(`Body: ${note.body}`));
        } else {
            log(chalk.white.bgRed('Note not found.'))
        }
    }
});


// list
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: () => {
        log(chalk.inverse('Your notes.'));
        const result = notes.getNotes();
        result.forEach(note => {
            log(chalk.green(`Title: ${note.title}`));
        });
    }
});

yargs.parse();