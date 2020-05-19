const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const AdminSchema=Schema({
    Nom:{type:String,required:true},
    Prenom:{type:String,required:true},
    email:{type:String,required:true},
    motdepass:{type:String,required:true},
    idCentre:{type: Schema.ObjectId,ref:'Centre'},
   // idVille:{type: Schema.ObjectId,ref:'Ville'}
    
 });

const Admin=mongoose.model('Admin',AdminSchema);
module.exports=Admin;
 