import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { User } from "./users.model";

@Injectable()
export class UsersRepository {

    static readonly USER_NOT_FOUND = 'User not found';

    constructor(@InjectModel('User') private readonly userModel : Model<User>) {}

    async create(
        name : string,
        email : string,
        password : any
    ) {
        const newUser = new this.userModel({
            name,
            email,
            password
        });

        const result = await newUser.save();
        return result.id as string;
    }

    private async find(id : string): Promise<User>{
        let user;
        try {
            user = await this.userModel.findById(id).exec();            
        } catch (error) {
            throw new NotFoundException(UsersRepository.USER_NOT_FOUND);
        }
        if (!user) { throw new NotFoundException(UsersRepository.USER_NOT_FOUND)}
        return user;
    }

    async getAll() {
        const users = await this.userModel.find().exec();
        return users.map(
            usr => ({
                id : usr.id,
                name : usr.name,
                email : usr.email,
                password : usr.password
            }));
    }

    async getById(id: string) {
        return await this.userModel.findById(id).exec();
    }

    async getByEmail(email: string) {
        return await this.userModel.findOne({ email }).exec();
    }    

    async delete(id : string) {
        const result = await this.userModel.deleteOne({_id: id}).exec();
        if (result.deletedCount === 0){
            throw new NotFoundException(UsersRepository.USER_NOT_FOUND);
        }
    }  

    async update(
        id : string,
        name : string,
        password : string
    ) {
        const user = await this.find(id);
        user.name = name;
        user.password = password;
        user.save();
    }

}

