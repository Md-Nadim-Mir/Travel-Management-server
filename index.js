const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000 ;


// middleware
app.use(cors())

app.get('/',(req,res)=>{
     res.send(`server is running port in ${port}`);
})


app.listen(port,()=>{
    console.log(`PORT is running ${port}`)
})