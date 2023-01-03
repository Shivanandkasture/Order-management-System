const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://Shivanandkasture:W7tqiVrCQy7g4F7h@cluster0.a35v6.mongodb.net/Order_DB?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("mongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen( 5000, function () {
    console.log('Express app running on port ' + (5000))
});
