import { Injectable, NotFoundException, Patch } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Absence } from "./absence.model";
import { Model } from 'mongoose';

@Injectable()
export class AbsenceRepository{

    constructor(@InjectModel('Absence') private readonly absenceModel : Model<Absence>) {}

    private async find(id : string): Promise<Absence>{
        let absence;
        try{
            absence = await this.absenceModel.findById(id).exec();
        }catch(error){
            throw new NotFoundException('Absence not found');
        }
        if(!absence) { throw new NotFoundException('Absence not found')}
        return absence;
    }

    async create(
        reason_id: string,
        description: string,
        date_from: Date,
        date_to: Date
    ){
        console.log("Chegou no repository do create");
        const newAbsence = new this.absenceModel({
            reason_id,
            description,
            date_from,
            date_to
        });
        const result = await newAbsence.save();
        return result.id as string;
    }

    async getAll(){
        const absences = await this.absenceModel.find().exec();
        return absences.map(
            abs => ({
                id: abs.id,
                description: abs.description,
                observation: abs.observation,
                date_from: abs.date_from,
                date_to: abs.date_to,
                approved: abs.approved,
                certificate: abs.certificate,
                status: abs.status
            }));
    }

    async getById(id: string){
        let absence;
        try {
            absence = await this.find(id);
        } catch (error) {
            throw new NotFoundException('Absence not found');
        }
        if(!absence) { throw new NotFoundException('Absence not found')}
        return {
            id: absence.id,
            description: absence.description,
            observation: absence.observation,
            date_from: absence.date_from,
            date_to: absence.date_to,
            approved: absence.approved,
            certificate: absence.certificate,
            status: absence.status
        }
    }

    async getByReasonName(name : string){
        
    }

    async update(
        reason_id: string,
        description: string,
        observation: string,
        date_from: Date,
        date_to: Date,
        certificate: boolean,
    ){

    }

    async updateStatus(id, status){
        
    }    

    async updateApproved(id, approved){

    }

    async delete(id: string){

    }
}