import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken"

@Injectable()
export class AuthService {
  generateToken(userId: number): string {
    return jwt.sign({ userId }, process.env.SECRET_TOKEN, { expiresIn: "1H" })
  }


  verifyToken(token: string): any {
    try {
      return jwt.verify(token, process.env.SECRET_TOKEN);
    } catch (error) {
      throw new Error("Invalid Token")
    }
  }

}
