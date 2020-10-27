USE employees_trackerDB;

-- department seeds --
INSERT INTO department (names)
VALUES ("Sales");
INSERT INTO department (names)
VALUES ("Engineering");
INSERT INTO department (names)
VALUES ("Finance");
INSERT INTO department (names)
VALUES ("Legal");

-- role seeds --
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", "150000", 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Salesperson", "75000", 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer", "175000", 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", "120000", 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Legal Team Lead", "275000", 4);
INSERT INTO roles (title, salary, department_id)
VALUES ("Lawyer", "500000", 4);
INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", "90000", 3);

-- employee seed --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Halpert", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dwight", "Schrute", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Andy", "Bernard", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Pam", "Beasley", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Malone", 6, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Holly", "Flax", 7, null);

