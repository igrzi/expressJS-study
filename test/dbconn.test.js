import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index';

describe('GET /users (DB integration)', () => {
  it('should return users from the database', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
