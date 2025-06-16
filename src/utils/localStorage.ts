import { TargetUser } from '@/types/User';

// src/utils/localStorage.ts
export const saveTargetUserToLocalStorage = (user: TargetUser) => {
  try {
    localStorage.setItem('targetUser', JSON.stringify(user));
  } catch (e) {
    console.error('Error saving targetUser:', e);
  }
};

export const getTargetUserFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('targetUser');
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Error reading targetUser:', e);
    return null;
  }
};

export const removeTargetUserFromLocalStorage = () => {
  try {
    localStorage.removeItem('targetUser');
  } catch (e) {
    console.error('Error removing targetUser:', e);
  }
};
