import { z } from 'zod';

const registrationSchema = z.object({
  name: z.string().trim().min(3, { message: 'Name must be at least 3 characters' })
    .max(100, { message: 'Name cannot exceed 100 characters' }),
  email: z.string().trim().email({ message: 'Invalid email format' })
    .min(6, { message: 'Email must be at least 6 characters' })
    .max(100, { message: 'Email cannot exceed 100 characters' }),
  password: z.string().trim().min(6, { message: 'Password must be at least 6 characters' })
    .max(100, { message: 'Password cannot exceed 100 characters' })
});

const loginSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email format' }),
  password: z.string().trim().min(1, { message: 'Password is required' })
});

export const validateRegistration = (req, res, next) => {
  try {
    registrationSchema.parse(req.body);
    next();
  } catch (error) {
    const formattedErrors = error.issues.map(issue => ({
      field: issue.path.join('.'),
      message: issue.message
    }));
    return res.status(400).json({ errors: formattedErrors });
  }
};

export const validateLogin = (req, res, next) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    const formattedErrors = error.issues.map(issue => ({
      field: issue.path.join('.'),
      message: issue.message
    }));
    return res.status(400).json({ errors: formattedErrors });
  }
};

export const validateUser = validateRegistration;