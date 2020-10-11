const mysql = require("mysql");
const inquirer=require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
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
    // if(answers.choice==="See all Auction Items"){
    //     printItems();
    // }
  
    // else if(answers.choice==="Post Item"){
    //     postItem(answers.item,answers.category,answers.bid);
    // }
    else if(answers.choice==="Quit"){
        connection.end()
    }
    // else if(answers.choice==="Bid"){
    //    bidComparison(answers.bidChoice, answers.bidamount);
    // }
})
})
};
