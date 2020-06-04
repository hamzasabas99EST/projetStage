const router=require('express').Router();
let Admin=require('../models/Admin.model');
let Period=require('../models/period.model');
let Reservation=require('../models/reservation.model')
let Centre=require('../models/centre.model')
let Hour=require('../models/hour.model');
var nodemailer=require('nodemailer')


//function ajout d'un admin
router.route('/addAdmin').post((req,res)=>{
    const Nom=req.body.Nom;
    const Prenom=req.body.Prenom;
    const username=req.body.username;
    const motdepass=req.body.motdepass;
    const idCentre=req.body.idCentre;
    
    const newAdmin=new Admin({
         Nom,Prenom,username,motdepass,idCentre,isLogged:false
    });
    newAdmin.save()
    .then(()=>res.json('Admin addd'))
    .catch(err=>res.status(400).json('Error'+err));
});

//function login d'admin
router.route('/loginAdmin').post(async(req,res)=>{
    const username=req.body.username;
    const motdepass=req.body.motdepass;
    
    /*Admin.find({$and:[{'email':email},{'motdepass':motdepass}]})
    .then(admin=>res.send(admin))
    .catch(err=>res.status(400).json('Error'+err));
*/
    const admin= await Admin.findOne({'username':username});
        if(!admin){
            return res.status(404).send({errAdmin:true,message:"invalide username "});
        }
       else if(motdepass!==admin.motdepass){
           return res.status(404).send({errPass:true,message:"invalide mot de passe"});
       }
       
        return res.send({admin});


});


//function d'ajout periode des réservations
router.route('/addPeriod').post((req,res)=>{
    const DateDeDebut=req.body.DateDeDebut;
    const DateDeFin=req.body.DateDeFin;
    const idCentre=req.body.idCentre;
    
    const newPeriod=new Period({
        DateDeDebut,DateDeFin,idCentre
    });
    newPeriod.save()
    .then(()=>res.json('Period addd'))
    .catch(err=>res.status(400).json('Error'+err));
});


router.route('/findPeriod/:idCentre').get((req,res)=>{
    const idCentre=req.params.idCentre;
    
    Period.find({idCentre:idCentre}).sort({_id:-1}).limit(2)
    .then(period=>res.send(period))
    .catch(err=>res.status(400).json('Error'+err));
});


router.route('/findReservationbyCentre/:idCentre').get(async(req,res)=>{
  try{
  //Cette fonction aide admin pour trouver les reservations evoyées 
    const idCentre=await req.params.idCentre;
    const centre=await Centre.findById(idCentre);
    const nbr=await centre.nbrTerrains;
    const idHourGame=await Hour.find().sort({_id:1});
    const period=await Period.find({idCentre:idCentre}).sort({_id:-1}).limit(1);
    const accepter=await Reservation.find({$and:[{idCentre:idCentre},{"DateDeMatch":period[0].DateDeDebut},{"idHourGame":idHourGame[0]._id}]})
              .where('Status').in(['Acceptée'])
              .sort({DateDeMatch:1,idHourGame:1})
              .populate("idHourGame")
              .populate('idClient')
              .populate("idCentre") 
              .limit(nbr);
    
  if(accepter.length===nbr){
    const reerawait=await Reservation.updateMany(
      {$and:[{"idCentre":idCentre},{"idHourGame":idHourGame[0]._id},{"DateDeMatch":period[0].DateDeDebut},{Status:['En attente','Modifiée']}]}
      ,{$set:{Status:'Refusée'} }
  )
    }


    const reer= await Reservation.find({$and:[{idCentre:idCentre},{"DateDeMatch":period[0].DateDeDebut},{"idHourGame":idHourGame[0]._id}]})

                    /*.where('idCentre').equals(idCentre)
                    .where('idHourGame').equals(idHourGame[0]._id)
                    .where('DateDeMatch').equals(period[0].DateDeDebut)*/
                    .sort({DateDeMatch:1,idHourGame:1})
                    .populate("idHourGame")
                    .populate('idClient')
                    .populate("idCentre") 
                  
   return res.json({reservations:reer,numberAccept:accepter.length,terrain:nbr});
  }
  catch(e){
   res.status(400).json("err")

  }
});
router.route('/ReservationsSearch/:idCentre/:q1/:q2').get(async(req,res)=>{
  try{
  const DateDeMatch= await req.params.q1;
  const idHourGame=await req.params.q2;
  const idCentre=req.params.idCentre;
  const centre=await Centre.findById(idCentre);
  const nbr=await centre.nbrTerrains;
  const accepter=await Reservation.find({$and:[{"idCentre":idCentre},{"idHourGame":idHourGame},{"DateDeMatch":DateDeMatch}]})
                  .where('Status').in(['Acceptée'])
                  .sort({DateDeMatch:1,idHourGame:1})
                  .populate("idHourGame")
                  .populate('idClient')
                  .populate("idCentre") 
                  .limit(nbr);
  
  if(accepter.length===nbr){
    const reerawait=await Reservation.updateMany(
      {$and:[{"idCentre":idCentre},{"idHourGame":idHourGame},{"DateDeMatch":DateDeMatch},{Status:['En attente','Modifiée']}]}
      ,{$set:{Status:'Refusée'} }
  )

}
    
  const reer=await Reservation.find({$and:[{"idCentre":idCentre},{"idHourGame":idHourGame},{"DateDeMatch":DateDeMatch}]})
  .sort({DateDeMatch:1,idHourGame:1}).populate("idHourGame")
  .populate('idClient').populate("idCentre");/*find({idCentre:idCentre}).sort({DateDeMatch:1}).populate("idCentre")*/ 

      return    res.json({reservations:reer,numberAccept:accepter.length,terrain:nbr});
  }
  catch(e){
    res.status(400).json("error")
  }
    
});

