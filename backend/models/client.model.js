
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ClientShema=Schema({
   CIN:{type:String,required:true, unique: true,minlength:6,maxlength:8 },
   Nom:{type:String,required:true},
   Prenom:{type:String,required:true},
   telephone:{type:String,required:true},
   email:{type:String,required:true,unique: true},
   motdepass:{type:String,required:true,minlength:6},
   idVille:{type: Schema.ObjectId,ref:'Ville'}
 
});

const Client=mongoose.model('Client',ClientShema);
module.exports=Client;