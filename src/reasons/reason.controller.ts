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
    import { ReasonService } from './reason.service';
    import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

  @Controller('reasons')
  export class ReasonsController {

    constructor(private readonly reasonsService : ReasonService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body('name') name: string,
        @Body('description') description: string,        
    ){
        const genId = await this.reasonsService.create(name,description);
        return {id: genId};
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(){
        const reasons = await this.reasonsService.getAll();
        return reasons;
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Param('id')id : string){
        const reason = await this.reasonsService.getById(id);
        return reason;
    }

    @UseGuards(JwtAuthGuard)
    @Get('/name/:name')
    async getByName(@Param('name') name : string,) {
        const reason = await this.reasonsService.getByName(name);
        return reason;
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(
        @Param('id') id : string,
        @Body('name') name : string,
        @Body('description') description : string
    ){
        await this.reasonsService.update(id, name, description);
        return null;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id : string){
        return await this.reasonsService.delete(id);
    }

  }