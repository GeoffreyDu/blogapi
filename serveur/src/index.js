import express from "express"
import "dotenv/config"
import mongoose from 'mongoose'
import volleyball from 'volleyball'
import { restRouter } from './api';
const {PORT, DBurl} = process.env
const app = express()

mongoose.connect(DBurl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("[MongoDB]:ça marche ici");
});
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(volleyball)
app.use('/api', restRouter)

app.listen(PORT,()=>{
  console.log(`L'app marche sur le port: ${PORT}`);
})
