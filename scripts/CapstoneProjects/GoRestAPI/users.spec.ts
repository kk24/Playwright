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

// Import test data - PUT
import updateUserDetails from './testData/users/PUT/updateUser_details.json';

// Import test data - PATCH
import patchUserStatus from './testData/users/PATCH/patchUser_status.json';


// variable: userId [store the ID of the user created during POST test to be used in subsequent PUT, PATCH, DELETE tests] 
let userId: number = 0; // initialize with a default value, will be updated after POST test runs successfully



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


  // -------------------------------------------------------
  // POST
  // -------------------------------------------------------  

  goRestTest.describe('GoRest API - POST - users', () => {

    // POST - Create a new user with valid data    
    goRestTest('POST - should create a user successfully with status 201', async ({ goRestAPIClient }) => {
      
      const response = await goRestAPIClient.createUser(createUserValidData);

      // response status assertion
      expect(response.status()).toBe(201);
      //console.log(`POST /users - Response Status:`, response.status());

      // response body assertions
      const body = await response.json();
      expect(body).toHaveProperty('id');
      userId = body.id; // store the created user ID for subsequent tests

      expect(body).toHaveProperty('name', createUserValidData.name);
      expect(body).toHaveProperty('email', createUserValidData.email);
      expect(body).toHaveProperty('gender', createUserValidData.gender);
      expect(body).toHaveProperty('status', createUserValidData.status);
    
    });  

    // POST - Create a new user with invalid data (missing email)    
    goRestTest('POST - should return 422 when email is missing', async ({ goRestAPIClient }) => {
      
      const response = await goRestAPIClient.createUser(createUserMissingEmail);

      // response status assertion
      expect(response.status()).toBe(422);
      //console.log(`POST /users - Response Status:`, response.status());

      // response body assertions
      const body = await response.json();
      expect(body.field).toBe('email');
      expect(body.message).toBe('can\'t be blank');
    });

    // POST - Create a new user with invalid data (unknown gender)    
    goRestTest('POST - should return 422 when gender is invalid', async ({ goRestAPIClient }) => {
      
      const response = await goRestAPIClient.createUser(createUserInvalidGender);

      // response status assertion
      expect(response.status()).toBe(422);
      //console.log(`POST /users - Response Status:`, response.status());

      // response body assertions
      const body = await response.json();
      expect(body.field).toBe('gender');
      expect(body.message).toBe('can\'t be blank, can be male or female');
    });
  
 
  });  // end of POST/users collection


  // -------------------------------------------------------
  // PUT
  // -------------------------------------------------------  

  goRestTest.describe('GoRest API - PUT - users', () => {

    // PUT - update user details with valid data    
    goRestTest('PUT - should update a user successfully with status 200', async ({ goRestAPIClient }) => {
      
      const response = await goRestAPIClient.updateUser(userId, updateUserDetails);

      // response status assertion
      expect(response.status()).toBe(200);
      //console.log(`POST /users - Response Status:`, response.status());

      // response body assertions
      const body = await response.json();

      // generic assertion — validates response matches request dynamically
      Object.keys(updateUserDetails).forEach(key => {
        expect(body[key]).toBe(updateUserDetails[key as keyof typeof updateUserDetails]);
      });
    
    });  

  }); // end of PUT/users collection


  // -------------------------------------------------------
  // PATCH
  // -------------------------------------------------------  

  goRestTest.describe('GoRest API - PATCH - users', () => {

    // PATCH - update user details with valid data    
    goRestTest('PATCH - should update a user successfully with status 200', async ({ goRestAPIClient }) => {
      
      const response = await goRestAPIClient.updateUser(userId, patchUserStatus);

      // response status assertion
      expect(response.status()).toBe(200);
      //console.log(`POST /users - Response Status:`, response.status());

      // response body assertions
      const body = await response.json();

      // generic assertion — validates response matches request dynamically
      Object.keys(patchUserStatus).forEach(key => {
        expect(body[key]).toBe(patchUserStatus[key as keyof typeof patchUserStatus]);
      });
    
    });  

  }); // end of PATCH/users collection








}); // end of overall CRUD Collection for users endpoint
