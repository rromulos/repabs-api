import { User } from './users.model';
import { Controller, Get, Param, Body, Post, Patch, UseGuards, Delete } from '@nestjs/common';
import { UsersService } from "./users.service";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UsersService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll() {
      return await this.userService.getAll();
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getById(@Param('id') id: string) {
      return await this.userService.getById(id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() user: User) {
      return await this.userService.create(
        user.name,
        user.email,
        user.password
      );
    }
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() user: User) {
      return await this.userService.update(id,user.name, user.email, user.password);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id : string) {
      return await this.userService.delete(id);
    }
}