router.route('/Rejectall/:idCentre/:q1/:q2').post(async(req,res)=>{
  try{
  const DateDeMatch= await req.params.q1;
  const idHourGame=await req.params.q2;
  const idCentre=await req.params.idCentre;

  const reer=await Reservation.updateMany(
                    {$and:[
                      {idCentre:idCentre},
                      {"DateDeMatch":DateDeMatch},
                      {"idHourGame":idHourGame},
                      {Status:['En attente','Modifiée']}
                    ]}
                    ,{$set:{Status:'Refusée'} }
                )

                  

      return    res.json(reer);

    }
    catch(e){
      res.status(400).json("error")
    }
      
});

router.route('/Accept/:id').post(async (req,res)=>{
try { 
  const updated=await Reservation.findByIdAndUpdate({_id:req.params.id},{Status:'Acceptée'},{ upsert: true })
                                .populate("idClient").populate("idCentre").populate("idHourGame");

  const period=await Period.find({idCentre:updated.idCentre._id}).sort({_id:-1}).limit(1);
 
  const RefuseOtherReservations=await Reservation.updateMany(
                              {
                                $and:[
                                {idClient:updated.idClient._id},
                                {idCentre:updated.idCentre._id},
                                {DateDeMatch: { $gte: period[0].DateDeDebut, $lte: period[0].DateDeFin }},
                                {Status:['En attente','Modifiée']}
                              ] 
                            }
                              ,{$set:{Status:'Refusée'} }
                              )
      var transporter=await nodemailer.createTransport({
        service:'gmail',
        secure: false,
        port: 25,
        tls: {
          rejectUnauthorized: false
      },
        auth:{
          user:'thewolves.matchs@gmail.com',
          pass:'BLACKwolf99 '
        }
      });
      var mailOption=await {
        from:'thewolves.matchs@gmail.com',
        to:updated.idClient.email,
        subject:'Un match',
        text:`Cher (e) `+updated.idClient.Nom+` `+updated.idClient.Prenom+` on vous rappelle que vous avez un match le `+
              new Date(updated.DateDeMatch).toLocaleDateString()
             +` à `+updated.idHourGame.HeureDebut+`:00h `+` au centre `+updated.idCentre.NomCentre
      
      }
      transporter.sendMail(mailOption,function(error,info){
        if(error){
          console.log("fin ghadi"+error)
        }else console.log("L'email est envoyé")
      })

}

catch(e){
  res.status(400).json("error")
}
  
});


router.route('/UpdateAll').post(async (req,res)=>{
 
/* const RefuseOtherReservations=await Reservation.deleteMany(
                               
    )*/
  const RefuseOtherReservations=await Reservation.updateMany(
                              {$set:{Status:'En attente'},
                            idHourGame:'5eac1c529c0f332f04a9ff4e' }
                              )
                             

  
  res.json(RefuseOtherReservations)
});

