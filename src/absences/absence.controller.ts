import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    UseGuards
} from '@nestjs/common';
import { AbsenceService } from './absence.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('absences')
export class AbsenceController{

    constructor(private readonly absenceService: AbsenceService){}

    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(){
        return await this.absenceService.getAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Param('id') id : string){
        return await this.absenceService.getById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(
        @Param('id') id : string,
        @Body('reasons') reasons : string,
        @Body('description') description: string,
        @Body('observation') observation: string,
        @Body('date_from') date_from: string,
        @Body('date_to') date_to: string,     
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

    @UseGuards(JwtAuthGuard)
    @Patch('/updateApproved/:id')
    async updateApproved(
        @Param('id') id : string,
        @Body('approved') approved : string
    ){
        await this.absenceService.updateApproved(id, approved);
    }  

    @UseGuards(JwtAuthGuard)
    @Patch('/updateStatus/:id')
    async updateStatus(
        @Param('id') id : string,
        @Body('status') status : string
    ){
        await this.absenceService.updateStatus(id, status);
    }  

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id : string){
        return await this.absenceService.delete(id);
    }

}