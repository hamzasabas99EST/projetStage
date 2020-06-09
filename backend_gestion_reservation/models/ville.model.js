const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const VilleShema=Schema({
  NomVille:{type:String,required:true},
   
});

const Ville=mongoose.model('Ville',VilleShema);
module.exports=Ville;