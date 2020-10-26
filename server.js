const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Diaz5205",
    database: "employee_trackerDB"
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
            "update employee role"
        ]
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

        }
    })
}

