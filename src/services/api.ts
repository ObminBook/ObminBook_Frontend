import { books } from '../books/books';
import { Book } from '../types/Book';
import { Profile } from '../types/Profile';

const API_URL = 'https://api.obminbook.ua/';

export const fetchUserProfile = async (): Promise<Profile | null> => {
  try {
    const response = await fetch(`${API_URL}user/profile`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Profile = await response.json(); // Повертається Profile
    return data;
  } catch (error) {
    console.error('Error fetching user profile', error);
    return null;
  }
};

export const fetchBooksFromServer = async (): Promise<Book[]> => {
  // Try fetching from API when ready
  // try {
  //   const response = await fetch(`${API_URL}user/books-for-trade`);
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   const data: Book[] = await response.json();
  //   return data;
  // } catch (error) {
  //   console.error('Error fetching books for trade', error);
  //   return [];
  // }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(books);
    }, 1000);
  });
};

export const fetchBooksForWishlist = async (): Promise<Book[]> => {
  try {
    const response = await fetch(`${API_URL}user/wishlist`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Book[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching wishlist books', error);
    return [];
  }
};
