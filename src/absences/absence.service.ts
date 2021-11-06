import { Injectable } from "@nestjs/common";
import { AbsenceRepository } from "./absence.repository";

@Injectable()
export class AbsenceService{

    constructor(private readonly absenceRepository : AbsenceRepository){}

    /**
     * Invokes the repository to create a new absence
     * 
     * @param reason_id 
     * @param description 
     * @param date_from 
     * @param date_to 
     * @returns 
     * @TODO check if date_to is igual or greater to date_from
     * @TODO check if is there any other register with the same "data"
     */
    async create(
        reason_id: string,
        description: string,
        date_from: Date,
        date_to: Date        
    ){
        //adicionar o try cat aqui... e não no repositório
        const result = await this.absenceRepository.create(
            reason_id,
            description,
            date_from,
            date_to
        );
        return result;
    }

    /**
     * Invoke repository to get all absences
     * 
     * @returns 
     */
    async getAll(){
        return await this.absenceRepository.getAll();
    }

    /**
     * Invoke the repository to get absence by id
     * 
     * @param id 
     * @returns 
     */
    async getById(id: string){
        return await this.absenceRepository.getById(id);
    }

    /**
     * Invoke the repository to get absences by the reason name
     * 
     * @param name 
     * @returns 
     */
    async getByReasonName(name : string){
        return await this.absenceRepository.getByReasonName(name);
    }
    
    /**
     * Invoke the repository to update an absence
     * 
     * @param reason_id 
     * @param description 
     * @param observation 
     * @param date_from 
     * @param date_to 
     * @param certificate 
     * @returns 
     */
    async update(
        reason_id: string,
        description: string,
        observation: string,
        date_from: Date,
        date_to: Date,
        certificate: boolean,
    ){
        return await this.absenceRepository.update(
            reason_id,
            description,
            observation,
            date_from,
            date_to,
            certificate,
        );
    }

    /**
     * Invoke the repository to update the column status
     * 
     * @param id 
     * @param status 
     * @returns 
     */
    async updateStatus(id, status){
        return await this.absenceRepository.updateStatus(id, status);
    }

    /**
     * Invoke the repository to update the approved column
     * 
     * @param id 
     * @param approved 
     * @returns 
     */
    async updateApproved(id, approved){
        return await this.absenceRepository.updateApproved(id, approved);
    }    

    /**
     * Invoke the repository to delete an absence
     * 
     * @param id 
     * @returns 
     */
    async delete(id: string){
        return await this.absenceRepository.delete(id);
    }    
}
