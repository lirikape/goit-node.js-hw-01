// const argv = require('yargs').argv;
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts()
        .then(contacts => console.table(contacts))
        .catch(error => console.error('Error listing contacts:', error));
      break;

    case 'get':
      getContactById(id)
        .then(contact => console.log(contact))
        .catch(error => console.error('Error getting contact:', error));
      break;

    case 'add':
      addContact(name, email, phone)
        .then(newContact => console.log('Contact added:', newContact))
        .catch(error => console.error('Error adding contact:', error));
      break;

    case 'remove':
      removeContact(id)
        .then(removedContact => {
          if (removedContact) {
            console.log('Contact removed:', removedContact);
          } else {
            console.log('Contact not found.');
          }
        })
        .catch(error => console.error('Error removing contact:', error));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
