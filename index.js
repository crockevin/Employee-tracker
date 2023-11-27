const inquirer = require('inquirer')
const { inquirerRep } = require('./assets/questions')

function init() {
    inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
            name: 'choice',
        }
    )
        .then((answer) => {
            const choice = answer.choice
            inquirerRep(choice)
        })
}

init()