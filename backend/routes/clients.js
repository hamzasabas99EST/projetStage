const router=require('express').Router();
let Client=require('../models/client.model');

router.route('/add').post((req,res)=>{
    const CIN=req.body.CIN;
    const Nom=req.body.Nom;
    const Prenom=req.body.Prenom;
    const email=req.body.email;
    const motdepass=req.body.motdepass;
    const idVille=req.body.idVille;
    
    const newClient=new Client({
        CIN, Nom,Prenom,email, motdepass,idVille
    });
    newClient.save()
    .then(()=>res.json('Client addd'))
    .catch(err=>res.status(400).json('Error'+err));
});

router.route('/login').post(async(req,res)=>{
    const email=req.body.email;
    const motdepass=req.body.motdepass;
    
   //Client.find({$and:[{'email':email},{'motdepass':motdepass}]})
   const login= await Client.findOne({'email':email});
    //.then(login=>{
        if(!login){
            return res.status(404).send({message:"invalide user "});
        }
       else if(motdepass!==login.motdepass){
           return res.status(404).send({message:"invalide mot de passe"});
       }
       
       return res.status(200).send({login});

       // })
    //.catch(err=>res.status(400).send({message:"fin ghadi  "}));
});

router.route('/findClient/:CIN').get(async(req,res)=>{
    try{
    const CIN=await req.params.CIN;
    let isHere=await false;
      const client=await Client.find({$and:[{'CIN':CIN}]});
     if(client.length===1) isHere=true;

     res.json(isHere)
    }catch (e){
        console.log("haha")
    }
});


module.exports=router

