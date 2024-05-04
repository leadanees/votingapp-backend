import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
    {
        userName:{
            type: String,required: true
        },
        candidate:{
            type:String ,required : true,
        },
        email:{
            type:String ,required : true,
        },
        userId:{
            type:String ,required : true,
        },
        candidateId:{
            type:String ,required : true,
        },
      
    },
    {timestamps : true}
);

export default mongoose.model("Voter",tourSchema);