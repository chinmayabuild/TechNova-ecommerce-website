//import express
//initialise express
// port define
//listen the port

const express = require ("express");

const app = express();

const cors = require ('cors');

const dotenv = require("dotenv");
dotenv.config();


const port =  process.env.PORT || 5000;

const {readdirSync} = require ("fs");
const { connect } = require("http2");
const {connectDb} = require("./db/connection")

// handeling connetion error
app.use(cors({origin:process.env.CLIENT_URL}));

app.use(express.json());

connectDb();


 app.get("/", (req, res) => {
    res.send(`<center><h1>Searver running on port ${port}</h1></center>`)
 }) 


  //Dynamic include routes
  readdirSync("./routes").map((route) => {
    app.use("api", require(`./routes/${route}`))
  })


app.listen(port, () =>{
    console.log(`server is running on port ${port}`)
})