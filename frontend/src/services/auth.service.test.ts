import { beforeEach, describe, expect, it } from 'vitest';

import { getUser } from './storage.service';
import {
  isAuthenticated,
  loginUser,
  logoutUser,
  registerUser,
} from './auth.service';

describe('auth.service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('debe registrar un usuario correctamente', () => {
    const user = registerUser({
      fullName: 'Cesar Echeverria',
      email: 'cesar@example.com',
      password: '123456',
    });

    expect(user.fullName).toBe('Cesar Echeverria');
    expect(user.email).toBe('cesar@example.com');
    expect(user.balance).toBe(0);
    expect(getUser()).not.toBeNull();
  });

  it('debe iniciar sesión con credenciales correctas', () => {
    registerUser({
      fullName: 'Cesar Echeverria',
      email: 'cesar@example.com',
      password: '123456',
    });

    const result = loginUser(
      'cesar@example.com',
      '123456',
    );

    expect(result).toBe(true);
    expect(isAuthenticated()).toBe(true);
  });

  it('no debe iniciar sesión con contraseña incorrecta', () => {
    registerUser({
      fullName: 'Cesar Echeverria',
      email: 'cesar@example.com',
      password: '123456',
    });

    const result = loginUser(
      'cesar@example.com',
      'incorrecta',
    );

    expect(result).toBe(false);
    expect(isAuthenticated()).toBe(false);
  });

  it('debe cerrar la sesión correctamente', () => {
    registerUser({
      fullName: 'Cesar Echeverria',
      email: 'cesar@example.com',
      password: '123456',
    });

    loginUser('cesar@example.com', '123456');

    expect(isAuthenticated()).toBe(true);

    logoutUser();

    expect(isAuthenticated()).toBe(false);
  });
  
});