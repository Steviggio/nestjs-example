import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BooksService } from './books.service';
import { Book, BookRating } from './books.model';
import { CreateBookDto } from './dto/create-book.dto';
import { NotFoundException } from '@nestjs/common';
import { ObjectId } from 'mongodb';

// Create a mock model
const mockModel = {
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  save: jest.fn(),
};

describe('BooksService', () => {
  let service: BooksService;
  let model: Model<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken('book'),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    model = module.get<Model<Book>>(getModelToken('book'));
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const createBookDto: CreateBookDto = {
        title: 'Test Book',
        author: 'Test Author',
        imageUrl: 'https://example.com/image.jpg',
        year: 2022,
        genre: 'Fiction',
        userId: new ObjectId,
        averageRating: 0
      };

      const req = { user: { userId: 'user123' } };

      const expectedResult: Book = {
        _id: '1',
        userId: 'user123',
        ...createBookDto,
        ratings: [],
        averageRating: 0,
      };

      jest.spyOn(model, 'create').mockResolvedValueOnce(expectedResult);

      const result = await service.create(createBookDto, req);

      expect(result).toEqual(expectedResult);
      expect(model.create).toHaveBeenCalledWith({
        ...createBookDto,
        userId: req.user.userId,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      const expectedResult: Book[] = [
        { _id: '1', userId: 'user123', title: 'Book 1', ratings: [], averageRating: 0 },
        { _id: '2', userId: 'user456', title: 'Book 2', ratings: [], averageRating: 0 },
      ];

      jest.spyOn(model, 'find').mockResolvedValueOnce(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('findBookByID', () => {
    it('should return a book by ID', async () => {
      const bookId = '1';
      const expectedResult: Book = {
        _id: bookId,
        userId: 'user123',
        title: 'Test Book',
        ratings: [],
        averageRating: 0,
      };

      jest.spyOn(model, 'findOne').mockResolvedValueOnce(expectedResult);

      const result = await service.findBookByID(bookId);

      expect(result).toEqual(expectedResult);
      expect(model.findOne).toHaveBeenCalledWith({ _id: bookId });
    });

    it('should throw NotFoundException if book not found', async () => {
      const bookId = '1';

      jest.spyOn(model, 'findOne').mockResolvedValueOnce(null);

      await expect(service.findBookByID(bookId)).rejects.toThrowError(NotFoundException);
      expect(model.findOne).toHaveBeenCalledWith({ _id: bookId });
    });
  });

  describe('addRating', () => {
    it('should add a new rating to a book', async () => {
      const bookId = '1';
      const rating: BookRating = { userId: 'user123', grade: 4 };
      const existingBook: Book = {
        _id: bookId,
        userId: 'user456',
        title: 'Test Book',
        ratings: [],
        averageRating: 0,
      };

      jest.spyOn(model, 'findById').mockResolvedValueOnce(existingBook);
      jest.spyOn(model, 'save').mockResolvedValueOnce(existingBook);

      const result = await service.addRating(bookId, rating);

      expect(result).toEqual(existingBook);
      expect(model.findById).toHaveBeenCalledWith(bookId);
      expect(model.save).toHaveBeenCalledWith();
    });

    it('should update an existing rating for a user', async () => {
      const bookId = '1';
      const rating: BookRating = { userId: 'user123', grade: 5 };
      const existingBook: Book = {
        _id: bookId,
        userId: 'user456',
        title: 'Test Book',
        ratings: [{ userId: 'user123', grade: 4 }],
        averageRating: 4,
      };

      jest.spyOn(model, 'findById').mockResolvedValueOnce(existingBook);
      jest.spyOn(model, 'save').mockResolvedValueOnce(existingBook);

      const result = await service.addRating(bookId, rating);

      expect(result).toEqual(existingBook);
      expect(model.findById).toHaveBeenCalledWith(bookId);
      expect(model.save).toHaveBeenCalledWith();
    });

    it('should throw NotFoundException if book not found', async () => {
      const bookId = '1';
      const rating: BookRating = { userId: 'user123', grade: 4 };

      jest.spyOn(model, 'findById').mockResolvedValueOnce(null);

      await expect(service.addRating(bookId, rating)).rejects.toThrowError(NotFoundException);
      expect(model.findById).toHaveBeenCalledWith(bookId);
    });
  });
});
