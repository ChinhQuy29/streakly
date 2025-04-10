import { Request, Response } from 'express';
import Habit from '../models/habitModel';

export const createHabit = async (req: Request, res: Response): Promise<void> => {
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(400).json({ message: 'Title and description are required' });
        return;
    }
    try {
        const habit = new Habit({ title, description, completed: false });
        await habit.save();
        res.status(201).json({ message: 'Habit created successfully', habit });
    } catch (error) {
        res.status(500).json({ message: 'Error creating habit', error: (error as Error).message });
    }
}

export const getHabits = async (req: Request, res: Response): Promise<void> => {
    try {
        const habits = await Habit.find();
        res.status(200).json({ habits });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching habits', error: (error as Error).message });
    }
}

export const deleteHabit = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;
    if (!id) {
        res.status(400).json({ message: 'ID is required' });
        return;
    }
    try {
        const deletedHabit = await Habit.findByIdAndDelete(id);
        if (!deletedHabit) {
            res.status(404).json({ message: 'Habit not found' });
            return;
        }
        res.status(200).json({ message: 'Habit deleted successfully', deletedHabit });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting habit', error: (error as Error).message });
    }
}
