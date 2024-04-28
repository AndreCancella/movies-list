import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import { AuthService } from './auth.service';
import { ApiHeader, ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @ApiOperation({ summary: 'Entrar com usuário' })
    @ApiParam({ name: 'username', description: 'username', type: 'string' })
    @ApiParam({ name: 'password', description: 'password', type: 'string' })
    @ApiResponse({ status: 200, description: 'Login realizado com sucesso'})
    @ApiNotFoundResponse({ description: 'Login não realizado com sucesso' })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(
        @Body('username') username: string,
        @Body('password') password: string
    ){
        return this.authService.signIn(username, password);
    }

}
