// *****************************
// File: users.spec.ts
// Description: This file contains tests for the user-related endpoints of the GoRest API, including creating, retrieving, updating, and deleting users.
// Endpoints tested include:
//  - GET /public/v2/users
//  - GET /public/v2/users/{id}
//  - POST /public/v2/users
//  - PUT /public/v2/users/{id}
//  - PATCH /public/v2/users/{id}
//  - DELETE /public/v2/users/{id}
//
// *****************************

// Import necessary modules and fixtures
import { goRestTest, expect } from '../../../fixtures';

// Import test data - POST
import createUserValidData from './testData/users/POST/createUser_valid.json';
import createUserMissingEmail from './testData/users/POST/createUser_missingEmail.json';
import createUserInvalidGender from './testData/users/POST/createUser_invalidGender.json';


// User-related tests - GET, POST, PUT, PATCH, DELETE (CRUD operations)
goRestTest.describe('GoRest API - Users Endpoint', () => {

  // -------------------------------------------------------
  // GET
  // -------------------------------------------------------

  goRestTest.describe('GoRest API - GET - users', () => {

    // GET - Retrieve list of all users
    goRestTest('GET - should return all users with status 200', async ({ goRestAPIClient }) => {
      const response = await goRestAPIClient.getAllUsers();

      // response status assertion
      expect(response.status()).toBe(200);
      //console.log('GET /users - Response Status:', response.status());

      // response body assertions
      const body = await response.json();
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBe(10);
      //console.log('GET /users - Response Body:', body);

    });

    // GET - Retrieve a single user by ID
    goRestTest('GET - should return a single user by ID with status 200', async ({ goRestAPIClient }) => {
      
      const userIds = [8475764, 8475763, 8475762]; // existing user IDs in the system

      for (const userId of userIds) {
        console.log(`Testing GET /users/${userId} endpoint...`);
        const response = await goRestAPIClient.getUserById(userId);

        // response status assertion
        expect(response.status()).toBe(200);
        console.log(`GET /users/${userId} - Response Status:`, response.status());

        // response body assertions
        const body = await response.json();
      
        expect(body).toHaveProperty('id', userId);
        expect(body).toHaveProperty('name');
        console.log(body.name);
        expect(body).toHaveProperty('email');
        expect(body).toHaveProperty('gender');
        expect(body).toHaveProperty('status');
      }

    });

    // GET - Error on invalid user ID
      goRestTest('GET - should return 404 for invalid user ID', async ({ goRestAPIClient }) => {
      
      const userIds = [9975762]; // existing user IDs in the system

      for (const userId of userIds) {
        console.log(`Testing GET /users/${userId} endpoint...`);
        const response = await goRestAPIClient.getUserById(userId);

        // response status assertion
        expect(response.status()).toBe(404);
        //console.log(`GET /users/${userId} - Response Status:`, response.status());

        // response body assertions
        const body = await response.json();
        expect(body.message).toBe('Resource not found');
      }

    });   



    





  });  // end of GET/users collection 
















}); // end of overall CRUD Collection for users endpoint
