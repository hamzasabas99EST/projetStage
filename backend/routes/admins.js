const router=require('express').Router();
let Admin=require('../models/Admin.model');
let Period=require('../models/period.model');
let Reservation=require('../models/reservation.model')
let Centre=require('../models/centre.model')
let Hour=require('../models/hour.model');


router.route('/addAdmin').post((req,res)=>{
    const Nom=req.body.Nom;
    const Prenom=req.body.Prenom;
    const email=req.body.email;
    const motdepass=req.body.motdepass;
    const idCentre=req.body.idCentre;
    
    const newAdmin=new Admin({
         Nom,Prenom,email,motdepass,idCentre,isLogged:false
    });
    newAdmin.save()
    .then(()=>res.json('Admin addd'))
    .catch(err=>res.status(400).json('Error'+err));
});

router.route('/loginAdmin').post((req,res)=>{
    const email=req.body.email;
    const motdepass=req.body.motdepass;
    
    Admin.find({$and:[{'email':email},{'motdepass':motdepass}]})
    .then(admin=>res.send(admin))
    .catch(err=>res.status(400).json('Error'+err));
});

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
  //Cette fonction aide admin pour trouver les reservations evoyées 
    const idCentre=req.params.idCentre;
    const centre=await Centre.findById(idCentre);
    const nbr=await centre.nbrTerrains
    const idHourGame=await Hour.find().sort({_id:1});
    const period=await Period.find(idCentre=>idCentre).sort({_id:-1}).limit(1);
    const DateDeDebut=await period[0].DateDeDebut;
    const reer=await Reservation.find({$and:[{idCentre:idCentre},{"DateDeMatch":DateDeDebut},{"idHourGame":idHourGame[0]._id}]})
                    .sort({DateDeMatch:1,idHourGame:1})
                    .populate("idHourGame")
                    .populate('idClient')
                    .populate("idCentre") 
                    .limit(nbr*2);
    res.json(reer);
});
router.route('/ReservationsSearch/:idCentre/:q1/:q2').get(async(req,res)=>{
  const DateDeMatch= await req.params.q1;
  const idHourGame=await req.params.q2;
  const idCentre=req.params.idCentre;
  const centre=await Centre.findById(idCentre);
  const nbr=await centre.nbrTerrains
  const reer=await Reservation.find({$and:[{"idCentre":idCentre},{"idHourGame":idHourGame},{"DateDeMatch":DateDeMatch}]})
                  //.where('Status').in(['En attente','Updated'])
                    .sort({DateDeMatch:1,idHourGame:1}).populate("idHourGame")
                    .populate('idClient').populate("idCentre").limit(nbr*2);/*find({idCentre:idCentre}).sort({DateDeMatch:1}).populate("idCentre")*/ 
    return  res.json(reer);
    
});


router.route('/Accept/:id').post(async (req,res)=>{
  const updated=await Reservation.findByIdAndUpdate({_id:req.params.id},{Status:'Accepter'},{ upsert: true })
  res.json(updated)
});

router.route('/Reject/:id').post(async (req,res)=>{
  const updated=await Reservation.findByIdAndUpdate({_id:req.params.id},{Status:'Refuser'},{ upsert: true })
  res.json(updated)
});

router.route('/GamesOfWeek/:idCentre').get(async(req,res)=>{
  //Cette fonction aide admin pour trouver les matches  de la semaine 
  try{
    const idCentre=req.params.idCentre;
    const centre=await Centre.findById(idCentre);
    const nbr=await centre.nbrTerrains;
    const idHourGame=await Hour.find().sort({_id:1});
    const period=await Period.find(idCentre=>idCentre).sort({_id:-1}).limit(1);
    const DateDeDebut=await period[0].DateDeDebut;
    const reer=await Reservation.find({$and:[{idCentre:idCentre},{"DateDeMatch":DateDeDebut},{"idHourGame":idHourGame[0]._id}]})
                    .where('Status').in(['Accepter'])
                   // .sort({DateDeMatch:1,idHourGame:1})
                    .populate("idHourGame")
                    .populate('idClient')
                    .populate("idCentre") 
                    .limit(nbr);
    res.json(reer);
  }catch(e){
    console.log(e);
  }
});

router.route('/GamesSearch/:idCentre/:q1/:q2').get(async(req,res)=>{
  const DateDeMatch= await req.params.q1;
  const idHourGame=await req.params.q2;
  const idCentre=req.params.idCentre;
  const centre=await Centre.findById(idCentre);
  const nbr=await centre.nbrTerrains
  const reer=await Reservation.find({$and:[{"idCentre":idCentre},{"idHourGame":idHourGame},{"DateDeMatch":DateDeMatch}]})
                   // .sort({DateDeMatch:1,idHourGame:1})
                    .where('Status').in(['Accepter'])
                    .populate("idHourGame")
                    .populate('idClient')
                    .populate("idCentre")
                    .limit(nbr);/*find({idCentre:idCentre}).sort({DateDeMatch:1}).populate("idCentre")*/ 
    return  res.json(reer);
    
});


/*router.route('/sendEmail').post(async(req,res)=>{
    // config for mailserver and mail, input your data
const config = {
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
});*/

router.route('/StatistiqueOfCentre/:idCentre').get(async (req,res)=>{
  try{
      let reservation_enAttente=await 0; 
      let reservation_Updated=await 0;
      let reservation_accepter=await 0;
      let reservation_refuser=await 0;

      const reservations=await Reservation.find({idCentre:req.params.idCentre});
      for(let i=0;i<reservations.length;i++){
          if(reservations[i].Status==="En attente") reservation_enAttente++;
          else if(reservations[i].Status==="Updated") reservation_Updated++;
          else if(reservations[i].Status==="Accepter") reservation_accepter++; 
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
