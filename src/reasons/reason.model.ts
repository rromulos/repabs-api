import * as mongoose from 'mongoose';

export const ReasonSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    enabled: { type: Boolean, default: true, required: false},
    createdAt: { type : Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export interface Reason extends mongoose.Document {
    id: string;
    name: string,
    description: string,
    enabled: boolean
}
