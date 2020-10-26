DROP DATABASE IF EXISTS empolyee_trackerDB;
CREATE database empolyee_trackerDB;

USE empolyee_trackerDB;

CREATE TABLE department = (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE role = (
    id INT PRIMARY KEY,
    title VARCHAR(50),
    salary DECIMAL(7, 3) NOT NULL,
    department_id INT NOT NULL FOREIGN KEY
);

CREATE TABLE empployee = (
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INT NOT NULL FOREIGN KEY,
    manager_id INT NULL FOREIGN KEY
);