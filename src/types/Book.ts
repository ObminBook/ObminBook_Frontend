export interface Book {
  id: number;
  ownerId: number;
  title: string;
  author: string;
  categoryName: string;
  coverImage: string;
  ownerName?: string;
  condition: string;
  exchangeType: string;
  city: string;
  description?: string;
  realeaseDate?: string;
  pages?: string;
  language?: string;
  addedOn?: string;
}
