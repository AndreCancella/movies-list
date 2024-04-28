import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async generateToken(payload: any) : Promise<string>{
        return this.jwtService.signAsync(payload);
    }

    async validateUser(username: string, password: string) : Promise<any>{
        
    }

}
