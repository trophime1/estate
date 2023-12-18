import  express  from "express";
import { createListing, deleteListing, updateListing,} from "../controllers/listing.controlller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { getListing, getUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing)
router.post('/update/:id',verifyToken, updateListing);
router.get('/get/:id', getListing)
router.get('/:id',verifyToken,getUser)
  
export default router