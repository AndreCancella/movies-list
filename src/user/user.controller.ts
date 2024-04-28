import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Users } from 'src/entity/user.entity';
import { UserService } from './user.service';
import { getRedis, setRedis } from 'src/config/redis';

@Controller('user')
export class UserController {
    constructor(private readonly userservice: UserService) {}

    
    @Post()
    async createUser(@Body() userData: Partial<Users>): Promise<Users> {
      const user = await this.userservice.create(userData);
      await setRedis(`user-${user.id}`, JSON.stringify(user));
      return user;
    }

    @Get(':id')
    async getUser(@Param('id') id: number) {
      const data = await this.userservice.findById(id);
      const redis = await getRedis(`user-${data.id}`)
      const user = JSON.parse(redis);
      return { user };
    }

}
