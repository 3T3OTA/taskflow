import userService from '../services/userService.js';
class UserController {

async createUser(req, res) {
  const result = await userService.createUser(req.body);
  
  if (!result.success) {
    return res.status(500).json({ message: result.message });
  }

  res.status(201).json({ message: "User created successfully", user: result.user });
}

async loginUser(req, res) {
  const { email, password } = req.body;
  const result = await userService.loginUser(email, password);
  
  if (!result.success) {
    return res.status(401).json({ message: result.message });
  }
  
  const { user, token } = result;
  res.status(200).json({ message: "Login successful", user, token });
}

async getUserById(req, res) {
  const result = await userService.getUserById(req.params.id);
  
  if (!result.success) {
    return res.status(404).json({ message: result.message });
  }
  
  res.status(200).json(result.user);
}

async updateUser(req, res) {
  const result = await userService.updateUser(req.params.id, req.body);
  
  if (!result.success) {
    return res.status(404).json({ message: result.message });
  }
  
  res.status(200).json(result.user);
}

async deleteUser(req, res) {
  const result = await userService.deleteUser(req.params.id);
  
  if (!result.success) {
    return res.status(404).json({ message: result.message });
  }
  
  res.status(204).send();
}

async getCurrentUser(req, res) {
  const userId = req.user.id; 
  const result = await userService.getCurrentUser(userId);
  
  if (!result.success) {
    return res.status(404).json({ message: result.message });
  }

  res.status(200).json({ user: result.user });
}

}

export default new UserController();