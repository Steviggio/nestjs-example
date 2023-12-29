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
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @UseGuards(AuthenticatedGuard)
  @Post("new")
  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Req() req: Request): Promise<Book> {
    const newBook = await this.booksService.create(createBookDto, req);
    return newBook;
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }
}
