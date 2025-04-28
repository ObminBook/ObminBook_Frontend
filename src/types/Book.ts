export interface Book {
  id: number;
  title: string;
  author: string;
  categoryName: string;
  coverImage: string;
  ownerId: number;
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
