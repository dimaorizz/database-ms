const fs = require('fs') // importing file system module

const utils = require('./utils') // importing utils.js

const create = (record, filename) => {
    const records = read(filename) // gets all the records from the file

    if(records) {
        for(let i = 0; i < records.length; i++) { // checks if there is a record with same id
            if(records[i].id === record.id) {
                return false
            }
        }
    }

    let strRecord = ''; // declaring record of str type ''

    if(fs.readFileSync(filename).toString().length !== 0){ // if the file is not empty
        strRecord += '\n' // adding a new line symbol
    }

    strRecord += `${record.id}|${record.name}|${record.amount}|${record.units}` // adding a record
    fs.appendFileSync(filename, strRecord) // writing a record into file
    return true
    
}

const read = (filename) => {
    if(fs.readFileSync(filename).toString().length === 0) { // if file is empty
        return false
    } else {
    const records = [] // array of records
    // getting fileContent, casting input to String, creating an array of records,
    // each records pushing into records array
    fs.readFileSync(filename).toString().split('\n').forEach((el) => records.push(utils.strToObj(el)))
    return records
    }
}

const edit = (filename, idToEdit) => {
    const records = read(filename) // get all the records from file
    let idFound = false // flag if there is a record with id === idToEdit

    for(let i = 0; i < records.length; i++) { // iterating records
        if(records[i].id === idToEdit) {
            records[i] = utils.initRecord(records[i]) // creating new record instead of old record
            if(!records[i]) return false
            idFound = true
            break;
        }
    }
    if(idFound) { // if file with this id found
        fs.writeFileSync(filename, '') // clearing the file
        records.forEach(rec => create(rec, filename)) // rewriting our records into the file
        return true
    } else {
        return false
    }
}

const del = (filename, idToDelete) => {
    const records = read(filename) // get all the records from the file

    let idFound = false // flag if there is a record with id === idToDelete

    for(let i = 0; i < records.length; i++) { // iterating records
        if(records[i].id === idToDelete) {
            idFound = true
            break;
        }
    }

    if(!idFound) {
        return false;
    } else {
        for(let i = 0; i < records.length; i++) { // iterating records
            if(records[i].id === idToDelete) {
                records.splice(i, 1) // deleting record
                break;
            }
        }
        fs.writeFileSync(filename, '') // clearing the file
        records.forEach(rec => create(rec, filename)) // rewriting our records into the file
    }
    return true
}

module.exports = {
    create,
    read,
    edit,
    del
}