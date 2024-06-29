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
    const hotelsCollection=client.db('travel-management').collection('hotels');
    const packagesCollection=client.db('travel-management').collection('packages');
    const blogsCollection=client.db('travel-management').collection('blogs');








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
          description : place.description,
          date : place.date
        }
      }
      const result = await placesCollection.updateOne(filter,updatePlace,option);
      res.send(result);
     
    })

   

    //  <----------- Places : DElETE method>
    app.delete('/places/:id',async(req,res)=>{
         
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const result =await placesCollection.deleteOne(query);
        res.send(result);
       
    })





    // <---------------  Places  Database end ----------- > 






    // <----------------------- Hotel Database Start -------------------------->


    // <---------------------- Hotel : GET Method ---------------------->
    app.get('/hotels',async(req,res)=>{
       
      const cursor  =  hotelsCollection.find();
      const  result = await cursor.toArray();
      res.send(result);
   
})


//  <--------------------  Single Hotel : get method  -------------------->

app.get('/hotels/:id',async (req,res)=>{

  const id= req.params.id;
  const query = {_id : new ObjectId(id)};
  const result = await hotelsCollection.findOne(query);
  res.send(result);

 })


//  <---------- Hotels : POST Method ----------->
app.post('/hotels',async(req,res)=>{

     const hotel = req.body;
     console.log(hotel);
     const result = await hotelsCollection.insertOne(hotel);
     res.send(result);
   
})

// <------------------- Hotels : UPDATE method ------------>
app.put('/hotels/:id',async(req,res)=>{

  const id =req.params.id;
  const hotel = req.body;
  const filter = {_id: new ObjectId(id)};
  const option = {upsert : true};
  const updateHotel = {
    $set:{
      name : hotel.name,
      image : hotel.image,
      location: hotel.location,
      description : hotel.description,
      date : hotel.date
    }
  }
  const result = await hotelsCollection.updateOne(filter,updateHotel,option);
  res.send(result);
 
})



//  <----------- Hotels : DElETE method>
app.delete('/hotels/:id',async(req,res)=>{
     
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const result =await hotelsCollection.deleteOne(query);
    res.send(result);
   
})



// <----------------- Hotels Database end -------------------- > 







// <----------------------- Packages Database Start -------------------------->


    // <---------------------- Packages : GET Method ---------------------->
    // app.get('/packages',async(req,res)=>{
       
    //   const cursor  =  packagesCollection.find();
    //   const  result = await cursor.toArray();
    //   res.send(result);
   
    //  })


//  <--------------------  Single Packages : get method  -------------------->

//  app.get('/packages/:id',async (req,res)=>{

//   const id= req.params.id;
//   const query = {_id : new ObjectId(id)};
//   const result = await packagesCollection.findOne(query);
//   res.send(result);

//  })


//  <---------- Packages : POST Method ----------->
app.post('/packages',async(req,res)=>{

     const package = req.body;
     console.log(blog);
     const result = await packagesCollection.insertOne(package);
     res.send(result);
   
 })

// <------------------- Packages : UPDATE method ------------>
app.put('/packages/:id',async(req,res)=>{

  const id =req.params.id;
  const package = req.body;
  const filter = {_id: new ObjectId(id)};
  const option = {upsert : true};
  const updatePackages = {
    $set:{
      
    }
  }
  const result = await packagesCollection.updateOne(filter,updatePackages,option);
  res.send(result);
 
})



//  <----------- Packages : DElETE method>
app.delete('/blogs/:id',async(req,res)=>{
     
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const result =await blogsCollection.deleteOne(query);
    res.send(result);
   
})



// <----------------- Packages Database end -------------------- > 






// <----------------------- Blog Database Start -------------------------->


    // <---------------------- Blog : GET Method ---------------------->
    app.get('/blogs',async(req,res)=>{
       
      const cursor  =  blogsCollection.find();
      const  result = await cursor.toArray();
      res.send(result);
   
     })


//  <--------------------  Single Blog : get method  -------------------->

app.get('/blogs/:id',async (req,res)=>{

  const id= req.params.id;
  const query = {_id : new ObjectId(id)};
  const result = await blogsCollection.findOne(query);
  res.send(result);

 })


//  <---------- Blogs : POST Method ----------->
app.post('/blogs',async(req,res)=>{

     const blog = req.body;
     console.log(blog);
     const result = await blogsCollection.insertOne(blog);
     res.send(result);
   
 })

// <------------------- Blogs : UPDATE method ------------>
app.put('/blogs/:id',async(req,res)=>{

  const id =req.params.id;
  const blog = req.body;
  const filter = {_id: new ObjectId(id)};
  const option = {upsert : true};
  const updateBlog = {
    $set:{
      name : blog.name,
      image : blog.image,
      writer: blog.writer,
      description : blog.description,
      date : blog.date
    }
  }
  const result = await blogsCollection.updateOne(filter,updateBlog,option);
  res.send(result);
 
})



//  <----------- Blogs : DElETE method>
app.delete('/blogs/:id',async(req,res)=>{
     
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const result =await blogsCollection.deleteOne(query);
    res.send(result);
   
})



// <----------------- Blogs Database end -------------------- > 









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