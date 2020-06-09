const router=require('express').Router();
let Joueur=require('../models/joueur.model');
let Equipe=require('../models/equipe.model');

router.route('/add').post((req,res)=>{
    const NomEquipe=req.body.NomEquipe;
    const newEquipe=new Equipe({
        NomEquipe 
    });
    newEquipe.save()
    .then(equipe=>res.json(equipe))
    .catch(err=>res.status(400).json('Error'+err));
     
});

router.route('/addplayer/:idEquipe').post(async(req,res)=>{
  
     var Joueurs=[]
     
    const equipe= await Equipe.create({
        NomEquipe:"AZli"
    })

     for(var i in req.body){
         Joueurs.push({CIN:req.body[i],idEquipe:equipe._id})
     }
     console.log(Joueurs);

    /* const newJoueur= new*/  
    const players=await Joueur.insertMany(Joueurs)
       // newJoueur.save()
    res.json(players)
    
});

router.route('/findplayer').post((req,res)=>{
   
    const CIN=req.body.CIN;
    Joueur.find({'CIN':CIN})
    .then(player=>{
        if(player){
            Equipe.findById(player._id)
            player.NomEquipe=Equipe.NomEquipe;
            res.json(player)

        }
    })
    .catch(err=>res.status(400).json('Error'+err));
   
    
});

router.route('/findplayers').post((req,res)=>{
   
const idEquipe=req.body.idEquipe;
 
  Joueur.find({'idEquipe':idEquipe})
    .then(joueurs=>res.json(joueurs))
    .catch(err=>res.status(400).json('Error'+err));


    
});

router.route('/findteam/{:id}').post((req,res)=>{
    Equipe.findById(req.params.id)
    .then(equipe=>res.json(equipe))
    .catch(err=>res.status(400).json('Error'+err));


    
});



module.exports=router

