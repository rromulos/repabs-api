import { UsersService } from "./users.service";
import { User } from './user.model';
import { Controller, Get, Param, Body, Post, Put } from '@nestjs/common';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UsersService){}

    @Get()
    async getAll(): Promise<User[]> {
      return this.userService.getAll();
    }
  
    @Get(':id')
    async getById(@Param('id') id: string): Promise<User> {
      return this.userService.getById(id);
    }
  
    @Post()
    async create(@Body() user: User): Promise<User> {
      return this.userService.create(user);
    }
  
    /*@Put(':id')
    async update(@Param('id') id: string, @Body() user: User): Promise<User> {
      //return this.userService.update(id, user);
    }*/
}
