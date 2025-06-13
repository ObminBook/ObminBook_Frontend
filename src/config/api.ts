// config/api.ts
const isDev = import.meta.env.MODE === 'development';

export const API_BASE = isDev ? import.meta.env.VITE_API_BASE : '/api';

// Debug логування
console.log('🔧 API Configuration:');
console.log('Mode:', import.meta.env.MODE);
console.log('IsDev:', isDev);
console.log('Hostname:', window.location.hostname);
console.log('VITE_API_BASE from env:', import.meta.env.VITE_API_BASE);
console.log('Final API_BASE:', API_BASE);
