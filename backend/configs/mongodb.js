import mongoose from "mongoose";

// const mongodbConnection = process.env.MONGODB;

// const connection = async ()=>{
//     await mongoose.connect(mongodbConnection);
// }

// connection().then(()=>{
//     console.log("Database Connection Successful");
    
// }).catch((error)=>{
//     console.log("Database Connection Failed", error);
    
// })

// export default connection;

const mongodbConnection = process.env.MONGODB;

const connectionDB = async ()=>{

    try {
        mongoose.connection.on('connected', ()=>{
            console.log("Database Connection Successful");
        });
        await mongoose.connect(mongodbConnection)
    } catch (error) {
        console.log("Database Connection Failed", error);
        
    }

}

export default connectionDB;