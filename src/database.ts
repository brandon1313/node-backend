import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const client = await mongoose.connect('mongodb://localhost/companydb')
        console.log('connected to DB')
    } catch (error) {
        console.error(error)
        throw error
    }
}


