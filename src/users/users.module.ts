import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './users.controllers';
import { UserSchema } from './users.model';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
  controllers: [UserController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
