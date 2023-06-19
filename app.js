//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

let items = ["Buy food","Eat food","Cook food"];
let workItems = [];

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

/* Home route */ 

app.get("/", function (req,res){
    
    let day = date.getDate();

    res.render("list", {listTitle: day, newListItems: items });

});

app.post("/", function(req,res){
    let item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
    
});

app.get("/work", function(req,res){
    res.render("list",{listTitle:"Work List", newListItems: workItems})
});


app.get("/about",function(req,res){
    res.render("about");
});


app.listen(3000, function(){
    console.log("server is running on port 3000");  
});



//#5a62ba   #cbced8



//we cannot use more than one res.send as the server considers it to be a final send request 
//so we res.write as we can use it multiple times
