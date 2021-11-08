import { BadRequestException, Injectable,NotFoundException } from "@nestjs/common";
import { AbsenceRepository } from "./absence.repository";

@Injectable()
export class AbsenceService{

    static readonly ABSENCE_NOT_FOUND = 'Absence not found';
    static readonly REASONID_FIELD_IS_EMPTY = 'reasons field is empty';
    static readonly DESCRIPTION_FIELD_IS_EMPTY = 'description field is empty';
    static readonly DATEFROM_FIELD_IS_EMPTY = 'date_from field is empty';
    static readonly DATETO_FIELD_IS_EMPTY = 'date_to field is empty';
    static readonly DATEFROM_INVALID = 'Date from is invalid';
    static readonly DATETO_INVALID = 'Date to is invalid';

    constructor(private readonly absenceRepository : AbsenceRepository){}

    /**
     * @TODO check if date_to is igual or greater to date_from
     */
    async create(
        reasons: string,
        description: string,
        date_from: string,
        date_to: string        
    ){
        if(await this.isAbsenceValidated(
            reasons,
            description,
            date_from,
            date_to
        )){
            const result = await this.absenceRepository.create(
                reasons,
                description,
                new Date(date_from),
                new Date(date_to)
            );
            return result;
        }
    }

    private async isAbsenceValidated(
        reasons: string,
        description: string,
        date_from: string,
        date_to: string,    
    ){
        if(!reasons){
            throw new BadRequestException(AbsenceService.REASONID_FIELD_IS_EMPTY);
        }
        if(!description){
            throw new BadRequestException(AbsenceService.DESCRIPTION_FIELD_IS_EMPTY);
        }
        if(!date_from){
            throw new BadRequestException(AbsenceService.DATEFROM_FIELD_IS_EMPTY);
        }
        if(!date_to){
            throw new BadRequestException(AbsenceService.DATETO_FIELD_IS_EMPTY);
        }    
        try {
            const dafrom = new Date(date_from);            
            if(isNaN(dafrom.valueOf())){
                throw new BadRequestException(AbsenceService.DATEFROM_INVALID);
            }      
        } catch (error) {
            throw new BadRequestException(AbsenceService.DATEFROM_INVALID);
        }
        try {
            const dato = new Date(date_to);            
            if(isNaN(dato.valueOf())){
                throw new BadRequestException(AbsenceService.DATETO_INVALID);
            }  
        } catch (error) {
            throw new BadRequestException(AbsenceService.DATETO_INVALID);
        }        
        return true;
    }    

    async getAll(){
        return await this.absenceRepository.getAll();
    }

    async getById(id: string){
        let absence;
        try {
            absence = await this.absenceRepository.getById(id);
        } catch (error) {
            throw new NotFoundException(AbsenceService.ABSENCE_NOT_FOUND);
        }
        if(!absence) { throw new NotFoundException(AbsenceService.ABSENCE_NOT_FOUND)}
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
    
    async update(
        id: string,
        reasons: string,
        description: string,
        observation: string,
        date_from: Date,
        date_to: Date,
        certificate: boolean,
    ){
        return await this.absenceRepository.update(
            id,
            reasons,
            description,
            observation,
            date_from,
            date_to,
            certificate,
        );
    }

    async updateStatus(id, status){
        return await this.absenceRepository.updateStatus(id, status);
    }

    async updateApproved(id, approved){
        return await this.absenceRepository.updateApproved(id, approved);
    }    

    async delete(id: string){
        return await this.absenceRepository.delete(id);
    }    
}
