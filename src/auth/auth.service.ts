import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
      private userService : UsersService,
      private jwtService: JwtService
      ) {}

     async validateUser(userEmail: string, userPassword: string) {
        const user = await this.userService.getByEmail(userEmail);
        if (user && await bcrypt.compare(userPassword, user.password)) {
          const { _id, name, email } = user;
          return { id: _id, name, email };
        }
        return null;
      }    

      async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
