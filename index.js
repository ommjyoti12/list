const express=require("express");
const path=require("path");
const app=express();
const mongoose=require("mongoose");
const Message= require("./models/manage");
var methodOverride = require('method-override');


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/puthal');
 console.log("✅ Connected to MongoDB");}
 main().catch(err => console.log(err));




app.use(express.urlencoded({extends:true}));
app.set("views engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(methodOverride('_method'));

app.listen(7070,(req,res)=>{

});
app.get("/new",async(req,res)=>{
   const all=await Message.find();
    res.render("index.ejs",{message:all});
})
app.get("/add",(req,res)=>{
  res.render("new.ejs");
});
app.post("/new/add/op",(req,res)=>{
  let{fom,t}=req.body;

  let mes=new Message({
    from:fom,
    to:t,
    time:new Date(),
  });
  mes.save();
  res.redirect("/new");


});
app.get("/update/:id",async(req,res)=>{
  let{id}=req.params;
 
  const dat= await Message.findById(id);
 res.render("update.ejs",{data:dat});

  
})
app.put("/update/new/:id",async(req,res)=>{
  let{id}=req.params;
  let{fro}=req.body;
  const updatecg= await Message.findByIdAndUpdate(id,{from:fro},{runValidators:true,new:true});
  res.redirect("/new");


})
app.delete("/dele/:id",async(req,res)=>{
  let{id}=req.params;
  await Message.findByIdAndDelete(id);
  res.redirect("/new");
});

