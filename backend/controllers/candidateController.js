import CandidateData from "../models/CandidateData.js";


export const createNewCandidate = async(req,res) => {
    const newCandidate = new CandidateData(req.body);
    try {
        const saveCandidate = await newCandidate.save();
        res.status(200).json({success : true,message : "Successfully created new user" , data:saveCandidate});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false , message : "failed to create user" , data : error})
    }
}

export const updateNewCandidate = async (req,res) => {
    const id = req.body._id;
    const updateData = req.body;
    try {
        const Candidate = await CandidateData.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({success : true,message : "Successfully updated"});
    } catch (error) {
        res.status(500).json({success:false , message : "failed to update" , data : error})
    }
}

export const deleteCandidate = async (req, res) => {
    const id = req.params._id; // Assuming the ID is in the request params
    try {
        const deletedCandidate = await CandidateData.findByIdAndDelete(id);
        if (!deletedCandidate) {
            return res.status(404).json({ success: false, message: "Candidate not found" });
        }
        res.status(200).json({ success: true, message: "Successfully deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete", data: error });
    }
}

export const getCandidateById = async (req, res) => {
    const id = req.params._id;
    try {
        console.log(id);
        const Candidate = await CandidateData.findById(id);
        if (Candidate) {
            res.status(200).json({ success: true, message: "Successfully", data: Candidate });
        } else {
            res.status(404).json({ success: false, message: "Candidate not found", data: null });
        }
    } catch (error) {
        console.error("Error in getUserById:", error);
        res.status(500).json({ success: false, message: "Internal server error", data: error });
    }
} 

export const getAllCandidate = async (req,res) =>{
    try {
        const Candidate = await CandidateData.find({});
        res.status(200).json({success : true,message:"Succussfully ",list:Candidate});
    } catch (error) {
        res.status(500).json({success:false , message : "failed" , data : error})
    }
}