const rl = require('readline-sync') // importing module for interactive console reading
//importing user modules
const dbAPI = require('./dbAPI')
const utils = require('./utils')

const filename = "db.txt"
let userCommand = '-1'; // used for menu

console.log('Welcome to Database management system by Dmitry Kravtsov!\nBefore you begin create make sure you have a db.txt in project root directory\n') // greeting

do {
    console.log('1. Create\n2. Read\n3. Edit\n4. Delete\n0. Quit\n')
    userCommand = rl.question('Input your command: ')

    switch (userCommand) { // user menu
        case '1':
            let record;
            record = utils.initRecord(record)

            if(!record) { // if not valid input
                console.log('\nError! Wrong input detected!\n')
                continue
            }

            if(!dbAPI.create(record, filename)) {
                console.log('\nNot saved! There is a record with same ID!\n')
            } else {
                console.log('\nRecord saved successfully!\n')
            }

            break;
        case '2':
            const records = dbAPI.read(filename)

            if(!records) {
                console.log('\nYou have no records yet!\n')
            } else {
                console.log(`\nYou have ${records.length} record(s)\n`)
                records.forEach(record => console.log(`ID: ${record.id}\nName: ${record.name}\nAmount: ${record.amount}\nUnits: ${record.units}\n`))
            }
            
            break;
        case '3':
            const idToEdit = rl.question('Enter ID of record to edit: ')

            if(!dbAPI.edit(filename, idToEdit)) {
                console.log('\nNot edited! No record with this ID or wrong input detected!\n')
            } else {
                console.log('\nRecord edited successfully!\n')
            }

            break;
        case '4':
            const idToDelete = rl.question('Enter ID of record to delete: ')

            if(!dbAPI.del(filename, idToDelete)) {
                console.log('\nNot deleted! No record with this ID!\n')
            } else {
                console.log('\nRecord deleted successfully!\n')
            }

            break;
        case '0':
            do {
                userCommand = rl.question('Are you sure? (Y/N): ')
                
                if(userCommand.toUpperCase() === 'Y' || userCommand.toUpperCase() === 'N') break

            } while (true);
            
            if(userCommand.toUpperCase() === 'Y') {
                console.log('\nBye!')
                userCommand = '-1'
            } else {
                console.log('');
                continue;
            }
            break;
        default:
            console.log('Input a correct command!')
            break;
    }
} while (userCommand !== '-1');