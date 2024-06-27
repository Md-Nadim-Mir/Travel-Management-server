const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000 ;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


// middleware
app.use(cors());
app.use(express.json())

// travel-management
// qT0vDfIUOcRzksKH

// mongodb cluster added



const uri = "mongodb+srv://travel-management:qT0vDfIUOcRzksKH@atlascluster.ynftepn.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const usersCollection = client.db('travel-management').collection('users');
    const placesCollection=client.db('travel-management').collection('places');


    // <-----------   Users Management ------------------->


    // <------------------  User read from database database  ------------------------->
    app.get('/users',async(req,res)=>{
        const cursor =  usersCollection.find();
        const result = await cursor.toArray();
        res.send(result);

    })

    // <------------------ Single User read from database database  ------------------------->
    app.get('/users/:id',async(req,res)=>{
      const id = req.params.id;
      const query= {_id : new ObjectId(id)};
      const result = await usersCollection.findOne(query);
      res.send(result);

  })


    // <------------------  User create and post database  ------------------------->
    app.post('/users',async(req,res)=>{

        const user=req.body;
        console.log(user);
        const result = await usersCollection.insertOne(user);
        res.send(result);

    })


    // <------------------  User update from client site to database  ------------------------->

    app.put('/users/:id',async(req,res)=>{
       
        const id =req.params.id;
        const user = req.body;
        const filter = {_id: new ObjectId(id)};
        const option = {upsert : true};
        const updateUser = {
          $set:{
            role : user.role
          }
        }
        const result = await usersCollection.updateOne(filter,updateUser,option);
        res.send(result);

       
    })



    // <------------------  User delete from database  ------------------------->
    app.delete('/users/:id',async(req,res)=>{

        const id=req.params.id;
        const query = {_id : new ObjectId(id)}
        console.log(id);
        const result = await usersCollection.deleteOne(query);
        res.send(result);

    })

    // <-----------------------   Users Database End   -------------------------->



    // <----------------------- Place Database Start -------------------------->


    // <---------------------- Places : GET Method ---------------------->
    app.get('/places',async(req,res)=>{
       
          const cursor  =  placesCollection.find();
          const  result = await cursor.toArray();
          res.send(result);
       
    })


    //  <--------------------  Single Places:get method  -------------------->
   
    app.get('/places/:id',async (req,res)=>{

      const id= req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await placesCollection.findOne(query);
      res.send(result);

     })

    //  <---------- places : POST Method ----------->
    app.post('/places',async(req,res)=>{

         const place = req.body;
         console.log(place);
         const result = await placesCollection.insertOne(place);
         res.send(result);
       
    })

    // <------------------- Places : UPDATE method ------------>
    app.put('/places/:id',async(req,res)=>{

      const id =req.params.id;
      const place = req.body;
      const filter = {_id: new ObjectId(id)};
      const option = {upsert : true};
      const updatePlace = {
        $set:{
          name : place.name,
          image : place.image,
          location: place.location,
          description : place.description
        }
      }
      const result = await usersCollection.updateOne(filter,updatePlace,option);
      res.send(result);
     
    })

   

    //  <----------- Places : DElETE method>
    app.delete('/places/:id',async(req,res)=>{
         
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result =await placesCollection.deleteOne(query);
        res.send(result);
       
    })

    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
     res.send(`server is running port in ${port}`);
})

// users management routes start 

// ----> user read 
// app.get('/users',(req,res)=>{
//     // res.send(users)
// })

// // ---> user create
// app.post('/users',(req,res)=>{
//     console.log('data posted');
//     console.log(req.body);
// })
// users management routes end


app.listen(port,()=>{
    console.log(`PORT is running ${port}`)
})