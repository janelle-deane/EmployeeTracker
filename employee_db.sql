DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departmentList (
id INT AUTO_INCREMENT NOT NULL,
department_name VARCHAR(30),
PRIMARY KEY (id)
);

CREATE TABLE roleList (
id INT AUTO_INCREMENT NOT NULL,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,2) NOT NULL,
department_id INT NOT NULL,
FOREIGN KEY (department_id) REFERENCES departmentList(id),
PRIMARY KEY (id)
); 

CREATE TABLE employeeList(
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT,
FOREIGN KEY (role_id) REFERENCES roleList(id),
FOREIGN KEY (manager_id) REFERENCES employeeList(id),
PRIMARY KEY (id)
);

