import z from "zod";
import { Gender } from "../../../generated/prisma/enums";

export const createDoctorZodSchema = z.object({
  password: z
    .string("Password is required")
    .min(6, "password must be atleaast 6")
    .max(20, "password must be at most 20 charector"),
  doctor: z.object({
    name: z
      .string("Name is required")
      .min(5, "Name must be atleast 5 charector")
      .max(100, "Name must be in 100 chaerctor"),

    email: z.email("Invalid email address"),
    contactNumber: z.string("contact number is required"),
    address: z.string("Address is required").optional(),
    registrationNumber: z.string(),
    experience: z.int("Experience must be an integer").nonnegative(),
    gender: z.enum(
      [Gender.FEMALE, Gender.MALE],
      "Gender must be either male or female",
    ),
    appointmentFee: z
      .number("Appointment fee must be a number")
      .nonnegative("Appointment fee cannot be negetive"),
    qalification: z.string("Qualification is required"),
    currentWorkingPlace: z.string("Current Working place is required"),
    designation: z.string("Designation is required"),
  }),
  specialties: z
    .array(z.uuid(), "Soecialties must be an array of string")
    .min(1, "Atleast one specialty is required"),
});
