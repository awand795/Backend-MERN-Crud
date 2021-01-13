const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./app/model/index');
const port = process.env.PORT || 8080;

var corsOptions = {
    origin : 'http://localhost:8081'
};

app.use(cors(corsOptions));

app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.json({message:'Welcome to mern stack application'})
});

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log('Connected to the database!');
    })
    .catch(err=>{
        console.log('Cannot connect to the database!',err);
        process.exit();
    });

require('./app/routes/tutorial.routes')(app);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});