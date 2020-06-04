const router=require('express').Router();
let Reservation=require('../models/reservation.model');
let Hour=require('../models/hour.model');
let Period=require('../models/period.model');
let Centre=require('../models/centre.model');

//cette fonction affiche tous les heures
router.route('/allHours').get(async (req,res)=>{
    Hour.find()
    .then(hours=>res.json(hours))
     .catch(err=>res.json(err))
 });
 

/*router.route('/all').get((req,res)=>{
   Reservation.find().populate("idCentre").populate("idClient").populate("idHourGame")
   .then(reservations=>res.json(reservations))
    .catch(err=>res.json(err))
});*/

//cette fonction verifie si le client deja envoyer des réservations dans un centre
router.route('/client/:idClient/:idCentre').get(async (req,res)=>{
    
     try{
     const idClient=req.params.idClient;
     const idCentre=await req.params.idCentre;
     const period=await Period.find({idCentre:idCentre}).sort({_id:-1}).limit(1);
     const DateDeDebut=await period[0].DateDeDebut;
     const DateDeFin=await period[0].DateDeFin;
     const reer=await Reservation.find({$and:[{idClient:idClient},{idCentre:idCentre},
                     {"DateDeMatch": { $gte: DateDeDebut, $lte: DateDeFin }}]})
                     .sort({DateDeMatch:1,idHourGame:1})
                     .populate("idHourGame")
                     .populate('idClient')
                     .populate("idCentre"); 
    let hadGame=await false;

    for(let i=0;i<reer.length;i++){
        if(reer[i].Status==="Acceptée") { 
            hadGame=true
        };    
    }
     res.json({hadGame:hadGame,Reservation:reer});
     }catch(e){
        console.log(e);
    }
    
     
 });
 //cette fonction filtre les réservations d'un client par centre
 router.route('/SearchByclients/:idClient/:q').get(async (req,res)=>{
    try{
    const idClient=req.params.idClient;
    const id_Centre=req.params.q;
    const period=await Period.find({idCentre:id_Centre}).sort({_id:-1}).limit(2).exec();
    const DateDeDebut=await period[0].DateDeDebut;
    const DateDeFin=await period[0].DateDeFin;
    const reservations=await Reservation.find({$and:[{idClient:idClient},{idCentre:id_Centre},
                    {"DateDeMatch": { $gte: DateDeDebut, $lte: DateDeFin }}]})
                    .where('Status').in(['En attente','Modifée','Refusée'])
                    .sort({DateDeMatch:1,idHourGame:1})
                    .populate("idHourGame")
                    .populate('idClient')
                    .populate("idCentre"); 
    res.json(reservations); 
    }   catch(e){
        console.log(e);
    }
     
 });

  //cette fonction affiche les réservations d'un client par periode

router.route('/byclients/:idClient/:idVille').get(async (req,res)=>{
   try{
    const idClient=req.params.idClient;
    const idVille=await req.params.idVille;
    const centres=await Centre.find({idVille:idVille});
    const id_Centre=await centres[0]._id;
    const period=await Period.find({idCentre:id_Centre}).sort({_id:-1}).limit(2).exec();
    const DateDeDebut=await period[0].DateDeDebut;
    const DateDeFin=await period[0].DateDeFin;
    const reservations=await Reservation.find({$and:[{idClient:idClient},{idCentre:id_Centre},
        {"DateDeMatch": { $gte: DateDeDebut, $lte: DateDeFin }}]})
        .where('Status').in(['En attente','Modifiée','Refusée'])
        .sort({DateDeMatch:1,idHourGame:1})
        .populate("idHourGame")
        .populate('idClient')
        .populate("idCentre");
  
     
     return res.json(reservations);
   }   catch(e){
            console.log(e);
        }


 });

   //cette fonction affiche les matches d'un client par periode

 router.route('/GamesOfClients/:idClient/:idVille').get(async (req,res)=>{
    try{
    const idVille=await req.params.idVille;
    const centres=await Centre.find({idVille:idVille});
    const id_Centre=await centres[0]._id;
    const period=await Period.find({idCentre:id_Centre}).sort({_id:-1}).limit(2).exec();
    const DateDeDebut=await period[0].DateDeDebut;
    const DateDeFin=await period[0].DateDeFin;
    const reservations=await Reservation.find({$and:[{idClient:req.params.idClient},{idCentre:id_Centre},
                     {"DateDeMatch": { $gte: DateDeDebut, $lte: DateDeFin }}]})
                     .where('Status').in(['Acceptée'])
                    // .sort({idCentre:1,DateDeMatch:1,idHourGame:1})
                     .populate("idCentre")
                     .populate("idHourGame")
                     .limit(1);

    
    res.json(reservations)
    }catch(e){
        console.log(e);
    }
 
 });

  //cette fonction filtre les matches d'un client par centre


 router.route('/SearchByclientsGames/:idClient/:q').get(async (req,res)=>{
     try{
     const idClient=req.params.idClient;
     const id_Centre=req.params.q;
     const period=await Period.find({idCentre:id_Centre}).sort({_id:-1}).limit(2).exec();
     const DateDeDebut=await period[0].DateDeDebut;
     const DateDeFin=await period[0].DateDeFin;
     const reservations=await Reservation.find({$and:[{idClient:idClient},{idCentre:id_Centre},
        {"DateDeMatch": { $gte: DateDeDebut, $lte: DateDeFin }}]})
        .where('Status').in(['Acceptée'])
        .sort({idCentre:1,DateDeMatch:1,idHourGame:1})
        .populate("idCentre").populate("idHourGame")
        .limit(1);
    res.json(reservations);
     }
    catch(e){
        console.log(e);
    }

  });


