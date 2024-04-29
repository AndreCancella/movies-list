import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Users } from 'src/entity/user.entity';
import { UserService } from './user.service';
import { getRedis, setRedis } from 'src/config/authRedis';
import { ApiHeader, ApiNotFoundResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('users')
export class UserController {
    constructor(private readonly userservice: UserService) {}

    
    @Post()
    async createUser(@Body() userData: Partial<Users>): Promise<Users> {
      const user = await this.userservice.create(userData);
      await setRedis(`user-${user.id}`, JSON.stringify(user));
      return user;
    }


    @ApiOperation({ summary: 'Obter usuário por ID' })
    @ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' })
    @ApiResponse({ status: 200, description: 'Usuário encontrado', type: Users })
    @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
    @Get(':id')
    async getUser(@Param('id') id: number, @Body() body: any) {
      const user = await this.userservice.findById(id);
      const redisData = await getRedis(`user-${user.id}`)
      const cachedUser = redisData ? JSON.parse(redisData) : null;
      return { user: cachedUser || user };
    }
}
