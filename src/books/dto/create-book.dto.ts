export class CreateBookDto {
  userId: string;
  title: string;
  author: string;
  imageUrl: string;
  year: number;
  genre: string;
  ratings: { userId: string, grade: number }[];
  averageRating: number
}
