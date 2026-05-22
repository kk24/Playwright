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



  });  // end of GET/users collection 
















}); // end of overall CRUD Collection for users endpoint
