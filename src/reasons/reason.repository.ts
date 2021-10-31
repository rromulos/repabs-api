import { Injectable, NotFoundException, Patch } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Reason } from "./reason.model";
import { Model } from 'mongoose';

@Injectable()
export class ReasonRepository{

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

    async getById(id : string): Promise<Reason>{
        let reason;
        try {
            reason = await this.reasonModel.findById(id);            
        } catch (error) {
            throw new NotFoundException('Reason not found')
        }
        if (!reason) { throw new NotFoundException('Reason not found')}
        return {
            id: reason.id,
            name: reason.name,
            description: reason.description,
            enabled: reason.enabled
        }
    }

    getByName(name : string){

    }

    update(
        name : string,
        description : string,
    ){

    }

    delete(id : string) {

    }

}