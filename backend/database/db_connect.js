import mongoose from "mongoose";
console.log("Welcome to mongoose");
import dotenv from 'dotenv'

// dotenv.config({path:'../config.env'})


const Connection = async () => {
  console.log("go to db connect");
  // const url = process.env.DATABASE
  // const url ='mongodb+srv://Jenil45:Rb@45-93@messmanagement.wxqw4s9.mongodb.net/test'
  await mongoose.connect(process.env.DATABASE).then(() => {
    console.log('Connection Successfull')
  }).catch((e)=> {
    console.log('Error of db :',e);
  })

};

export default Connection;
