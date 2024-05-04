import User from '../models/User.js';

export const createNewUSer = async(req,res) => {
    const newUser = new User(req.body);
    try {
        const saveUser = await newUser.save();
        res.status(200).json({success : true,message : "Successfully created new user" , data:saveUser});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false , message : "failed to create user" , data : error})
    }
}

export const updateNewUser = async (req,res) => {
    const id = req.body.id;
    try {
        const user = await User.findByIdAndUpdate(id);
        res.status(200).json({success : true,message : "Successfully updated"});
    } catch (error) {
        res.status(500).json({success:false , message : "failed to update" , data : error})
    }
}

export const deleteUSer = async (req,res) => {
    const id = req.body.id;
    try {
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({success : true,message : "Successfully delete"});
    } catch (error) {
        res.status(500).json({success:false , message : "failed" , data : error})
    }
}

export const getUserById = async (req, res) => {
    const id = req.params._id;
    try {
        console.log(id);
        const user = await User.findById(id);
        if (user) {
            res.status(200).json({ success: true, message: "Successfully", data: user });
        } else {
            res.status(404).json({ success: false, message: "User not found", data: null });
        }
    } catch (error) {
        console.error("Error in getUserById:", error);
        res.status(500).json({ success: false, message: "Internal server error", data: error });
    }
} 

export const getAllUser = async (req,res) =>{
    try {
        const user = await User.find({});
        res.status(200).json({success : true,list:user});
    } catch (error) {
        res.status(500).json({success:false , message : "failed" , data : error})
    }
}