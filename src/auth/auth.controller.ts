import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from "bcrypt"

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authservice: AuthService,
  ) { }

  @Post("signup")
  async signup(@Body() body: { email: string, password: string, role?: string }) {
    try {
      const { email, password, role } = body;
      const user = await this.usersService.createUser(email, password, role);
      return { message: "User saved in the database", user };
    } catch (error) {
      return { error };
    }
  }

  @Post("login")
  async login(@Body() body: { email: string, password: string }) {
    try {
      const user = await this.usersService.findUserByEmail(body.email);

      if (!user) {
        return { message: "User not found" };
      }

      const isPasswordValid = await bcrypt.compare(body.password, user.password)

      if (!isPasswordValid) {
        return { message: "Incorrect password" };
      }

      const token = this.authservice.generateToken(user.id)

      return {
        userId: user.id,
        token,
      };
    } catch (error) {
      return { error: "Internal server error" };
    }
  }
}
