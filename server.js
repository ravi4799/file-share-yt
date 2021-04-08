require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const user = {};
const PORT = process.env.PORT || 3000;
const io = require('socket.io')(http);
const path = require('path');
const cors = require('cors');



// Cors
const corsOptions = {

    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  
  //['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
}


app.use(cors(corsOptions));

app.use(express.static('public'));
app.use(express.json());

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {
  console.log('connected');
});

const connectDB = require('./config/db');
connectDB();



app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes

app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));


app.listen(PORT, console.log(`Listening on port ${PORT}.`));
