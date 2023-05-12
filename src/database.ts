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


/**
 * public static String balancedSums(List<Integer> arr) {
            for(int i = 0; i < arr.size(); i++){
                int rigthSum = 0;
                for(int j = i+1; j <= arr.size()-1; j++){
                    rigthSum+=arr.get(j);
                }
                int leftSum = 0;
                for(int k = i-1; k >= 0; k--){
                    leftSum+=arr.get(k);
                }
                System.out.println(rigthSum + " "+ leftSum);
                if(rigthSum == leftSum)
                    return "YES";
            }
    return "NO";
    }   
 */