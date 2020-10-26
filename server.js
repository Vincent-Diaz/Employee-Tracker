const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Diaz5205",
    database: "employees_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});

function start() {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            "view all employees",
            "view all departments",
            "view all roles",
            "add employee",
            "add department",
            "add role",
            "remove employee",
            "update employee role",
            "Exit"]
    }).then(answers => {
        console.log(answers.choice);
        switch (answers.choice) {
            case "view all employees":
                viewEmployees();
                break;

            case "view all departments":
                viewDepartments();
                break;

            case "view all roles":
                viewRoles();
                break;

            case "add employee":
                addEmployee();
                break;

            case "add department":
                addDepartment();
                break;

            case "add role":
                addRole();
                break;

            case "remove employee":
                removeEmployee();
                break;

            case "update employee role":
                updateEmployee();
                break;

            case "Exit":
                endApp();
                break;

            default:
                break;

        }
    })
}

function viewEmployees() {
    connection.query("SELECT emp.first_name, emp.last_name, roles.title, department.names AS departments, roles.salary, CONCAT(mngr.first_name, ' ', mngr.last_name) AS manager FROM employee AS emp INNER JOIN roles ON emp.role_id = roles.id INNER JOIN department ON roles.department_id = department.id LEFT JOIN employee AS mngr ON emp.manager_id = mngr.id;",
        function (err, res) {
            if (err) throw err;
            console.table(res)
            start();
        })
}

function viewDepartments() {
    connection.query("SELECT * FROM department;",
        function (err, res) {
            if (err) throw err;;
            console.table(res)
            start();
        })
}

function viewRoles() {
    connection.query("SELECT * FROM roles;",
        function (err, res) {
            if (err) throw err;;
            console.table(res)
            start();
        })
}