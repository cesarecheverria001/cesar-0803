import { beforeEach, describe, expect, it } from 'vitest';

import {
  getUser,
  saveUser,
  updateUser,
} from './storage.service';

import type { User } from '../types/user';

describe('storage.service', () => {
  const user: User = {
    id: 'user-123',
    fullName: 'Cesar Echeverria',
    email: 'cesar@example.com',
    password: '123456',
    balance: 0,
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('debe guardar y recuperar un usuario correctamente', () => {
    saveUser(user);

    const storedUser = getUser();

    expect(storedUser).not.toBeNull();
    expect(storedUser?.id).toBe('user-123');
    expect(storedUser?.email).toBe('cesar@example.com');
    expect(storedUser?.balance).toBe(0);
  });

  it('debe conservar el saldo actualizado en LocalStorage', () => {
    saveUser(user);

    const updatedUser: User = {
      ...user,
      balance: 500,
    };

    updateUser(updatedUser);

    const storedUser = getUser();

    expect(storedUser?.balance).toBe(500);
  });
});