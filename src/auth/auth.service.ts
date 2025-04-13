import { BadRequestException, Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from "bcryptjs";
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly UserService: UsersService,
        private readonly jwtService: JwtService,
    ){}

    async register({name, email, password}: RegisterDto){
        const user = await this.UserService.findOneByEmail(email);
        
        if (user){
            throw new BadRequestException("User already exist")
        }

        await this.UserService.create({
            name, 
            email, 
            password: await bcryptjs.hash(password, 10)
        });
    }

    async login({email, password}: loginDto){
        const user = await this.UserService.findOneByEmail(email);
        if(!user){
            throw new UnauthorizedException("Email is Wrong")
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if(!isPasswordValid){
            throw new UnauthorizedException("Password is Wrong")
        }

        const payload = { email: user.email, rol: user.rol };

        const token = await this.jwtService.signAsync(payload);
        
        return {
            token, email, rol: user.rol,
        };
    }
}
