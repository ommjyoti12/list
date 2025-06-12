const mongoose=require("mongoose");


const messageschema=new mongoose.Schema({
    from:{
        type:String,
    },
    to:{
        type:String,
    },
    time:{
        type:Date

    }
})

  const Message=mongoose.model("Message",messageschema);

module.exports=Message;
