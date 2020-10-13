DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departmentList (
id INT PRIMARY KEY AUTO_INCREMENT,
department_name VARCHAR(30),
PRIMARY KEY (id),
);

CREATE TABLE roleList (
id INT PRIMARY KEY,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES departmentList(id)
); 

CREATE TABLE employeeList(
id INT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT,
manager_id INT,
FOREIGN KEY (role_id) REFERENCES role(id),
FOREIGN KEY (manager_id) REFERENCES employeeList(id),
PRIMARY KEY (id)
);

INSERT INTO employeeList (department, title, first_name, last_name, salary)
VALUES ("Test Employee", "test manager", "test bob", "test bologane" 1000);