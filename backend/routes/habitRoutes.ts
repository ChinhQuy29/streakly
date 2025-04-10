import express from 'express';
import { createHabit, deleteHabit, getHabits } from '../controllers/habitControllers';

const router = express.Router();

router.post("/api/habits", createHabit);
router.get("/api/habits", getHabits);
router.delete("/api/habits", deleteHabit);

export default router;
