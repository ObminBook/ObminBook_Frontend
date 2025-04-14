// import React, { useState, useEffect } from 'react';
// import {
//   fetchUserProfile,
//   fetchBooksForTrade,
//   fetchBooksForWishlist,
// } from '../../services/api';
// import styles from './UserProfile.module.scss';
// import { Book } from '../../types/Book.js';
// import { Message } from '../../types/Message.js';
// import { Profile } from '../../types/Profile.js';

// function UserProfile() {
//   const [userProfile, setUserProfile] = useState<Profile | null>(null);
//   const [booksForTrade, setBooksForTrade] = useState<Book[]>([]);
//   const [wishlistBooks, setWishlistBooks] = useState<Book[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const profile = await fetchUserProfile();
//         const booksForTradeData = await fetchBooksForTrade();
//         const wishlistBooksData = await fetchBooksForWishlist();

//         setUserProfile(profile);
//         setBooksForTrade(booksForTradeData);
//         setWishlistBooks(wishlistBooksData);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching user profile data', error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleExchangeRequest = (bookTitle: string) => {
//     alert(`Запит на обмін для книжки: ${bookTitle}`);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className={styles['user-profile']}>
//       <div className={styles['user-profile__header']}>
//         <img
//           src={userProfile?.avatar}
//           alt="User Avatar"
//           className={styles['user-profile__header-avatar']}
//         />
//         <h2>{userProfile?.name}</h2>
//         <p>{userProfile?.email}</p>
//       </div>

//       <div className={styles['user-profile__section']}>
//         <h3>Книги для обміну:</h3>
//         <ul className={styles['user-profile__obmin-list']}>
//           {booksForTrade.length === 0 ? (
//             <li>Немає доступних книг для обміну.</li>
//           ) : (
//             booksForTrade.slice(0, 4).map((book) => (
//               <li key={book.id} className={styles['user-profile__obmin-item']}>
//                 <img
//                   className={styles['user-profile__book-image']}
//                   src={book.imgUrl}
//                   alt={book.title}
//                 />
//                 <h4>{book.title}</h4>
//                 <button
//                   className={styles['user-profile__button']}
//                   onClick={() => handleExchangeRequest(book.title)}
//                 >
//                   Запитати обмін
//                 </button>
//               </li>
//             ))
//           )}
//         </ul>
//       </div>

//       <div className={styles['user-profile__section']}>
//         <h3>Мої побажання:</h3>
//         <ul>
//           {wishlistBooks.length === 0 ? (
//             <li>Немає побажаних книг.</li>
//           ) : (
//             wishlistBooks.map((book) => (
//               <li key={book.id}>
//                 <img
//                   src={book.imgUrl}
//                   alt={book.title}
//                   className={styles['user-profile__book-image']}
//                 />
//                 <span>{book.title}</span>
//               </li>
//             ))
//           )}
//         </ul>
//       </div>

//       <div className={styles['user-profile__section']}></div>
//     </div>
//   );
// }

// export default UserProfile;
