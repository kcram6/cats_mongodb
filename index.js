const bodyParser = require('body-parser');
const express = require('express');
var mongoose = require('mongoose');


//mongoose connection
mongoose.connect('mongodb://kcram:chickensarerockstars21@ds157654.mlab.com:57654/web4200', {useNewUrlParser: true});

//mongoose models
const Cat = mongoose.model('Cat', { 
    name: String, 
    age: Number, 
    owner: String,
    image: String
});

//app and middleware setup
let app = express(); //calls express like a function and returns an express object that you can use to configure(app)
app.use(bodyParser.urlencoded({ extended:false }));




app.get('/cats', (req, res) => {
    Cat.find().then(function (cats) {
        res.set("Access-Control-Allow-Origin", "*")
        res.json(cats); 
    });
    //sets your status code, sets your applications type header, sets body, stringifies json, and ends response
});

app.post('/cats', (req, res) => {
    console.log("the body ", req.body);

    if (!req.body.name || !req.body.age || !req.body.owner || !req.body.image) {
        res.sendStatus(422);
        return;
    }

    const cat = new Cat({ name: req.body.name, age: req.body.age, owner:req.body.owner, image:req.body.image});
    cat.save().then(function() {
        res.set("Access-Control-Allow-Origin", "*")
        res.sendStatus(201); //status code and end in one, if you odnt need a body
    })
    
});
//express automatically does 404 responses for you





app.listen(8080, () => {
    console.log('listening on 8080');
})

