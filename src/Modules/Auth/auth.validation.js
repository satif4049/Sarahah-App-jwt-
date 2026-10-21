import * as zod from "zod";
import { genderEnum, roleEnum } from "../../Common/Enum/user.enum.js";

export const loginSchema = zod.strictObject({
  email: zod.email(),
  password: zod
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message:
          "Password must contain uppercase, lowercase, number, special character, and be at least 8 characters",
      },
    ),
});

export const login = zod.object({
  body: loginSchema,
  query: zod.strictObject({
    lang: zod.enum(["ar", "en"]).default("en"),
  }),
});

export const signupSchema = loginSchema
  .extend({
    firstName: zod
      .string()
      .regex(/^[A-Z\u0621-\u064A][a-zA-Z\u0621-\u064A\s'-]*$/),
    lastName: zod
      .string()
      .regex(/^[A-Z\u0621-\u064A][a-zA-Z\u0621-\u064A\s'-]*$/),
    phone: zod.string().regex(/^(002|\+2)?01[0125][0-9]{8}$/, {
      Message: "Invalid Egyptian phone number",
    }),
    gender: zod.enum(genderEnum).default(genderEnum.male),
    role: zod.enum(roleEnum).default(roleEnum.user),
    age: zod
      .number()
      .min(18, { error: "age must be at least 18 character" })
      .max(100, { error: "age must be at most 100 character" })
      .optional(),
    confirmPassword: zod.string(),
  })
  .refine(
    (data) => {
      return data.password == data.confirmPassword;
    },
    {
      message: "Password and Confirm Password mismatch",
      path: ["confirmPassword"],
    },
  );

export const signup = zod.object({
  body: signupSchema,
  query: zod.strictObject({
    lang: zod.enum(["ar", "en"]).default("en"),
  }),
});

export const restPassord = zod
  .strictObject({
    email: zod.email(),
    newPassword: zod
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contain uppercase, lowercase, number, special character, and be at least 8 characters",
        },
      ),
    confirmPassword: zod.string(),
    resetToken: zod.string(),
  })
  .refine(
    (data) => {
      return data.newPassword == data.confirmPassword;
    },
    {
      message: "NewPassword and Confirm Password mismatch",
      path: ["confirmPassword"],
    },
  );

export const forgetPassword = zod.object({
  body: restPassord,
  query: zod.strictObject({
    lang: zod.enum(["ar", "en"]).default("en"),
  }),
});