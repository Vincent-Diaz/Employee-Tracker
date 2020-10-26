DROP DATABASE IF EXISTS employees_trackerDB;
CREATE database employees_trackerDB;

USE employees_trackerDB;

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    names VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(50),
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employee
-- department seeds --
-- INSERT INTO department (names)
-- VALUES ("Sales");
-- INSERT INTO department (names)
-- VALUES ("Human Resources");
-- INSERT INTO department (names)
-- VALUES ("Finance");
-- INSERT INTO department (names)
-- VALUES ("Quality Assurance");