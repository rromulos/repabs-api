import * as mongoose from 'mongoose';

export const AbsenceSchema = new mongoose.Schema({
    reason_id: { type: String, required: true},
    description: { type: String, required: true},
    observation: { type: String, required: false},
    date_from: { type: Date, required: true},
    date_to: { type: Date, required:true},
    approved: { type: Boolean, required: false, default: false},
    certificate: { type: Boolean, required: false, default: false},
    status: { type: String, required: true, default: 'NEW'}
});

export interface Absence extends mongoose.Document{
    id: string,
    description: string,
    observation: string,
    date_from: Date,
    date_to: Date,
    approved: boolean,
    certificate: boolean,
    status: string
}