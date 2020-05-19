const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const EquipeSchema=Schema({
   NomEquipe:{type:String,required:true,},
   
});

const Equipe=mongoose.model('Equipe',EquipeSchema);
module.exports=Equipe;
