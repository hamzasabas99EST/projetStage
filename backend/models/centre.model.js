const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const CentreSchema=Schema({
    NomCentre:{type:String,required:true,unique:true},
    Adresse:{type:String,required:true},
    nbrTerrains:{type:Number,require:true},
    idVille:{type: Schema.ObjectId,ref:'Ville'}
    
 });

const Centre=mongoose.model('Centre',CentreSchema);
module.exports=Centre;
 