router.route('/Reject/:id').post(async (req,res)=>{
  const updated=await Reservation.findByIdAndUpdate({_id:req.params.id},{Status:'Refusée'},{ upsert: true })
  res.json(updated)
});

router.route('/GamesOfWeek/:idCentre').get(async(req,res)=>{
  //Cette fonction aide admin pour trouver les matches  de la semaine 
  try{
    const idCentre=req.params.idCentre;
    const centre=await Centre.findById(idCentre);
    const nbr=await centre.nbrTerrains;
    const idHourGame=await Hour.find().sort({_id:1});
    const period=await Period.find({idCentre:idCentre}).sort({_id:-1}).limit(1);
    const DateDeDebut=await period[0].DateDeDebut;
    const reer=await Reservation.find({$and:[{idCentre:idCentre},{"DateDeMatch":DateDeDebut},{"idHourGame":idHourGame[0]._id}]})
                    .where('Status').in(['Acceptée'])
                   // .sort({DateDeMatch:1,idHourGame:1})
                    .populate("idHourGame")
                    .populate('idClient')
                    .populate("idCentre") 
                    .limit(nbr);
    res.json(reer);
  }catch(e){
    res.status(400).json("err")
 }
});

router.route('/GamesSearch/:idCentre/:q1/:q2').get(async(req,res)=>{
 try{
  const DateDeMatch= await req.params.q1;
  const idHourGame=await req.params.q2;
  const idCentre=req.params.idCentre;
  const centre=await Centre.findById(idCentre);
  const nbr=await centre.nbrTerrains
  const reer=await Reservation.find({$and:[{"idCentre":idCentre},{"idHourGame":idHourGame},{"DateDeMatch":DateDeMatch}]})
                   // .sort({DateDeMatch:1,idHourGame:1})
                    .where('Status').in(['Acceptée'])
                    .populate("idHourGame")
                    .populate('idClient')
                    .populate("idCentre")
                    .limit(nbr);/*find({idCentre:idCentre}).sort({DateDeMatch:1}).populate("idCentre")*/ 
    return  res.json(reer);
 }
 catch(e){
   res.status(400).json("err")
 }  
});


router.route('/sendEmail').post(async(req,res)=>{
    // config for mailserver and mail, input your data
    var transporter=nodemailer.createTransport({
      service:'gmail',
      secure: false,
      port: 25,
      tls: {
        rejectUnauthorized: false
    },
      auth:{
        user:'hamzasabas99@gmail.com',
        pass:'blackwolf99'
      }
    });
    var mailOption={
      from:'hamzasabas99@gmail.com',
      to:'naimmed70@gmail.com',
      subject:'ha kanjrbu',
      text:`lah ihfdek yk nta hani`
    }
    transporter.sendMail(mailOption,function(error,info){
      if(error){
        res.json("fin ghadi"+error)
      }else res.json(
        "safi l amana rah wslat   "
      )
    })

    /*const config = {
    mailserver: {
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      service: 'gmail',
      auth: {
        user: 'naimmed70@gmail.com',
        pass: 'blackwolf'
      }
    },
    mail: {
      from: 'naimmed70@gmail.com',
      to: 'hamzsabas99@gmail.com',
      subject: 'Hey',
      text: 'Testing Nodemailer'
    }
  };
  
  const sendMail = async ({ mailserver, mail }) => {
    // create a nodemailer transporter using smtp
    let transporter = nodemailer.createTransport(mailserver);
  
    // send mail using transporter
    let info = await transporter.sendMail(mail);
  
    console.log(`Preview: ${nodemailer.getTestMessageUrl(info)}`);
  };
  
  sendMail(config).catch(console.error);
  */
});

router.route('/StatistiqueOfCentre/:idCentre').get(async (req,res)=>{
  try{
      let reservation_enAttente=await 0; 
      let reservation_Updated=await 0;
      let reservation_accepter=await 0;
      let reservation_refuser=await 0;

      const reservations=await Reservation.find({idCentre:req.params.idCentre});
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
    res.status(400).json("err")
  }

});
module.exports=router
