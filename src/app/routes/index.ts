import { Router } from "express";
import { SpecialtyRoutes } from "../module/specialty/specialty.route";
import { authRoutes } from "../module/auth/auth.route";

const router = Router();

router.use("/specialties", SpecialtyRoutes);
router.use("/auth", authRoutes);

export const IndexRoutes = router;
