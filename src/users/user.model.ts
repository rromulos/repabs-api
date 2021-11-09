import { kStringMaxLength } from 'buffer';
import * as mongoose from 'mongoose';

var Schema = mongoose.Schema;

export const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required:true },
    password: { type:String, required: true }
});

export interface User extends Document {
    name: string,
    email: string,
    password: string
}
