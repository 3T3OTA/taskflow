import User from "../models/userSchema.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import { generateToken } from "../utils/jwt.js";

class UserService {

    async createUser(userData) {
      try {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
          return { success: false, message: "User already exists" };
        } 
        const hashedPassword = await hashPassword(userData.password);
        const user = new User({ ...userData, password: hashedPassword });
        const savedUser = await user.save();
        return { success: true, user: savedUser };
      } catch (error) {
        return { success: false, message: `Error creating user: ${error.message}` };
      }
    }

    async loginUser(email, password) {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return { success: false, message: "User not found" };
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
          return { success: false, message: "Invalid credentials" };
        }

        const token = generateToken(user);
        return { success: true, user, token };
      } catch (error) {
        return { success: false, message: `Login failed: ${error.message}` };
      }
    }

    async getUserById(userId) {
      try {
        const user = await User.findById(userId);
        if (!user) {
          return { success: false, message: "User not found" };
        }
        return { success: true, user };
      } catch (error) {
        return { success: false, message: `Error retrieving user: ${error.message}` };
      }
    }

    async updateUser(userId, updateData) {
      try {
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
        if (!user) {
          return { success: false, message: "User not found" };
        }
        return { success: true, user };
      } catch (error) {
        return { success: false, message: `Error updating user: ${error.message}` };
      }
    }

    async deleteUser(userId) {
      try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
          return { success: false, message: "User not found" };
        }
        return { success: true, user };
      } catch (error) {
        return { success: false, message: `Error deleting user: ${error.message}` };
      }
    }

    async getCurrentUser(userId) {
        try {
            const user = await User.findById(userId).select('-password');
            if (!user) {
                throw new Error('User not found');
            }
            return { success: true, user };
        } catch (error) {
            return { success: false, message: `Error fetching user profile: ${error.message}` };
        }
    }

};

export default new UserService();
