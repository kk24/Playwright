// *****************************
// GoRestUserClient.ts
// This file defines the GoRestUserClient class, which provides methods to interact with the user-related endpoints of the GoRest API.
// *****************************


import { APIRequestContext } from '@playwright/test';

export class GoRestAPIClient {
  constructor(private request: APIRequestContext) {}

  // -------------------------------------------------------
  // Users
  // -------------------------------------------------------


  // GET list of users
  async getAllUsers() {
    return await this.request.get('/public/v2/users');
  }

  // GET a single user by ID
  async getUserById(id: number) {
    return await this.request.get(`/public/v2/users/${id}`);
  }

  // POST create a new user
  async createUser(data: object) {
    return await this.request.post('/public/v2/users', { data });
  }

  // PUT update an existing user
  async updateUser(id: number, data: object) {
    return await this.request.put(`/public/v2/users/${id}`, { data });
  }

  // PATCH partially update an existing user
  async patchUser(id: number, data: object) {
    return await this.request.patch(`/public/v2/users/${id}`, { data });
  }

  // DELETE a user
  async deleteUser(id: number) {
    return await this.request.delete(`/public/v2/users/${id}`);
  }

  // -------------------------------------------------------
  // Posts
  // -------------------------------------------------------

  // GET list of posts
  async getAllPosts() {
    return await this.request.get('/public/v2/posts');
  }

  async getPostById(id: number) {
    return await this.request.get(`/public/v2/posts/${id}`);
  }

  async createPost(userId: number, data: object) {
    return await this.request.post(`/public/v2/users/${userId}/posts`, { data });
  }

  async updatePost(id: number, data: object) {
    return await this.request.put(`/public/v2/posts/${id}`, { data });
  }

  async patchPost(id: number, data: object) {
    return await this.request.patch(`/public/v2/posts/${id}`, { data });
  }

  async deletePost(id: number) { 
    return await this.request.delete(`/public/v2/posts/${id}`);
  }

  // -------------------------------------------------------
  // Todos
  // -------------------------------------------------------
  

  // GET list of Todos
  async getAllTodos() {
    return await this.request.get('/public/v2/todos');
  }

  async getTodoById(id: number) {
    return await this.request.get(`/public/v2/todos/${id}`);
  }

  async createTodo(userId: number, data: object) {
    return await this.request.post(`/public/v2/users/${userId}/todos`, { data });
  }

  async updateTodo(id: number, data: object) {
    return await this.request.put(`/public/v2/todos/${id}`, { data });
  }

  async patchTodo(id: number, data: object) {
    return await this.request.patch(`/public/v2/todos/${id}`, { data });
  }

  async deleteTodo(id: number) {
    return await this.request.delete(`/public/v2/todos/${id}`);
  }

  // -------------------------------------------------------
  // XML Response
  // -------------------------------------------------------

  // GET XML response (all users in XML format)
  async getAllUsersXML() {
    return await this.request.get('/public/v2/users.xml');
  }

}