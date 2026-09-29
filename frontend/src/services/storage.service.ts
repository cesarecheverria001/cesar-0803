import type { User } from '../types/user';

const USER_KEY = 'snail_race_user';
const SESSION_KEY = 'snail_race_session';

export const saveUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = (): User | null => {
  const user = localStorage.getItem(USER_KEY);

  if (!user) {
    return null;
  }

  return JSON.parse(user) as User;
};

export const updateUser = (user: User): void => {
  saveUser(user);
};

export const createSession = (): void => {
  localStorage.setItem(SESSION_KEY, 'true');
};

export const hasActiveSession = (): boolean => {
  return localStorage.getItem(SESSION_KEY) === 'true';
};

export const closeSession = (): void => {
  localStorage.removeItem(SESSION_KEY);
};