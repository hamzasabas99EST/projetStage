const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const HourSchema=Schema({
    HeureDebut:{type:Number},
    HeureFin:{type:Number}
 });

const Hour=mongoose.model('Hour',HourSchema);
module.exports=Hour;
 