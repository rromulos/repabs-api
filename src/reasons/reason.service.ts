import { Injectable, NotFoundException, Patch } from "@nestjs/common";
import { Reason } from "./reason.model";
import { ReasonRepository } from "./reason.repository";

@Injectable()
export class ReasonService{

    constructor(private readonly reasonRepository : ReasonRepository){}

    async create(
        name : string,
        description : string,
    ){
        const result = await this.reasonRepository.create(name, description);
        return result;
    }

    async getAll(){
        const result = await this.reasonRepository.getAll();
        return result;
    }

    async getById(id : string){
        const result = await this.reasonRepository.getById(id);
        return result;
    }

    async getByName(name : string){
        const result = await this.reasonRepository.getByName(name);
        console.log(result);
        return result;
    }

    async update(
        id: string,
        name : string,
        description : string,
    ){
        return await this.reasonRepository.update(id, name, description);
    }

    async delete(id : string) {
        return await this.reasonRepository.delete(id);
    }

}