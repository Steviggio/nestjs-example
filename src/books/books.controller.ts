import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  NotFoundException,
  UseGuards,
  UnauthorizedException,
  Req
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './books.model';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Request } from 'express';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  // @UseGuards(AuthenticatedGuard)
  @Post("new")
  async createBook(@Body() book: Partial<Book>, @Req() request: Request): Promise<any> {

    const user = request.user;
    return user
    // const user = request.user as {_id: string}
    // const {_id} = user


    // if (!_id) {

    //   throw new UnauthorizedException("User is not authenticated or session has expired");
    // }

    // const newBook = await this.booksService.create(book, _id)
    // return newBook
  }
}
