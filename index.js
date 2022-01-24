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
        const sql = 'INSERT INTO department SET ?';
        db.query(sql, {
            name: newDept.deptName
        });
        console.log('======== New department added ========')
        home();
    } catch (err) {
        console.log(err);
        home();
    };
};

function addRole() {
    
        db.query("SELECT * FROM department", function(err, res) {
            if (err) throw err;
            const choices = res.map(({ id, name }) => ({
                value: id,
                name: name
            }));
        inquirer.prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'What is the name of the new role?',
                validate: roleTitleInput => {
                    if (roleTitleInput) {
                        return true;
                    } else {
                        console.log('Please enter the name of the new role!');
                        return false;
                    }
                }         
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'What is the salary of this role?',
                validate: roleSalaryInput => {
                    if (isNaN(roleSalaryInput)) {
                        console.log('Please enter the salary of the new role!');
                        return false;
                    } else if (!roleSalaryInput) {
                        console.log('Please enter the salary of the new role!');
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            {
                type: 'list',
                name: 'roleDeptId',
                message: 'Please choose the deparment id of this role.',
                choices: choices
            }
        ])
        .then(function (answer) {
            db.query('INSERT INTO role SET ?', {
                title: answer.roleTitle,
                salary: answer.roleSalary,
                department_id: answer.roleDeptId
            });
            console.log('======== New role added ========');
            home();
        })
    });
}

function addEmployee() {
    let roleArray = [];
    db.query('SELECT id, title FROM role', (err,res) => {
        if (err) throw err;
        res.forEach((element) => {
            roleArray.push(`${element.id} ${element.title}`);
        });
        let managerArray = [];
        db.query('SELECT id, first_name, last_name FROM employee', (err, res) => {
            if (err) throw err;
            res.forEach((element) => {
                managerArray.push(`${element.id} ${element.first_name} ${element.last_name}`);
            });
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: "What is this employee's first name?",
                    validate: firstNameInput => {
                        if (!firstNameInput) {
                            console.log("Please enter the employee's first name");
                            return false;
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: "What is this employee's last name?",
                    validate: lastNameInput => {
                        if (!lastNameInput) {
                            console.log("Please enter the employee's last name");
                            return false;
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "What is this employee's role?",
                    choices: roleArray
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: "Who is this employee's manager?",
                    choices: managerArray
                }
            ])
            .then((answer) => {
                let role = parseInt(answer.role);
                let manager = parseInt(answer.manager);
                db.query('INSERT INTO employee SET ?', 
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: role,
                    manager_id: manager
                },
                (err) => {
                    if (err) throw err;
                }
                );
                console.log('======== New Employee Created ========');
                home();
            });
        });
    });
};

function updateEmployee() {
    let employeeArray = [];
    db.query('SELECT id, first_name, last_name FROM EMPLOYEE', (err, res) => {
        if (err) throw err;
        res.forEach((element) => {
            employeeArray.push(`${element.id} ${element.first_name} ${element.last_name}`);
        });
        let roleArray = [];
        db.query('SELECT id, title FROM ROLE', (err, res) => {
            if (err) throw err;
            res.forEach((element) => {
                roleArray.push(`${element.id} ${element.title}`);
            });
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Which employee would you like to update?',
                    choices: employeeArray
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'Which role would you like to place this employee into?',
                    choices: roleArray
                }
            ])
            .then((answer) => {
                let employee = parseInt(answer.employee);
                let role = parseInt(answer.role);
                db.query(`UPDATE employee SET role_id = ${role} WHERE id = ${employee}`, (err) => {
                    if (err) throw err;
                })
                console.log('======== Employee Updated ========');
                home ();
            });
        });
    });
};
    
    
       
        
