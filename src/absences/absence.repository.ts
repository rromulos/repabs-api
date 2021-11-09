import { Injectable, NotFoundException, Patch } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Absence } from "./absence.model";
import { Model } from 'mongoose';

@Injectable()
export class AbsenceRepository{

    static readonly ABSENCE_NOT_FOUND = 'Absence not found';

    constructor(@InjectModel('Absence') private readonly absenceModel : Model<Absence>) {}

    private async find(id : string): Promise<Absence>{
        let absence;
        try{
            absence = await this.absenceModel.findById(id).exec();
        }catch(error){
            throw new NotFoundException(AbsenceRepository.ABSENCE_NOT_FOUND);
        }
        if(!absence) { throw new NotFoundException(AbsenceRepository.ABSENCE_NOT_FOUND)}
        return absence;
    }

    async create(
        reasons: string,
        description: string,
        date_from: Date,
        date_to: Date
    ){
        const newAbsence = new this.absenceModel({
            reasons,
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
                status: abs.status,
                reasons: abs.reasons
            }));
    }

    async getById(id: string){
        const absence = await this.find(id);
        return {
            id: absence.id,
            description: absence.description,
            observation: absence.observation,
            date_from: absence.date_from,
            date_to: absence.date_to,
            approved: absence.approved,
            certificate: absence.certificate,
            status: absence.status,
            reasons: absence.reasons
        }        
    }

    async update(
        id: string,
        reasons: string,
        description: string,
        observation: string,
        date_from: Date,
        date_to: Date,
        certificate: boolean,
    ){
        const absence = await this.find(id);
        absence.reasons = reasons;
        absence.description = description;
        absence.observation = observation;
        absence.date_from = date_from;
        absence.date_to = date_to;
        absence.certificate = certificate;
        absence.save();
    }

    async updateStatus(id, status){
        const absence = await this.find(id);
        absence.status = status;
        absence.save();
    }    

    async updateApproved(id, approved){
        const absence = await this.find(id);
        absence.approved = approved;
        absence.save();
    }

    async delete(id: string){
        const result = await this.absenceModel.deleteOne({_id: id}).exec();
        if (result.deletedCount === 0){
            throw new NotFoundException(AbsenceRepository.ABSENCE_NOT_FOUND);
        }
    }
}