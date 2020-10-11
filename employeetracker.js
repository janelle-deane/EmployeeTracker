const mysql = require("mysql");
const inquirer=require("inquirer");

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

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    initialQuestions();
  });

function initialQuestions(){
    
inquirer.prompt ([
    // Initial questions
    {
        name: "choice",
        message:"What would you like to do?",
        type: "list",
        choices: ["Add", "View", "Update", "Delete","Budget", "Quit"]
    
    }, 
    {
        name:'add',
        message:"What would you like to add?",
        type:"list",
        choices: ["Employee", "Role", "Department"],
        when:function(answers){
            if(answers.choice==="Add"){
                return true
            } else {
                return false
            }
        }
    },
    {
        name:'view',
        message:"What would you like to view by?",
        type:"list",
        choices: ["Employee", "Role", "Department", "Manager"],
        when:function(answers){
            if(answers.choice==="View"){
                return true
            } else {
                return false
            }
        }
    },
    {
        name:'update',
        message:"What would you like to update?",
        type:"list",
        choices: ["Role", "Manager"],
        when:function(answers){
            if(answers.choice==="Update"){
                return true
            } else {
                return false
            }
        }
    },
    {
        name:'delete',
        message:"What would you like to delete?",
        type:"list",
        choices: ["Employee", "Role", "Department"],
        when:function(answers){
            if(answers.choice==="Delete"){
                return true
            } else {
                return false
            }
        }
    },
    {
        name:'budget',
        message:"Which department budget would you like to view?",
        type:"list",
        choices: ["department list TO BE ADDED"],
        when:function(answers){
            if(answers.choice==="Add"){
                return true
            } else {
                return false
            }
        }
    },
    
]).then(function(answers){
    // Functions to ask further questions
    if(answers.add==="Employee"){
        addEmployee();
    }
    else if(answers.add==="Role"){
        addRole();
    }
    else if(answers.add==="Department"){
        addDepartment();
    }
    else if(answers.view==="Employee"){
        viewEmployee();

    }else if(answers.view==="Role"){
        viewRole();
    }
    else if(answers.view==="Deptartment"){
        viewDepartment();
    }
    else if(answers.choice==="Manager"){
        viewManager();
    }
    else if(answers.choice==="Quit"){
        connection.end()
    }
    // Need to add Update and Delete functions
})
}

function addEmployee(){
    connection.query('INSERT INTO auctionItems (item, category, bid)VALUES(?,?,?)',[item,category,bid],function(err,data){
        if(err) throw err;
        console.log(`${item} was added`);
        initialQuestions();
    })
}