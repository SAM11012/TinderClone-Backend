const express = require('express')
const connectDatabase = require('./config/database')
const app  = express()
const User = require('./models/user')
app.use(express.json())

app.post('/signUp',async (req,res)=>{
    const newUser = new User (req.body)
    try{
        await newUser.save()
        console.log((req.body),'the body')
        res.send('user added successfully')
    }catch(err){
        console.log('the error is -', err )
    }
   
    

})
connectDatabase().then(()=>{
    console.log('connected to database')
       app.listen(7777,()=>{
        console.log('app listeming')
       }) 
    }
).catch((err)=>console.log('this is error',err))

