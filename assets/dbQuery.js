const db = require('../config/connection')
const consoleTable = require('console.table')
const inquirer = require('inquirer')
const isNumber = require('is-number')

function viewDepartments() {//gets department list and logs it
    getDepartmentList()
        .then(([data]) => {
            console.table(data)
        })
}

function viewRoles() {//gets roles list and logs it
    getRoleList()
        .then(([data]) => {
            console.table(data)
        })
}

function viewEmployees() {//gets employee list and logs it
    getEmployeeList()
        .then(([data]) => {
            console.table(data)
        })
}

function addDepartment() {
    inquirer.prompt(
        {
            type: 'text',
            message: 'What would be the name of this department',
            name: 'depName'
        })
        .then((data) => {
            db.promise().query('INSERT INTO department (name) VALUES (?)', data.depName)// adds department based on user input
            viewDepartments()// shows result
        })

}

function addRole() {
    getDepartmentList()
        .then(([data]) => {
            const listOfDepartment = data.map((department) => ({// stores a list of departments and their id so user can choose from them
                name: department.name,
                value: department.id
            }))
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What would the name of this role be',
                    name: 'title'
                },
                {
                    type: 'input',
                    message: 'What is the salary of this role',
                    name: 'salary',
                    validate: input => {
                        if (isNumber(input)) {//checks to see if input is a number
                            return true
                        }
                        return 'Please enter a number'
                    }
                },
                {
                    type: 'list',
                    message: 'What is the department',
                    name: 'depId',
                    choices: listOfDepartment
                }]).then((data) => {
                    db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [data.title, data.salary, data.depId])//query to add role
                    viewRoles()// shows result
                })
        })

}

function addEmployee(first, last, roleId, manId) {
    getRoleList()
        .then(([data]) => {
            const listOfRoles = data.map((role) => ({// stores a list of roles and their id so user can choose from them
                name: role.title,
                value: role.id
            }))
            inquirer.prompt([
                {
                    type: 'input',
                    message: 'What is the employee first name',
                    name: 'first'
                },
                {
                    type: 'input',
                    message: 'What is the employee last name',
                    name: 'last'
                },
                {
                    type: 'list',
                    message: 'What is their role',
                    choices: listOfRoles,
                    name: 'roleId'
                },
                {
                    type: 'input',
                    message: 'what is the manager id',
                    name: 'manId'
                },
            ]).then((emp) => {
                if (emp.manId.trim() !== '') {//queries based on if manager_id is blank or not
                    db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)', [emp.first, emp.last, emp.roleId, emp.manId])
                    viewEmployees()// shows result
                } else {
                    db.promise().query('INSERT INTO employee (first_name, last_name, role_id) VALUES(?, ?, ?)', [emp.first, emp.last, emp.roleId])
                    viewEmployees()// shows result
                }
            })
        })


}

function updateEmployee() {
    getEmployeeList()
        .then(([data]) => {
            const listOfEmployee = data.map((employee) => ({// stores a list of employees and their id so user can choose from them
                name: employee.first_name,
                value: employee.id
            }))
            inquirer.prompt(
                {
                    type: 'list',
                    message: 'Which employee for an would you like to update their role?',
                    choices: listOfEmployee,
                    name: 'choice',
                }).then((roleData) => {
                    getRoleList()
                        .then(([data]) => {
                            const listOfRoles = data.map((role) => ({// stores a list of roles and their id so user can choose from them
                                name: role.title,
                                value: role.id
                            }))
                            inquirer.prompt([
                                {
                                    type: 'list',
                                    message: 'What is their role',
                                    choices: listOfRoles,
                                    name: 'roleId'
                                }
                            ]).then((role) => {
                                db.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [role.roleId, roleData.choice])//updates employee based on user inputs
                                viewEmployees()// shows result
                            })
                        })
                })
        })
}

function getEmployeeList() {//These are here so seperate functions can console.table the data, and not do it everytime this is called
    return db.promise().query('SELECT * FROM employee')
}
function getRoleList() {
    return db.promise().query('SELECT * FROM role')

}
function getDepartmentList() {
    return db.promise().query('SELECT * FROM department')
}
module.exports = { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee }