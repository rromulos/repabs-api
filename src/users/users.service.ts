import { Injectable, NotFoundException, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  static readonly USER_NOT_FOUND = 'User not found';
  static readonly EMAIL_ALREADY_EXISTS = 'Email already exists';
  static readonly NAME_FIELD_IS_EMPTY = 'Name field is empty';
  static readonly EMAIL_FIELD_IS_EMPTY = 'Email field is empty';
  static readonly PASSWORD_FIELD_IS_EMPTY = 'Password field is empty';
  static readonly EMAIL_IS_INVALID = 'Email is not valid';

  constructor(private readonly userRepository : UsersRepository) { }

  async getAll() {
    return await this.userRepository.getAll();
  }

  async getById(id: string) {
    let user ;
    try {
      user = await this.userRepository.getById(id);
    } catch (error) {
      throw new NotFoundException(UsersRepository.USER_NOT_FOUND);
    }
    if(!user) { throw new NotFoundException(UsersRepository.USER_NOT_FOUND)}
    return {
      id : user.id,
      name : user.name,
      email : user.email
    }    
  }

  async getByEmail(email: string) {
    return await this.userRepository.getByEmail(email);
  }

  async create(
    name : string,
    email : string,
    password : string
  ) {

    if (await this.doesUserExists(email) && 
        await this.isUserValidated(name, email, password)) {
      throw new HttpException(UsersService.EMAIL_ALREADY_EXISTS, HttpStatus.AMBIGUOUS);
    } else {
      const npassword = await this.genHash(password);
      const result = await this.userRepository.create(
        name,
        email,
        npassword
      );
      return result;
    }
  }

  private async genHash(password : any){
    const saltOrRounds = 10;
    return  await bcrypt.hash(password, saltOrRounds);
  }

  async update(
    id : string,
    name : string,
    email : string,
    password : string
  ) {
    const npassword = await this.genHash(password);
    if (this.isUserValidated(name, email, password)) {
      return await this.userRepository.update(id,name,npassword);
    }
  }

  private async doesUserExists(email : string) {
    try {
      if (await this.getByEmail(email)) { return true ;}
    } catch (error) {
      return false.valueOf;
    }
  }

  private async isEmailValid(email : string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  private async isUserValidated(
    name : string,
    email : string,
    password : string
  ) {
    if (!name) {
      throw new BadRequestException(UsersService.NAME_FIELD_IS_EMPTY);
    }
    if (!email) {
      throw new BadRequestException(UsersService.EMAIL_FIELD_IS_EMPTY);
    }
    if (!password) {
      throw new BadRequestException(UsersService.PASSWORD_FIELD_IS_EMPTY);
    }    
    if(!this.isEmailValid(email)) {
      throw new BadRequestException(UsersService.EMAIL_IS_INVALID);
    }
    return true;
  }

  async delete(id : string) {
    return await this.userRepository.delete(id);
  }

}