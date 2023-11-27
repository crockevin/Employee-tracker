const db = require('../config/connection')
const consoleTable = require('console.table')
const inquirer = require('inquirer')
const isNumber = require('is-number')

function viewDepartments() {
    getDepartmentList()
        .then(([data]) => {
            console.table(data)
        })
}

function viewRoles() {
    getRoleList()
        .then(([data]) => {
            console.table(data)
        })
}

function viewEmployees() {
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
            db.promise().query('INSERT INTO department (name) VALUES (?)', data.depName)
            viewDepartments()
        })

}

function addRole() {
    getDepartmentList()
        .then(([data]) => {
            const listOfDepartment = data.map((department) => ({
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
                        if (isNumber(input)) {
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
                    db.promise().query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [data.title, data.salary, data.depId])
                    viewRoles()
                })
        })

}

function addEmployee(first, last, roleId, manId) {
    getRoleList()
        .then(([data]) => {
            const listOfRoles = data.map((role) => ({
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
                if (emp.manId.trim() !== '') {
                    db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)', [emp.first, emp.last, emp.roleId, emp.manId])
                    viewEmployees()
                } else {
                    db.promise().query('INSERT INTO employee (first_name, last_name, role_id) VALUES(?, ?, ?)', [emp.first, emp.last, emp.roleId])
                    viewEmployees()
                }
            })
        })


}

function updateEmployee() {
    getEmployeeList()
        .then(([data]) => {
            const listOfEmployee = data.map((employee) => ({
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
                            const listOfRoles = data.map((role) => ({
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
                                db.promise().query('UPDATE employee SET role_id = ? WHERE id = ?', [role.roleId, roleData.choice])
                                viewEmployees()
                            })
                        })
                })
        })
}

function getEmployeeList() {
    return db.promise().query('SELECT * FROM employee')
}
function getRoleList() {
    return db.promise().query('SELECT * FROM role')

}
function getDepartmentList() {
    return db.promise().query('SELECT * FROM department')
}
module.exports = { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployee, getEmployeeList, getRoleList, getDepartmentList }