import mongoose, { Schema, Document } from 'mongoose';

export interface IHabit extends Document {
    title: string;
    description: string;
    completed: boolean;
}

const HabitSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, required: true },
});

const Habit = mongoose.models.Habit || mongoose.model<IHabit>('Habit', HabitSchema);

export default Habit;


