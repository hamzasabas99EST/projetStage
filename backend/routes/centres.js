const router=require('express').Router();
let Ville=require('../models/ville.model');
let Centre=require('../models/centre.model');
let Terrain=require('../models/terrain.model');
let Admin=require('../models/Admin.model');


router.route('/villes').get((req,res)=>{
        Ville.find()
        .then(villes=>res.json(villes))
         .catch(err=>res.status(400).json('Error : '+err))
}); 

router.route('/addV').post((req,res)=>{
     const NomVille=req.body.NomVille;
    
    
    const newVille=new Ville({
        NomVille
    });
    newVille.save()
    .then(()=>res.json('Client added'))
    .catch(err=>res.status(400).json('Error'+err));
});

router.route('/addCentre').post((req,res)=>{
    const NomCentre=req.body.NomCentre;
    const Adresse=req.body.Adresse;
    const nbrTerrains=req.body.nbrTerrains;
    const idVille=req.body.idVille;
   
   
   const newCentre=new Centre({
        NomCentre,
        Adresse,
        nbrTerrains,
        idVille

   });
   newCentre.save()
   .then(()=>res.json(newCentre.Adresse))
   .catch(err=>res.status(400).json('Error'+err));
});

router.route('/addTerrain').post((req,res)=>{
    const NumeroTerrain=req.body.NumeroTerrain;
    const typeTerrain=req.body.typeTerrain;
    const idCentre=req.body.idCentre;
    
   const newTerrain=new Terrain({
         NumeroTerrain,typeTerrain,idCentre,
        });
   newTerrain.save()
   .then(terrain=>{
    if(newTerrain){
        Centre.findByIdAndUpdate({_id:newTerrain.idCentre},{$inc:{nbrTerrains:1}})
       .then(centre=>{
        res.json('u did it')})
    }
})
   .catch(err=>res.status(400).json('Error'+err));

 /*  if(newTerrain!=NULL){
       Centre.findByIdAndUpdate({_id:newTerrain.idCentre},{$inc:{nbrTerrains:1}})
       .then(centre=>{
        res.json('u did it')
  })
   }*/
});


router.route('/findCentres/:idVille').get((req,res)=>{
    const idVille=req.params.idVille;
    
    Centre.find({idVille:idVille})
    .then(centres=>res.send(centres))
    .catch(err=>res.status(400).json('Error'+err));
});

router.route('/findCentres/:idCentre').get((req,res)=>{
    const id=req.params.idCentre;
    
    Centre.findById(id)
    .then(centres=>res.send(centres))
    .catch(err=>res.status(400).json('Error'+err));
});

router.route('/AboutUs').get(async (req,res)=>{
    try{
        let admins=await (await Admin.find()).length; 
        let centres=await (await Centre.find()).length;
        let terrains=await (await Terrain.find()).length;
        let villes=await (await Ville.find()).length;

        
    var Statistique=await {
         "admin": admins,
         "centre": centres,
         "terrain": terrains,
         "ville": villes
        }

    res.json(Statistique)
    }catch(e){
        console.log(e);
    }
 
 });
module.exports=router

