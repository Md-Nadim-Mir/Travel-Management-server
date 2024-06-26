const express = require('express');
const app = express();
const port = process.env.PORT || 3000 ;

app.get('/',(req,res)=>{
     res.send(`server is running port in ${port}`);
})


app.listen(port,()=>{
    console.log(`PORT is running ${port}`)
})