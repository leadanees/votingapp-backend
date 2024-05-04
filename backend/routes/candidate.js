import express from "express";
// import {  getAllUser , createNewUSer , getUserById} from "../controllers/userController.js";
import {createNewCandidate,updateNewCandidate,deleteCandidate,getCandidateById, getAllCandidate } from "../controllers/candidateController.js";
const route = express.Router();
//import { verifyUser } from "../utils/verifyToken.js";

route.post('/Add', createNewCandidate);
route.put('/Edit',updateNewCandidate);
route.delete('/:_id',deleteCandidate);
route.get('/getByCandidateId/:_id',getCandidateById);
route.get('/getAll',getAllCandidate);

export default route;