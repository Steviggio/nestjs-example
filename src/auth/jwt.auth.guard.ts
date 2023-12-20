// import { ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
// import { AuthGuard } from "@nestjs/passport";
// import { AuthService } from "./auth.service";
// import { Reflector } from "@nestjs/core";

// @Injectable()
// export class JwtAuthGuard extends AuthGuard("jwt") {
//   constructor(private reflector: Reflector,
//     private authService: AuthService
//   ) {
//     super();
//   }

//   async canActivate(context: ExecutionContext) {
//     const isValid = (await super.canActivate(context)) as boolean;
//     return isValid;
//   }

//   handleRequest(err, user, info) {
//     if (err || !user) {
//       Logger.error(`Unauthorized: ${info && info.message}`);
//       throw err || new UnauthorizedException();
//     }
//     return user
//   }
// } 