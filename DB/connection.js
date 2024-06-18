import { MongoClient } from  "mongodb";
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
 
export const db = client.db("Car_Rental_System");

export const db_connection= async()=>{
    try{
        await client.connect();
        console.log("connected successfully ");
    }catch(error){
        console.log(error);
        console.log("Error in db connection");
    }
}