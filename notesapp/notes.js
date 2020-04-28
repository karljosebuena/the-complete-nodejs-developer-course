const fs = require('fs');

const fileName = 'notes.json';

function notes() {
    const getNotes = _ => {
        try {
            const notes = fs.readFileSync(fileName).toString();
            const parsedNotes = JSON.parse(notes);
            return parsedNotes;
        } catch (error) {
            return [];
        }

    }
    const readNote = title => {
        const currentNotes = getNotes();
        const foundNote = currentNotes.find(note => note.title === title);
        return foundNote;
    }
    const addNote = (title, body) => {
        const currentNotes = getNotes();
        const foundNote = currentNotes.find(note => note.title === title);
        if (!foundNote) {
            currentNotes.push({
                title,
                body
            });
            saveNotes(currentNotes);
        }
        return !foundNote;
    }
    const removeNote = title => {
        const currentNotes = getNotes();
        const updatedNotes = currentNotes.filter(note => note.title !== title);
        if (currentNotes.length !== updatedNotes.length) {
            saveNotes(updatedNotes);
        }
        return currentNotes.length !== updatedNotes.length;
    }
    const saveNotes = notes => {
        const stringifyNotes = JSON.stringify(notes);
        fs.writeFileSync(fileName, stringifyNotes);
    }
    return {
        getNotes,
        readNote,
        addNote,
        removeNote
    }
}
module.exports = notes;