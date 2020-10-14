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
            choices: ["Add Employee", "Add Role", "Add Department", "View Employee", "View Role", "View Department", "Update", "Delete", "Budget", "Quit"]

        },
        // {
        //     name:'view',
        //     message:"What would you like to view by?",
        //     type:"list",
        //     choices: ["Employee", "Role", "Department", "Manager"],
        //     when:function(answers){
        //         if(answers.choice==="View"){
        //             return true
        //         } else {
        //             return false
        //         }
        //     }
        // },
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
        else if (answers.choice === "Employee") {
            viewEmployee();

        } else if (answers.choice === "Role") {
            viewRole();
        }
        else if (answers.choice === "Deptartment") {
            viewDepartment();
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
    connection.query(`SELECT * FROM departmentList`, function (err, data) {
        if (err) throw err;
        const deptList = data.map(function (dept) {
            return dept.department_name
        })

        connection.query(`SELECT * FROM roleList`, function (err, data2) {
            if (err) throw err;
            const roleList = data2.map(function (role) {
                return role.title
            })

            inquirer.prompt([
                // Initial questions
                {
                    name: "deptId",
                    message: "What is their Dept?",
                    type: "list",
                    choices: [...deptList]
                },
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
            ])
                .then((({ firstName, lastName, roleId }) => {
                    let [matchRole] = data.filter(roleList.title === roleId);
                    connection.query('INSERT INTO employeeList SET ?',
                        {
                            first_name: firstName,
                            last_name: lastName,
                            role_id: matchRole.id
                        },


                        function (err, data) {
                            if (err) throw err;
                            console.log(`${first_name} ${last_name} was added`);
                            initialQuestions();
                        })
                }))
        })
    })
};



// let [matchDept]=data.filter(dept=>departmentList.department_name === deptId)





