const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const dotenv=require('dotenv');
const mongoClient = mongodb.MongoClient;

const app=express();





//port
//CONNECTING TO PORT
const port=process.env.PORT||3000;
app.listen(port,()=>console.log(`App started in ${port}`));




//objectId
const objectId = mongodb.ObjectId;

//middle-ware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

//dotenv
dotenv.config();
MONGO_URL=process.env.MONGO_URL;


console.log(process.env.MONGO_URL);



// MONGO_URL=process.env.MONGO_URL;
// console.log(process.env.MONGO_URL);



//initial
app.get('/',(req,res)=>
{
    res.status(200).send('WELCOME');
});





async function createConnection() {
    const client = new mongoClient(process.env.MONGO_URL);

    console.log("Mongodb is connected ✌😊");
    }
   
  
  
  const client =  createConnection();
  app.use(express.json());

   


// get all the details

app.get('/student',async(req,res)=>
{
    try{
        console.log('included cors');
        let client=await mongoClient.connect(process.env.MONGO_URL);
        let db=client.db('data');
        let data= await db.collection('mentorstudenttask')
        .find().toArray();
        if(data)
        res.status(200).json({
            output:'data added successfully'
        });
        else res.status(400).send('something went wrong');
        client.close();
    }

    catch(error)
    {
        console.log(error);
        res.status(500).json({
            message:'error in get'
        });
    }

});

//get mentor
  app.get('/mentor',async(req,res)=>
  {
    try{
        console.log('included cors');
        let client=await mongoClient.connect(process.env.MONGO_URL);
        let db=client.db('data');
        let data=await db.collection('mentorstudenttask')
        .find().toArray();
        if(data)
        res.status(200).json(
            {
                output:'data added successfully'
            }
        );
        else 
        res.status(400).send('something went wrong');
        client.close();
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(
            {
                message:'error in get'
            }
        );
    }
  });


  //creating student

  app.post('/create-student',async (req,res)=>
  


    {
      
    
    try{
        let client=await mongoClient.connect(process.env.MONGO_URL);
        let db=client.db('data');
        let check=await db.collection('mentorstudenttask')
        .insertOne(
            {
                name:req.body.name,
                emailId:req.body.emailId,
                course:req.body.course
            }
        );
        if(check.ops)
        {
            res.status(200).json(
                {
                    message:'student added Successfully'
                   
                }
            );
        }
        else{
            res.status(400).json(
                {
                    message:'something went wrong'
                }
            );
        }
        client.close();
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(
            {
                message:'Internal server error'
            }
        );
    }
   
});

  //create mentor
  app.post('/create-mentor',async (req,res)=>
  {
  
 


    try
    {
        let client=mongoClient.connect('process.env.MONGO_URL');
        let db=client.db('data');
        let check=await db.collection('mentorstudenttask').MONGO_URLinsertOne(
            {
                name:req.body.name,
                emailId:req.body.emailId,
                course:req.body.course,
                students:req.body.students
            }
        );
        if(check.ops)
        {
            res.status(200).json(
                {
                    message:'mentor added successfully'
                }
            );
        }
        else
        {
            res.status(400).json(
                {
                    message:'something went wrong'
                }
            );
        }
        client.close();
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json(
            {
                message:'internal server error'
            }
        );
    }
  });


 
