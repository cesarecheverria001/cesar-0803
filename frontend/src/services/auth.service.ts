import type { User } from '../types/user';

import {
  closeSession,
  createSession,
  getUser,
  hasActiveSession,
  saveUser,
} from './storage.service';

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

export const registerUser = ({
  fullName,
  email,
  password,
}: RegisterData): User => {
  const user: User = {
    id: crypto.randomUUID(),
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    password,
    balance: 0,
  };

  saveUser(user);

  return user;
};

export const loginUser = (
  email: string,
  password: string,
): boolean => {
  const user = getUser();

  if (!user) {
    return false;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const credentialsAreValid =
    user.email === normalizedEmail &&
    user.password === password;

  if (!credentialsAreValid) {
    return false;
  }

  createSession();

  return true;
};

export const logoutUser = (): void => {
  closeSession();
};

export const isAuthenticated = (): boolean => {
  return hasActiveSession();
};