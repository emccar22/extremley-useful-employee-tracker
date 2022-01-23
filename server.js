const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

db.connect(err => {
    if (err) throw err;
    console.log('Connected to Employee Database');
    home();
});

const home = async () => {
    try {
        let result = await inquirer.prompt({
            type: 'list',
            name: 'option',
            message: 'What would you like to do?',
            choices: [
                'View Departments',
                'View Roles',
                'View Employees',
                'Add Deparment',
                'Add Role',
                'Add Employee',
                'Update Employee',
                'Quit'
            ],
        });
        switch (result.option) {
            case 'View Departments':
                viewDepartments();
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'View Employees':
                viewEmployees();
                break;
            case 'Add Department':
                addDeparment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee':
                updateEmployee();
                break;
            default:
                db.end();
                break;
        };
    } catch (err) {
        console.log(err);
        home();
    };
};

const viewDepartments = async () => {
    try {
        const sql = 'SELECT * FROM department';
        db.query(sql, function (err, res) {
            if (err) throw err;
            let tableArray = [];
            res.forEach(department => tableArray.push(department));
            console.table(tableArray);
            home();
        });
    } catch (err) {
        console.log(err);
        home();
    };
};

const viewRoles = async () => {
    try {
        const sql = 'SELECT * FROM role';
        db.query(sql, function (err, res) {
            if (err) throw err;
            let tableArray = [];
            res.forEach(role => tableArray.push(role));
            console.table(tableArray);
            home();
        });
    } catch (err) {
        console.log(err);
        home();
    };
};

const viewEmployees = async () => {
    try {
        const sql = 'SELECT * FROM employee';
        db.query(sql, function (err, res) {
            if (err) throw err;
            let tableArray = [];
            res.forEach(employee => tableArray.push(employee));
            console.table(tableArray);
            home();
        });
    } catch (err) {
        console.log(err);
        home();
    };
};
