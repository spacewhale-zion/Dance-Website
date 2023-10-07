const express=require("express");
const path=require('path');
const mongoose = require('mongoose');
const bodyparser=require("body-parser")
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactdance');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const app=express();
const port=80;
// const fs=require('fs');

//define mongoose schema
const ContactSchema = new mongoose.Schema({
    name: String,
    phone: Array,
    email: String,
    address: String,
    desc: String
    
  });
  const Contact = mongoose.model('Contact', ContactSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded());


app.set('view engine', 'pug');
app.set('views',path.join(__dirname, 'views'));


// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to database")

    }).catch(()=>{
        res.status(400).send("Item was not saved on database")
    })
    // res.status(200).render('contact.pug', params);
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
