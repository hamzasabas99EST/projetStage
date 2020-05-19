const express=require('express');
const app=express();
const cors = require('cors');
const path = require('path');


app.use(express.json());
const mongoose=require('mongoose'); 
app.use(cors());
app.use(express.static(path.join(__dirname,'./build')));


//Connect to the db mongodb://localhost:27017/Stage

mongoose.connect('mongodb://localhost:27017/Stage', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true,
  useFindAndModify:false
});
const connection=mongoose.connection;
connection.once('open',()=>{
  console.log("Mongo db is seccessfully");
})

app.get('/' ,(req,res)=>{
  res.sendFile(path.join(__dirname,'./build/index.html'))
})

const ClientRouter=require('./routes/clients');
app.use('/clients',ClientRouter);


const VilleRouter=require('./routes/centres');
app.use('/centres',VilleRouter);


const EquipeRouter=require('./routes/equipes');
app.use('/equipes',EquipeRouter);

const ReservationRouter=require('./routes/reservations');
app.use('/reservations',ReservationRouter);

const AdminRouter=require('./routes/admins');
app.use('/admins',AdminRouter);


app.listen(9017,()=>{
    console.log("server is ready");
})