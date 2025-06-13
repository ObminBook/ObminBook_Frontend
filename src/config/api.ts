// config/api.ts
export const API_BASE = import.meta.env.VITE_API_BASE;

// Debug логування
console.log('🔧 API Configuration:');
console.log('Mode:', import.meta.env.MODE);
console.log('VITE_API_BASE from env:', import.meta.env.VITE_API_BASE);
console.log('Final API_BASE:', API_BASE);
