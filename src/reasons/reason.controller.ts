import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';

  import { ReasonService } from './reason.service';

  @Controller('reasons')
  export class ReasonsController {

    constructor(private readonly reasonsService : ReasonService) {}

    @Post()
    async create(
        @Body('name') name: string,
        @Body('description') description: string,        
    ){
        const genId = await this.reasonsService.create(name,description);
        return {id: genId};
    }

    @Get()
    async getAll(){
        const reasons = await this.reasonsService.getAll();
        return reasons;
    }

    @Get(':id')
    async getById(@Param('id')id : string){
        const reason = await this.reasonsService.getById(id);
        return reason;
    }

    @Get(':name')
    getByName(@Param('name') name : string,) {
        
    }

    @Patch(':id')
    update(
        @Param('id') id : string,
        @Body('name') name : string,
        @Body('description') description : string
    ){
        //invoke service
    }

    @Delete(':id')
    delete(@Param('id') id : string){
        //invoke service
    }

  }