import mongoose from 'mongoose'

const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost/companydb')
        console.log('connected to DB')
    }catch(error){
        console.error(error)
    }
}


export default connectDB