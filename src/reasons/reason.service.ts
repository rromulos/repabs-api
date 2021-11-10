import { Injectable, HttpException, HttpStatus, NotFoundException, BadRequestException } from "@nestjs/common";
import { ReasonRepository } from "./reason.repository";

@Injectable()
export class ReasonService{

    static readonly REASON_NOT_FOUND = 'Reason not found';
    static readonly REASON_ALREADY_EXISTS = 'The reason already exists';
    static readonly NAME_FIELD_IS_EMPTY = 'Name field is empty';
    static readonly DESCRIPTION_FIELD_IS_EMPTY = 'Description field is empty';

    constructor(private readonly reasonRepository : ReasonRepository){}

    async create(
        name : string,
        description : string,
    ){
        if(await this.doesReasonExists(name)){             
              throw new HttpException(ReasonService.REASON_ALREADY_EXISTS, HttpStatus.AMBIGUOUS);

        }
        if(await this.isReasonValidated(
            name,
            description
        )) {
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
        if(await this.isReasonValidated(
            name,
            description
        )) {
            return await this.reasonRepository.update(id, name, description);
        }
    }

    private async isReasonValidated(
        name : string,
        description : string
        ) {
            if(!name) {
                throw new BadRequestException(ReasonService.NAME_FIELD_IS_EMPTY);
            }
            if(!description) {
                throw new BadRequestException(ReasonService.DESCRIPTION_FIELD_IS_EMPTY);
            }
            return true;
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