DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employeeList (
  id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(30) NOT NULL,
  title VARCHAR(30) NOT NULL,
  first_name VARCHAR(30) NOT NULL
  last_name VARCHAR(30) NOT NULL
  salary INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO employeeList (department, title, first_name, last_name, salary)
VALUES ("Test Employee", "test manager", "test bob", "test bologane" 1000);

