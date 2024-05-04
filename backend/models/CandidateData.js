import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
    {
        candidate:{type: String,required: true},
        voters: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Voter'
          }],
    },
    {timestamps : true}
);
export default mongoose.model("Candidate",candidateSchema);
