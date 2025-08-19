import userController from "../controllers/userController.js";
import express from "express";
const router = express.Router();
import authDecode from "../middlewares/authDecode.js";
import { validateRegistration, validateLogin } from "../middlewares/validateUser.js";

router.post("/register", validateRegistration, userController.createUser);
router.post("/login", validateLogin, userController.loginUser);
router.get("/users/:id", authDecode, userController.getUserById);
router.put("/edit/:id", authDecode, userController.updateUser);
router.delete("/delete/:id", authDecode, userController.deleteUser);
router.get('/current', authDecode, userController.getCurrentUser);

export default router;
