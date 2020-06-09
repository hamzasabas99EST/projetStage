const router=require('express').Router();
let Client=require('../models/client.model');

router.route('/add').post((req,res)=>{
    const CIN=req.body.CIN;
    const Nom=req.body.Nom;
    const Prenom=req.body.Prenom;
    const telephone=req.body.telephone;
    const email=req.body.email;
    const motdepass=req.body.motdepass;
    const idVille=req.body.idVille;
    
    const newClient=new Client({
        CIN, Nom,Prenom,telephone,email, motdepass,idVille
    });
    newClient.save()
    .then(()=>res.json('Client addd'))
    .catch(err=>res.status(400).json('Error'+err));
});

router.route('/login').post(async(req,res)=>{
    const email=req.body.email;
    const motdepass=req.body.motdepass;
    
   //Client.find({$and:[{'email':email},{'motdepass':motdepass}]})
   //.then(login=>{
       // })
       //.catch(err=>res.status(400).send({message:"fin ghadi  "}));
   const login= await Client.findOne({'email':email});
        if(!login){
            return res.status(404).send({errUser:true,message:"invalide client "});
        }
       else if(motdepass!==login.motdepass){
           return res.status(404).send({errPass:true,message:"invalide mot de passe"});
       }
       
      else  return res.status(200).send({login});

});

router.route('/findClient/:CIN/:email').get(async(req,res)=>{
    try{
        const CIN=await req.params.CIN;
        const email=await req.params.email;
    let isHere=await false;
      const client=await Client.find({$or:[{'CIN':CIN},{'email':email}]});
     if(client.length===1) isHere=true;

     res.json(isHere)
    }catch (e){
        console.log("haha")
    }
});


module.exports=router

