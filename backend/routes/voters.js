import express from "express";
import { createVoter,getAllVoter ,getByUserId,getVoterById , countVotesPerCandidate} from "../controllers/voterController.js";
// import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const route = express.Router();
//import { verifyUser } from "../utils/verifyToken.js";

route.post('/Add', createVoter);
route.get('/getById/:_id',getVoterById);
route.get('/getByUserId/:userId',getByUserId);
route.get('/getAll',getAllVoter);
route.get('/getCandidateCount',countVotesPerCandidate);


export default route;