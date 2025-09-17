const {z}=require("zod")

const registerSchema = z.object({
  name: z.string().min(2, { error: "Name must be at least 2 characters long" }),
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters long" }),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters long" )
    .optional(),
});

const loginSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters long" }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
