const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // username
    user: "root",

    // password
    password: "password",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    initialQuestions();
});

function initialQuestions() {

    inquirer.prompt([
        // Initial questions
        {
            name: "choice",
            message: "What would you like to do?",
            type: "list",
            choices: ["Add Employee", "Add Role", "Add Department", "View Employee", "View Roles", "View Department", "Update", "Delete", "Budget", "Quit"]

        },
       
        // {
        //     name:'update',
        //     message:"What would you like to update?",
        //     type:"list",
        //     choices: ["Role", "Manager"],
        //     when:function(answers){
        //         if(answers.choice==="Update"){
        //             return true
        //         } else {
        //             return false
        //         }
        //     }
        // },
        // {
        //     name:'delete',
        //     message:"What would you like to delete?",
        //     type:"list",
        //     choices: ["Employee", "Role", "Department"],
        //     when:function(answers){
        //         if(answers.choice==="Delete"){
        //             return true
        //         } else {
        //             return false
        //         }
        //     }
        // },
        // {
        //     name:'budget',
        //     message:"Which department budget would you like to view?",
        //     type:"list",
        //     choices: ["department list TO BE ADDED"],
        //     when:function(answers){
        //         if(answers.choice==="Add"){
        //             return true
        //         } else {
        //             return false
        //         }
        //     }
        // },

    ]).then(function (answers) {
        // Functions to ask further questions
        if (answers.choice === "Add Employee") {
            addEmployee();
        }
        else if (answers.choice === "Add Role") {
            addRole();
        }
        else if (answers.choice === "Add Department") {
            addDepartment();
        }
        else if (answers.choice === "View Employee") {
            viewEmployee();

        } else if (answers.choice === "View Roles") {
            viewRole();
        }
        else if (answers.choice === "View Department") {
            viewDepartment()
        }
        else if (answers.choice === "Manager") {
            viewManager();
        }
        else if (answers.choice === "Quit") {
            connection.end()
        }
        // Need to add Update and Delete functions
    })
}

function addEmployee() {
    connection.query(`SELECT * FROM roleList`, function (err, data2) {
        if (err) throw err;
        const roleList = data2.map(function (role) {
            return {
                name: role.title,
                id: role.id
            }
        })
        inquirer.prompt([
            // Initial questions
            {
                name: "roleId",
                message: "What is their role?",
                type: "list",
                choices: [...roleList]
            },
            {
                name: "firstName",
                message: "What is their first name?",
                type: "input",
            },
            {
                name: "lastName",
                message: "What is their last name?",
                type: "input",
            },
        ]).then(function (answers) {
            let matchRole = roleList.filter(role => role.name === answers.roleId);
            connection.query('INSERT INTO employeeList SET ?',
                {
                    first_name: answers.firstName,
                    last_name: answers.lastName,
                    role_id: matchRole[0].id
                },
                function (err, data) {
                    if (err) throw err;
                    console.log(`${answers.firstName} ${answers.lastName} was added`);
                    initialQuestions();
                })
        })
    })

};


function addRole() {
    connection.query(`SELECT * FROM departmentList`, function (err, data) {
        if (err) throw err;
        const deptList = data.map(function (dept) {
            return {
                name: dept.department_name,
                id: dept.id
            }
        })

        inquirer.prompt([
            // role add questions
            {
                name: "roleAdd",
                message: "What is the role you would like to add?",
                type: "input",
            }, {
                name: "salary",
                message: "What is the salary?",
                type: "number",
            },
            {
                name: "deptId",
                message: "What is their Dept?",
                type: "list",
                choices: [...deptList]
            },
        ]).then(function (answer) {
            let matchDept = deptList.filter(dept => dept.name === answer.deptId)
            connection.query('INSERT INTO roleList SET ?',
                {
                    title: answer.roleAdd,
                    salary: answer.salary,
                    department_id: matchDept[0].id
                },
                function (err, data) {
                    if (err) throw err;
                    console.log(`${answer.roleAdd} in the ${matchDept[0].id} dept index which makes ${answer.salary} was added`);
                    initialQuestions();
                })
        });
    })
};

function addDepartment() {
        inquirer.prompt([
            // dept add questions
            {
                name: "deptAdd",
                message: "What is the department you would like to add?",
                type: "input",
            },
        ]).then(function (answer) {
            connection.query("INSERT INTO departmentList SET ?",
                {
                    department_name: answer.deptAdd,
                },
                function (err, data) {
                    if (err) throw err;
                    console.log(`${answer.deptAdd} was added`);
                    initialQuestions();
                })
        })

};
function viewEmployee() {
    connection.query("SELECT first_name, last_name, title, salary, department_name FROM employeeList RIGHT JOIN roleList ON employeeList.role_id =roleList.id RIGHT JOIN departmentList ON roleList.department_id = departmentList.id", 
    function(err, res){
        if (err) throw err;
        console.table(res);
        initialQuestions();
    })
};

function viewRole() {
    connection.query("SELECT title, salary, department_name FROM roleList JOIN departmentList ON roleList.department_id = departmentList.id", 
    function(err, res){
        if (err) throw err;
        console.table(res);
        initialQuestions();
    })
};

function viewDepartment() {
connection.query("SELECT department_name FROM departmentList", function(err, res){
    if (err) throw err;
    console.table(res);
    initialQuestions();
})
};

// function updateEmployee (){
//     UPDATE employeelist SET first_name="Jerry", last_name="Homes", role_id =2 WHERE id = 4; 
// }