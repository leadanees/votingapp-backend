import express from "express";
import {  getAllUser , createNewUSer , getUserById, updateNewUser, deleteUSer} from "../controllers/userController.js";
const route = express.Router();
//import { verifyUser } from "../utils/verifyToken.js";

route.post('/Add', createNewUSer);
route.put('/Edit',updateNewUser);
route.delete('/:_id',deleteUSer);
route.get('/getAll',getAllUser);
route.get('/getById/:_id',getUserById);

export default route;