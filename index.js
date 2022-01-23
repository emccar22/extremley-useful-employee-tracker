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
                'Add Department',
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
                addDepartment();
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

const addDepartment = async () => {
    try {
        let newDept = await inquirer.prompt([
            {
                name: 'deptName',
                type: 'input',
                message: 'What is the name of the new department?',
                validate: deptNameInput => {
                    if (deptNameInput) {
                        return true;
                    } else {
                        console.log('Please add the name of the new department');
                        return false;
                    }
                }
            }
        ]);
        const sql = 'INSERT INTO department SET ?'
        db.query(sql, {
            name: newDept.deptName
        });
        console.log('New department added')
        home();
    } catch (err) {
        console.log(err);
        home();
    };
};

const addRole = async () => {

}

