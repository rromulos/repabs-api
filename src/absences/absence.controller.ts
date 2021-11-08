import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
} from '@nestjs/common';

import { AbsenceService } from './absence.service';

@Controller('absences')
export class AbsenceController{

    constructor(private readonly absenceService: AbsenceService){}

    @Post()
    async create(
        @Body('reasons') reasons: string,
        @Body('description') description: string,
        @Body('date_from') date_from: string,
        @Body('date_to') date_to: string,        
    ){
        const genId = await this.absenceService.create(
            reasons,
            description,
            date_from,
            date_to
        );
        return {id: genId};
    }

    @Get()
    async getAll(){
        return await this.absenceService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id : string){
        return await this.absenceService.getById(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id : string,
        @Body('reasons') reasons : string,
        @Body('description') description: string,
        @Body('observation') observation: string,
        @Body('date_from') date_from: Date,
        @Body('date_to') date_to: Date,     
        @Body('certificate') certificate : boolean
    ){
        await this.absenceService.update(
            id,
            reasons,
            description,
            observation,
            date_from,
            date_to,
            certificate
        );
    }

    @Patch('/updateStatus/:id')
    async updateStatus(
        @Param('id') id : string,
        @Body('status') status : string
    ){
        await this.absenceService.updateStatus(id, status);
    }

    @Patch('/updateApproved/:id')
    async updateApproved(
        @Param('id') id : string,
        @Body('approved') approved : string
    ){
        await this.absenceService.updateStatus(id, approved);
    }    

    @Delete('id')
    async delete(@Param('id') id : string){
        return await this.absenceService.delete(id);
    }

}