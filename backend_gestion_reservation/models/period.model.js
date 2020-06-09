const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const PeriodSchema=Schema({
    DateDeDebut:{type:Date,unqiue:false},
    DateDeFin:{type:Date,unqiue:false},
    idCentre:{type: Schema.ObjectId,ref:'Centre'}

    
 });


const Period=mongoose.model('Period',PeriodSchema);
module.exports=Period;
 