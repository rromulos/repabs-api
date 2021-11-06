import { Injectable, HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { ReasonRepository } from "./reason.repository";

@Injectable()
export class ReasonService{

    static readonly REASON_NOT_FOUND = 'Reason not found';
    static readonly READON_ALREADY_EXISTS = 'The reason already exists';

    constructor(private readonly reasonRepository : ReasonRepository){}

    async create(
        name : string,
        description : string,
    ){
        if(await this.doesReasonExists(name)){             
              throw new HttpException(ReasonService.READON_ALREADY_EXISTS, HttpStatus.AMBIGUOUS);

        }else{
            const result = await this.reasonRepository.create(name, description);
            return result;
        }
    }

    async getAll(){
        const result = await this.reasonRepository.getAll();
        return result;
    }

    async getById(id : string){

        let reason;
        try {
            reason = await this.reasonRepository.getById(id);        
        } catch (error) {
            throw new NotFoundException(ReasonService.REASON_NOT_FOUND);
        }
        if (!reason) { throw new NotFoundException(ReasonService.REASON_NOT_FOUND)}
        return {
            id: reason.id,
            name: reason.name,
            description: reason.description
        }
    }

    async getByName(name : string){
        let reason;
        try{
            reason = await this.reasonRepository.getByName(name);
        }catch(error){
            throw new NotFoundException(ReasonService.REASON_NOT_FOUND);
        }
        if (!reason) { throw new NotFoundException(ReasonService.REASON_NOT_FOUND)}
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
        return await this.reasonRepository.update(id, name, description);
    }

    async delete(id : string) {
        return await this.reasonRepository.delete(id);
    }

    private async doesReasonExists(name : string)
    {
        try {
            if (await this.getByName(name)) { return true;}
        } catch (error) {
            return false;
        }
    }

}