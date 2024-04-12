import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /*
  GET /users
  GET /users/:id
  POST /users
  PATCH /users/:id
  DELETE /users/:id
  */

  @Get() // GET /users or /user?role=value&age
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    return this.usersService.findAll(role);
  }

  // @Get('interns') // GET /users/interns
  // findallInterns() {
  //   return [];
  // }

  /* : indicates a dynamic route parameter that will catch any value and assign it to the id var
  after the colon SO SPECIFIC ROUTES MUST COME FIRST */
  @Get(':id') // GET /users/:id (colon indicates a parameter)
  findOne(@Param('id') id: string) /* must give type */ {
    return this.usersService.findOne(parseInt(id));
  }

  @Post() // POST /users
  create(
    @Body()
    user: {
      name: string;
      email: string;
      role: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.usersService.create(user);
  }

  @Patch(':id') // PATCH /users/:id
  update(@Param('id') id: string, @Body() userUpdate: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    },
  ) {
    return this.usersService.update(parseInt(id), userUpdate);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string) {
    return this.usersService.delete(parseInt(id));
  }
}
