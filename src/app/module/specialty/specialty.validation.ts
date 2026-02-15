import z from "zod";

const createSpecialtyZodScehma = z.object({
  title: z.string("Title is required"),
  description: z.string("Description is required").optional(),
});

export const SpecialtyValidation = {
  createSpecialtyZodScehma,
};
