import * as z from "zod";

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Phone number validation regex (Indian format)
const phoneRegex = /^[6-9]\d{9}$/;

// URL validation regex
const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

// Common validation messages
const validationMessages = {
  name: {
    required: "Name is required",
    minLength: "Name must be at least 2 characters",
    maxLength: "Name must not exceed 50 characters",
  },
  email: {
    required: "Email is required",
    invalid: "Please enter a valid email address",
  },
  phone: {
    invalid: "Please enter a valid 10-digit mobile number",
  },
  location: {
    minLength: "Location must be at least 2 characters",
  },
  bio: {
    required: "Bio is required",
    minLength: "Bio must be at least 20 characters",
    maxLength: "Bio must not exceed 500 characters",
  },
  experience: {
    min: "Experience must be at least 0 years",
    max: "Experience cannot exceed 50 years",
  },
  specializations: {
    required: "Please select at least one specialization",
  },
  preferences: {
    required: "Please select at least one preference",
  },
  url: {
    invalid: "Please enter a valid URL",
  },
  address: {
    minLength: "Address must be at least 10 characters",
  },
};

// Customer Profile Schema
export const customerProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, validationMessages.name.required)
    .min(2, validationMessages.name.minLength)
    .max(50, validationMessages.name.maxLength),
  email: z
    .string()
    .trim()
    .min(1, validationMessages.email.required)
    .regex(emailRegex, validationMessages.email.invalid),
  location: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: validationMessages.location.minLength,
    }),
  address: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || val.length >= 10, {
      message: validationMessages.address.minLength,
    }),
  preferences: z
    .array(z.string())
    .min(1, validationMessages.preferences.required),
});

// Artisan Profile Schema
export const artisanProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, validationMessages.name.required)
    .min(2, validationMessages.name.minLength)
    .max(50, validationMessages.name.maxLength),
  location: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: validationMessages.location.minLength,
    }),
  bio: z
    .string()
    .trim()
    .min(1, validationMessages.bio.required)
    .min(20, validationMessages.bio.minLength)
    .max(500, validationMessages.bio.maxLength),
  experience: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const num = parseInt(val);
      return !isNaN(num) && num >= 0 && num <= 50;
    }, {
      message: "Experience must be between 0 and 50 years",
    }),
  specializations: z
    .array(z.string())
    .min(1, validationMessages.specializations.required),
  workshopAddress: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || val.length >= 10, {
      message: validationMessages.address.minLength,
    }),
  phoneNumber: z
    .string()
    .optional()
    .refine((val) => !val || phoneRegex.test(val), {
      message: validationMessages.phone.invalid,
    }),
});

// Designer Profile Schema
export const designerProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, validationMessages.name.required)
    .min(2, validationMessages.name.minLength)
    .max(50, validationMessages.name.maxLength),
  email: z
    .string()
    .trim()
    .min(1, validationMessages.email.required)
    .regex(emailRegex, validationMessages.email.invalid),
  location: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || val.length >= 2, {
      message: validationMessages.location.minLength,
    }),
  bio: z
    .string()
    .trim()
    .min(1, validationMessages.bio.required)
    .min(20, validationMessages.bio.minLength)
    .max(500, validationMessages.bio.maxLength),
  education: z
    .string()
    .trim()
    .optional(),
  experience: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      const num = parseInt(val);
      return !isNaN(num) && num >= 0 && num <= 50;
    }, {
      message: "Experience must be between 0 and 50 years",
    }),
  specializations: z
    .array(z.string())
    .min(1, validationMessages.specializations.required),
  company: z
    .string()
    .trim()
    .optional(),
  website: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || urlRegex.test(val), {
      message: validationMessages.url.invalid,
    }),
});

// Export type definitions
export type CustomerProfileData = z.infer<typeof customerProfileSchema>;
export type ArtisanProfileData = z.infer<typeof artisanProfileSchema>;
export type DesignerProfileData = z.infer<typeof designerProfileSchema>;

