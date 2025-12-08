import express from "express";
import { getAllUsers, getUserByName, loginUser, userProfile, verifyUser } from "../controller/user.js";
import { is_auth } from "../middleware/isAuth.js";
const router = express.Router();
router.post("/login", loginUser);
router.post("/verify", verifyUser);
router.get("/authuserid", is_auth, userProfile);
router.get("/user/all", getAllUsers);
router.get("/user/:id", is_auth, getUserByName);
export default router;
//# sourceMappingURL=user.js.map