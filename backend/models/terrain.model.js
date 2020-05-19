const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const TerrainSchema=Schema({
    NumeroTerrain:{type:Number,required:true,unique:true},
    Status:{type:String,default:'libre'},
    typeTerrain:{type:String},
    idCentre:{type: Schema.ObjectId,ref:'Centre'}
    
 });

const Terrain=mongoose.model('Terrain',TerrainSchema);
module.exports=Terrain;
 