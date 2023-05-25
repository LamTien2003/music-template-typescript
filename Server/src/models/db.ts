import mongoose,{ ConnectOptions } from "mongoose";
const connect= async () =>  {
    try {
        await mongoose.connect('mongodb://localhost:27017/AsmTypescript', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        console.log('Connect successfully!!!'); 
    } catch (error) {
        console.log('Connect failure!!!' + error);
    }
};
export default connect