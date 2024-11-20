import mongoose from "mongoose";

const connection = async (USERNAME, PASSWORD) => {
    const URL= `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.wvml3dw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    try{ 
       await mongoose.connect(URL, { useNewUrlParser: true });
       console.log('Database Connected successfully');
    } catch (error){
        console.log('Error while connecting with the database', error);
    }
}

export default connection;