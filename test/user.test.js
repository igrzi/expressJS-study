import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../index';

describe('GET /users', () => {
  it('should return a list of users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, name: 'Igor' },
      { id: 2, name: 'Vianaz' },
      { id: 3, name: 'Marcelo' },
      { id: 4, name: 'Leandro' },
    ]);
  });
});
