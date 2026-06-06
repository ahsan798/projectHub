import { z } from 'zod';

// ─── Auth schemas ─────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(60, 'Name is too long'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// ─── Project schema ───────────────────────────────────────────────────────────

export const projectSchema = z.object({
  name: z
    .string()
    .min(3, 'Project name must be at least 3 characters')
    .max(80, 'Project name is too long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description is too long'),
  status: z.enum(['active', 'on-hold', 'completed'], {
    errorMap: () => ({ message: 'Please select a valid status' }),
  }),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

// ─── Task schema ──────────────────────────────────────────────────────────────

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, 'Task title must be at least 3 characters')
    .max(100, 'Task title is too long'),
  description: z
    .string()
    .min(5, 'Description must be at least 5 characters')
    .max(1000, 'Description is too long'),
  priority: z.enum(['low', 'medium', 'high'], {
    errorMap: () => ({ message: 'Please select a priority' }),
  }),
  status: z.enum(['todo', 'in-progress', 'in-review', 'done'], {
    errorMap: () => ({ message: 'Please select a status' }),
  }),
  dueDate: z
    .string()
    .min(1, 'Due date is required')
    .refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' }),
  assignedUserId: z.string().nullable(),
  projectId: z.string().min(1, 'Please select a project'),
});

export type TaskFormValues = z.infer<typeof taskSchema>;
