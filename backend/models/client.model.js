
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ClientShema=Schema({
   CIN:{type:String,required:true, unique: true },
   Nom:{type:String,required:true},
   Prenom:{type:String,required:true},
   email:{type:String,required:true,unique: true},
   motdepass:{type:String,required:true},
   idVille:{type: Schema.ObjectId,ref:'Ville'}
 
});

const Client=mongoose.model('Client',ClientShema);
module.exports=Client;