import Voter from '../models/VotersData.js';



export const createVoter = async (req,res) => {
    const  { candidate }  = req.body;
    try {
        const voterdata = new Voter(req.body);
        
        // switch (candidate) {
        //     case 'Candidate1':
        //         voterdata.candidate1++;
        //         break;
        //     case 'Candidate2':
        //         voterdata.candidate2++;
        //         break;
        //     case 'Candidate3':
        //         voterdata.candidate3++;
        //         break;
        //     case 'Candidate4':
        //         voterdata.candidate4++;
        //         break;
        //     default:
        //         // Handle default case (optional)
        //         break;
        // }
        const newVoter = await voterdata.save();
        res.status(200).json({success:true ,message : "Successfully created" , data:newVoter})
    } catch (error) {
        res.status(500).json({success :false , message : "failed to create",data:error})
    }
}


export const getVoterById = async (req, res) => {
    const id = req.params._id;
    try {
        console.log(id);
        const voter = await Voter.findById(id);
        if (voter) {
            res.status(200).json({ success: true, message: "Successfully", data: voter });
        } else {
            res.status(404).json({ success: false, message: "User not found", data: null });
        }
    } catch (error) {
        console.error("Error in getUserById:", error);
        res.status(500).json({ success: false, message: "Internal server error", data: error });
    }
}

export const getAllVoter= async (req,res) => {
    try {
        const Voterdata = await Voter.find({});
        res.status(200).json({success:true , data:Voterdata})
    } catch (error) {
        res.status(500).json({success :false , message : "failed",data:error})
        
    }
}

export const getByUserId = async (req, res) => {
    const id = req.params.userId;
    try {
        console.log(id)
        const voter = await Voter.findOne({userId :id});
        console.log(voter)
        if (voter) {
            res.status(200).json({ success: true, message: "Successfully", data: voter });
        } else {
            res.status(404).json({ success: false, message: "Voter not found", data: null });
        }
    } catch (error) {
        console.error("Error in getByUserId:", error); // Log the error
        res.status(500).json({ success: false, message: "Internal server error", data: error });
    }
};

export const countVotesPerCandidate = async (req, res) => {
    try {
        const result = await Voter.aggregate([
            {
                $group: {
                    _id:{candidateId: '$candidateId', candidate: '$candidate'},
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'candidate', // Name of the candidates collection
                    localField: '_id',
                    foreignField: '_id',
                    as: 'candidate'
                }
            },
            {
                $project: {
                    _id: 1,
                    candidate: { $arrayElemAt: ['$candidate.candidate', 0] },
                    count: 1
                }
            }
        ]);
        console.log(result);
        res.status(200).json({ success: true, message: "Successfully", data: result });
    //   const result = await Voter.aggregate([
    //     { $group: { _id: '$candidateId', count: { $sum: 1 } } }
    //   ]);
    //   res.status(200).json({ success: true, message: "Successfully", data: result });
    } catch (error) {
      console.error('Error counting votes per candidate:', error);
      res.status(500).json({ success: false, message: "Internal server error", data: error });
    }
  };


