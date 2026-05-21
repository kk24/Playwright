// *****************************
// UserClient.ts
// This file defines the UserClient class, which provides methods to interact with the user-related endpoints of the GoRest API.
// *****************************


import { APIRequestContext } from '@playwright/test';

export class UserClient {
  constructor(private request: APIRequestContext) {}

  async getAllUsers() {
    return await this.request.get('/public/v2/users');
  }

  async getUserById(id: number) {
    return await this.request.get(`/public/v2/users/${id}`);
  }

  async createUser(data: object) {
    return await this.request.post('/public/v2/users', { data });
  }

  async updateUser(id: number, data: object) {
    return await this.request.put(`/public/v2/users/${id}`, { data });
  }

  async patchUser(id: number, data: object) {
    return await this.request.patch(`/public/v2/users/${id}`, { data });
  }

  async deleteUser(id: number) {
    return await this.request.delete(`/public/v2/users/${id}`);
  }
}