const rl = require('readline-sync')

const initRecord = (record) => {
    // user inputs values of each obj field
    let id = rl.question('Enter ID of record: ')
    let name = rl.question('Enter the name of your item(s): ')
    let amount = rl.question('Enter the amount of your item(s): ')
    let units = rl.question('Enter the units of your item(s): ')

    if(record !== undefined) { // edit record
        // if user skipped editing field it keeps its value
        if(id === '') id = record.id
        if(name === '') name = record.name
        if(amount === '') amount = record.amount
        if(units === '') units = record.units
        if(recordValidator({ id, name, amount, units}, 2)) {
            return { id, name, amount, units } // returns an object with user-entered fields
        } else {
            return false
        }
    }
    if(recordValidator({ id, name, amount, units })){ // validating new record
        return { id, name, amount, units }
    } else {
        return false
    }
}

const strToObj = (str) => {
    str = str.split('|') // split a string into an array of fields
    return { id: str[0], name: str[1], amount: str[2], units: str[3] } // returns an object with initialized fields
}
// checks if the record is valid
const recordValidator = (record, type = 1) => { // type 1 = new record, 2 = editing record
    if(type === 1) {
        if(record.id.trim() === '') {
            return false
        } else if(record.name.trim() === '') {
            return false
        } else if(isNaN(record.amount) || record.amount.trim() === '') {
            return false
        } else if(record.units.trim() === '') {
            return false
        } else {
            return true
        }
    } else if(type === 2) {
        if(isNaN(record.amount)) {
            return false
        } else {
            return true
        }
    }
}

module.exports = {
    initRecord,
    strToObj,
    recordValidator,
}