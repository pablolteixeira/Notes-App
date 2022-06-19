const fs = require('fs')

const addNote = (title, body) => {
    const notes = loadNote()

    const duplicateNotes = notes.filter(item => item.title == title)

    if (duplicateNotes.length === 0) {
        notes.push({
            title:  title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const removeNote = (title) => {
    const notes = loadNote()

    const newNotes = notes.filter(item => item.title !== title)

    if (notes.length === newNotes.length) {
        console.log('Title not found!')
    } else {
        saveNotes(newNotes)
        console.log('Title removed!')
    }

}

const listNote = () => {
    const notes = loadNote()
    notes.forEach(item => console.log(`Title: ${item.title} - Body: ${item.body}`))
}

const readNote = title => {
    const notes = loadNote()
    notes.filter(item => item.title === title)

    if (notes.length > 0) {
        console.log(`Title: ${notes[0].title} - Body: ${notes[0].body}`)
    } else {
        console.log('Title not found!')
    }
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNote = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch(e){
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}