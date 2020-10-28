const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const util = require("util");
//const managerOptions = ["Michael Scott", "Dwight Schrute", "Pam Beasley", "Holly Flax"];
//const roleOptions = ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Legal Team Lead", "Lawyer", "Accountant"];

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Diaz5205",
    database: "employees_trackerDB"
});
//connection.query = util.promisify(connection.query);
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    start();
});
connection.query = util.promisify(connection.query);

function start() {
    inquirer.prompt({
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            "View all employees",
            "View all departments",
            "View all roles",
            "Add employee",
            "Add department",
            "Add role",
            "Update employee role",
            "Exit"
        ]
    }).then(answers => {
        console.log(answers.choice);
        switch (answers.choice) {
            case "View all employees":
                viewEmployees();
                break;

            case "View all departments":
                viewDepartments();
                break;

            case "View all roles":
                viewRoles();
                break;

            case "Add employee":
                addEmployee();
                break;

            case "Add department":
                addDepartment();
                break;

            case "Add role":
                addRole();
                break;

            case "Update employee role":
                updateEmployee();
                break;

            case "Exit":
                endApp();
                break;

            default:
                break;

        }
    });
}

function viewEmployees() {
    connection.query(
        "SELECT emp.first_name, emp.last_name, roles.title, department.names AS departments, roles.salary, CONCAT(mngr.first_name, ' ', mngr.last_name) AS manager FROM employee AS emp INNER JOIN roles ON emp.role_id = roles.id INNER JOIN department ON roles.department_id = department.id LEFT JOIN employee AS mngr ON emp.manager_id = mngr.id;",
        function (err, res) {
            if (err) throw err;
            console.table(res)
            start();
        })
}

function viewDepartments() {
    connection.query("SELECT names, id FROM department",
        function (err, res) {
            if (err) throw err;;
            console.table(res)
            start();
        })
}

function viewRoles() {
    connection.query("SELECT title, department_id FROM roles",
        function (err, res) {
            if (err) throw err;;
            console.table(res)
            start();
        })
}

async function addEmployee() {
    let manager = await connection.query("SELECT manager_id, first_name, last_name FROM employee")
    console.log(manager);
    let roles = await connection.query("SELECT * FROM roles")
    //console.log(roles);
    //, function(err, res){
    //     if(err) throw err;
    //     for (let i = 0; i < rolesArr.length; i++) {
    //         rolesArr.push(res[i].title);
      //  }
   // })
     inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: roles.map(role => {
              return{
                name: role.title,
                value: role.id
              }  
            }),
        },
        {
            name: "manager",
            type: "list",
            message: "What is the employee's manager?",
            choices: manager.map(mngr => {
                return{
                  name: `${mngr.first_name} ${mngr.last_name}`,
                  value: mngr.id
                }  
              }),
        },
    ]).then(res => {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE (?)", [[res.firstName, res.lastName, res.role, res.manager]],
            function(err, data){
                if(err) throw err;
                console.table(res);
                start();
            })
    });
}

function addDepartment() {
    inquirer.prompt ([
        {
            name: "name",
            type: "input",
            message: "What is the department name?"
        }
    ]).then(res => {
        connection.query("INSERT INTO department SET ?",
        {
            names: res.name
        },
        function(err) {
            if (err) throw err;
            console.table(res);
            start();
        }
        )
    });
}

function addRole() {
    connection.query("SELECT roles.title AS title, roles.salary AS salary FROM roles", 
    function(err, res){
        inquirer.prompt ([
            {
                name: "title",
                type: "input",
                message: "What is the roles title?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the roles salary?"
            },
            {
                name: "id",
                type: "input",
                message: "What is the department ID?"
            }
        ]).then(res => {
            connection.query(
                "INSERT INTO roles SET ?",
                {
                    title: res.title,
                    salary: res.salary,
                    department_id: res.id
                },
                function (err) {
                    if(err) throw err;
                    console.table(res);
                    start();
                }
            )
        });
    });
}

async function updateEmployee(){
   let update = await connection.query("SELECT first_name, last_name FROM employee")
   //let manager = await connection.query("SELECT manager_id, first_name, last_name FROM employee")
   let roles = await connection.query("SELECT * FROM roles")
    inquirer.prompt([
        {
            name: "employee",
            type: "list",
            message: "What employee would you like to update?",
            choices: update.map(data => {
                return {
                    name: `${data.first_name} ${data.last_name}`,
                    value: data.id
                }
            })
        },
        {
            name: "role",
            type: "list",
            message: "What is the employee's new role?",
            choices: roles.map(role => {
                return{
                  name: role.title,
                  value: role.id
                }  
              }),
        },
        // {
        //     name: "manager",
        //     type: "list",
        //     message: "Who is the employee's new manager?",
        //     choices: manager.map(mngr => {
        //         return{
        //           name: `${mngr.first_name} ${mngr.last_name}`,
        //           value: mngr.id
        //         }  
        //       }),
        // },
    ]).then(res => {
        let updateEmp = res.employee;
        let newRole = res.role;
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [[newRole],[updateEmp]],
            function(err, data){
                if(err) throw err;
                console.log("Employee updated!");
                start();
            })
    });
}

function endApp(){
    connection.end();
}