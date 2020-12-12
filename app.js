const express= require("express");
const ejs= require("ejs");
const bodyParser= require("body-parser");
const mongoose= require("mongoose");

const app= express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/subscriberDB",{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemSchema={
  email: String,
  name: String,
  phoneNo: Number,
  dob: Date,
  password: String
}

const Item= new mongoose.model("Item", itemSchema);

app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.post("/login", function(req,res){
  Item.findOne({email: req.body.email}, function(err,item){
    if(item){
        res.render("success")
    }
    else{
      res.render("signup");
    }
  });
});

app.post("/signup", function(req, res){
  const account= new Item({
    name: req.body.name,
    email:req.body.email ,
    dob: req.body.dob,
    phoneNo: req.body.phoneNo,
   password: req.body.password});
  account.save(function(err){
    if(err){
      console.log(err);
    }
    else{
    res.render("login");
    }
  });
});

app.get("/signup", function(req, res){
  res.render("signup");
});

app.listen(3000, function(req, res){
  console.log("server started successfully");
})
