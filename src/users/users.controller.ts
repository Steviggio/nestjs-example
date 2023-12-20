import { Controller, Body, Post, Request, UseGuards, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import * as bcrypt from 'bcrypt';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // Route users/signup
  @Post("/signup")
  async addUser(
    @Body("password") userPassword: string,
    @Body("email") eMail: string,
  ) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userPassword, saltOrRounds);
    const result = await this.usersService.insertUser(
      eMail,
      hashedPassword
    );

    return {
      msg: "User successfully registered",
      userId: result.id,
      eMail: result.email,
      role: result.role
    };
  }

  // Route users/login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): any {
    return {
      User: req.user,
      msg: 'User logged in'
    };
  };

  // Route users/protected
  @UseGuards(AuthenticatedGuard)
  @Get("/protected")
  getHello(@Request() req): string {
    return req.user;
  };

  // Route users/logout
  // @UseGuards(AuthenticatedGuard)
  @Get("/logout")
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: "The user session has ended." }
  }

}
