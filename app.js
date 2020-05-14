
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

var items =["Buy Food", "Cook Food", "Eat Food"];
var workItems =[];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  let today = new Date();
  let options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };

let day = today.toLocaleDateString("en-US", options);


  res.render("list", {
    listTitle: day, newListItems:items
  });
});

app.get("/work",function(req,res){
res.render("list",{listTitle:"Work List" ,newListItems:workItems});
});



app.post("/", function(req, res) {
  let item = req.body.newItem;
  if(req.body.list==="Work List"){
    workItems.push(item);
    res.redirect("/work");

}else{
  items.push(item);
  res.redirect("/");
}
});
app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
