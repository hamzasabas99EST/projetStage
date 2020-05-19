const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const JoueurSchema=Schema({
   CIN:{type:String,required:true,unique:true},
   idEquipe:{type: Schema.ObjectId,ref:'Equipe'}
   
});

const Joueur=mongoose.model('Joueur',JoueurSchema);
module.exports=Joueur;
