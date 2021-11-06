import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Reason } from "./reason.model";
import { Model } from 'mongoose';

@Injectable()
export class ReasonRepository{

    static readonly REASON_NOT_FOUND = 'Reason not found';

    constructor(@InjectModel('Reason') private readonly reasonModel: Model<Reason>) {}

    async create(
        name : string,
        description : string,
    ){
        const newReason = new this.reasonModel({
            name,
            description
        });
        const result = await newReason.save();
        return result.id as string;
    }

    async getAll(){
        const reasons = await this.reasonModel.find().exec();
        return reasons.map(
            rsn => ({
                id: rsn.id,
                name: rsn.name,
                description: rsn.description
            }));
    }

    async getById(id : string){
        const reason = await this.find(id);
        return {
            id: reason.id,
            name: reason.name,
            description: reason.description
        }
    }

    private async find(id : string): Promise<Reason>{
        let reason;
        try {
            reason = await this.reasonModel.findById(id).exec();            
        } catch (error) {
            throw new NotFoundException(ReasonRepository.REASON_NOT_FOUND);
        }
        if (!reason) { throw new NotFoundException(ReasonRepository.REASON_NOT_FOUND)}
        return reason;
    }

    async getByName(name : string){
        const reason = await this.reasonModel.findOne({name : name}).exec();
        return {
            id: reason.id,
            name: reason.name,
            description: reason.description
        }  
    }

    async update(
        id: string,
        name : string,
        description : string,
    ){
        const reason = await this.find(id);
        if(name){
            reason.name = name;
        }
        if(description){
            reason.description = description;
        }
        reason.save();
    }

    async delete(id : string) {
        const result = await this.reasonModel.deleteOne({_id: id}).exec();
        if (result.deletedCount === 0){
            throw new NotFoundException(ReasonRepository.REASON_NOT_FOUND);
        }
    }

}