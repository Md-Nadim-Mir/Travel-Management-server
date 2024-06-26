const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000 ;


// middleware
app.use(cors())

app.get('/',(req,res)=>{
     res.send(`server is running port in ${port}`);
})

// users management routes start 

// ----> user read 
app.get('/users',(req,res)=>{
    res.send(users)
})

// ---> user create
app.post('/users',(req,res)=>{
    console.log('data posted');
    console.log(req.body);
})
// users management routes end


app.listen(port,()=>{
    console.log(`PORT is running ${port}`)
})