import * as mongoose from 'mongoose';

var Schema = mongoose.Schema;

export const AbsenceSchema = new mongoose.Schema({
    description: { type: String, required: true},
    observation: { type: String, required: false},
    date_from: { type: Date, required: true},
    date_to: { type: Date, required:true},
    approved: { type: Boolean, required: false, default: false},
    certificate: { type: Boolean, required: false, default: false},
    status: { type: String, required: true, default: 'NEW'},
    reasons: [{ type: Schema.Types.ObjectId, ref: 'Reason' }],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export interface Absence extends mongoose.Document{
    id: string,
    reasons: string,
    users : string,
    description: string,
    observation: string,
    date_from: Date,
    date_to: Date,
    approved: boolean,
    certificate: boolean,
    status: string
}