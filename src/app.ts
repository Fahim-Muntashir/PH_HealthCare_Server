import express, { Application, Request, Response } from "express";
import { IndexRoutes } from "./app/routes";
import { prisma } from "./app/lib/prisma";

const app: Application = express();

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/v1", IndexRoutes);
// Basic route
app.get("/", async (req: Request, res: Response) => {
  const specialty = await prisma.specialty.create({
    data: {
      title: "Cardiology",
    },
  });

  res.status(200).json({ success: "Hello, TypeScript + Express!", specialty });
});

export default app;
