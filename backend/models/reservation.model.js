const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const ReservationSchema=Schema({
    DateDeMatch:{type:Date,unqiue:false,require:true},
    Status:{type:String,required:true,default:'En attente'},
    idHourGame:{type: Schema.ObjectId,ref:'Hour',require:true},
    idClient:{type: Schema.ObjectId,ref:'Client',require:true},
    idCentre:{type: Schema.ObjectId,ref:'Centre',require:true},
    /*idEquipe1:{type: Schema.ObjectId,ref:'Equipe'},
    idEquipe2:{type: Schema.ObjectId,ref:'Equipe'}*/
    
 });

const Reservation=mongoose.model('Reservation',ReservationSchema);
module.exports=Reservation;
 