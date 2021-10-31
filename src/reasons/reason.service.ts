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

    getByName(name : string){
        return this.reasonRepository.getByName(name);
    }

    update(
        name : string,
        description : string,
    ){
        return this.reasonRepository.update(name,description);
    }

    delete(id : string) {
        return this.reasonRepository.delete(id);
    }

}