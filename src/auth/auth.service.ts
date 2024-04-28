import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthResponseDto } from './auth.dto';
import {compareSync as bcrypCompareSync} from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private jwtExpirationTimeSeconds: number;

    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.jwtExpirationTimeSeconds = +this.configService.get<number>('JWT_EXPIRATION_TIME');
    }
    
    async signIn(username: string, pasasword: string){
        const foundUser = await this.usersService.findByUserName(username);
        
        if(!foundUser){
            throw new UnauthorizedException();
        }

        const payload = {sub: foundUser.id, username: foundUser.username};

        const token = this.jwtService.sign(payload);

        return {token, expiresIn: this.jwtExpirationTimeSeconds}
    }
}