//cette function permet d'envoyer une réservation par client
router.route('/addReservation').post((req,res)=>{
    const DateDeMatch=req.body.DateDeMatch;
    const idHourGame=req.body.idHourGame;
    const idClient=req.body.idClient;
    const idCentre=req.body.idCentre;
    
    const newReservation=new Reservation({
        DateDeMatch,idHourGame,idClient,idCentre
    });
    newReservation.save()
    .then(()=>res.json('Reservation added'))
    .catch(err=>res.status(400).json('Error'+err));
});


//Cette fonction permet au client de modifier une réservaton une seule fois
router.route('/UpdateByClient/:id').post(async (req,res)=>{
    try{
    const HourGame=await req.body.idHourGame
    const reserv=await Reservation.findById(req.params.id);
    if(HourGame!=reserv.idHourGame) {
        Reservation.findByIdAndUpdate(req.params.id)
            .then(reservation=>{
                reservation.idHourGame=HourGame;
                reservation.Status="Modifiée";
                reservation.save();
                res.json(reservation)
             })
    }
    
    }
    catch(e){
        res.status(400).json('Error'+e)
    }
  
});


 //cette fonction permet d'annuler une réservation d'un client
router.route('/annuler/:id').delete((req,res)=>{
    
    Reservation.findByIdAndDelete({_id:req.params.id})
         .then(()=>res.json("yes yes yes yes"))
         .catch(err=>res.status(400).json('Error : '+err))
});

//cete fonction permet de récuperer une réservation par _id 
router.route('/find/:id').get((req,res)=>{
    
    Reservation.findById({_id:req.params.id}).populate("idCentre")
         .then(reservation=>res.json(reservation))
         .catch(err=>res.status(400).json('Error : '+err))
});


router.route('/addHour').post((req,res)=>{
    const HeureDebut=req.body.HeureDebut;
    const HeureFin=req.body.HeureFin;
    
    const newHour=new Hour({
        HeureDebut,HeureFin
    });
    newHour.save()
    .then(()=>res.json('Hour added'))
    .catch(err=>res.status(400).json('Error'+err));
});

//Cette fonction affiche les statistique d'un client dans les centres
router.route('/StatistiqueOfClients/:idClient').get(async (req,res)=>{
    try{
        let reservation_enAttente=await 0; 
        let reservation_Updated=await 0;
        let reservation_accepter=await 0;
        let reservation_refuser=await 0;

        const reservations=await Reservation.find({idClient:req.params.idClient});
        for(let i=0;i<reservations.length;i++){
            if(reservations[i].Status==="En attente") reservation_enAttente++;
            else if(reservations[i].Status==="Modifiée") reservation_Updated++;
            else if(reservations[i].Status==="Acceptée") reservation_accepter++; 
            else reservation_refuser++;
        }
    var Statistique=await {
        'entAttente':reservation_enAttente,
        'Updated':reservation_Updated,
        'Accepter':reservation_accepter,
        'Refuser':reservation_refuser
    }

    res.json(Statistique)
    }catch(e){
        console.log(e);
    }
 
 });

module.exports=router
