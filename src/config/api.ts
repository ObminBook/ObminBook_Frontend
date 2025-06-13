// config/api.ts
const isDev = import.meta.env.MODE === 'development';

export const API_BASE = isDev
  ? 'http://localhost:5173/api' // Дев - як працювало
  : 'https://obminbook.us-east-1.elasticbeanstalk.com'; // Продакшн - без /api

// Debug логування
console.log('🔧 API Configuration:');
console.log('Mode:', import.meta.env.MODE);
console.log('IsDev:', isDev);
console.log('API_BASE:', API_BASE);
console.log('Raw ENV VITE_API_BASE:', import.meta.env.VITE_API_BASE);
