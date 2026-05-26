// *****************************
// File: todos.spec.ts
// Description: This file contains tests for the todo-related endpoints of the GoRest API, including creating, retrieving, updating, and deleting todos.
// Endpoints tested include:
//  - GET /public/v2/todos
//  - GET /public/v2/todos/{id}
//  - POST /public/v2/todos
//  - PUT /public/v2/todos/{id}
//  - PATCH /public/v2/todos/{id}
//  - DELETE /public/v2/todos/{id}
//
// *****************************

// Import necessary modules and fixtures
import { goRestTest, expect } from '../../../fixtures';


// Import test data - POST
import createUserValidData from './testData/users/POST/createUser_valid.json';
import createTodoValidData from './testData/todos/POST/createTodo_valid.json';
//import createPostMissingBody from './testData/posts/POST/createPost_missingBody.json';
//import createPostBlankTitle from './testData/posts/POST/createPost_blankTitle.json';

// Import test data - PUT
import updateTodoDetails from './testData/todos/PUT/updateTodo_details.json';

// Import test data - PATCH
import patchTodoStatus from './testData/todos/PATCH/patchTodo_status.json';


// variable: userId [store the ID of the user created during POST test to be used in subsequent PUT, PATCH, DELETE tests] 
let userId: number = 0; // initialize with a default value, will be updated after POST test runs successfully
let todoId: number = 0; // initialize with a default value, will be updated after POST test runs successfully
let todoIds: number[] = [];  // array to store all the todo Ids


// Todo-related tests - GET, POST, PUT, PATCH, DELETE (CRUD operations)
goRestTest.describe('GoRest API - Todos Endpoint', () => {

  // -------------------------------------------------------
  // GET
  // -------------------------------------------------------

  goRestTest.describe('GoRest API - GET - todos', () => {

    // GET - Retrieve list of all todos
    goRestTest('GET - should return all todos with status 200', async ({ goRestAPIClient }) => {
      const response = await goRestAPIClient.getAllTodos();

      // response status assertion
      expect(response.status()).toBe(200);
      //console.log('GET /users - Response Status:', response.status());

      // response body assertions
      const body = await response.json();
      const todoIds = body.map((todo: any) => todo.id);  // store all the existing ids into an array.

      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBe(10);
      //console.log('GET /users - Response Body:', body);

    });

    // GET - Retrieve a single post by ID
    goRestTest('GET - should return a single post by ID with status 200', async ({ goRestAPIClient }) => {
      
      const randomIds: number[] = [
                                    todoIds[Math.floor(Math.random() * todoIds.length)]!,
                                    todoIds[Math.floor(Math.random() * todoIds.length)]!,
                                    todoIds[Math.floor(Math.random() * todoIds.length)]!
      ];

      for (const todoId of todoIds) {
        console.log(`Testing GET /todos/${todoId} endpoint...`);
        const response = await goRestAPIClient.getTodoById(todoId);

        // response status assertion
        expect(response.status()).toBe(200);
        console.log(`GET /todos/${todoId} - Response Status:`, response.status());

        // response body assertions
        const body = await response.json();
      
        expect(body).toHaveProperty('id', todoId);
        expect(body).toHaveProperty('title');
        console.log(body.title);
        expect(body).toHaveProperty('description');
        expect(body).toHaveProperty('status');
      }

    });

    // GET - Error on invalid todo ID
      goRestTest('GET - should return 404 for invalid todo ID', async ({ goRestAPIClient }) => {
      
      const todoIds = [9975762]; // existing todo IDs in the system

      for (const todoId of todoIds) {
        console.log(`Testing GET /todos/${todoId} endpoint...`);
        const response = await goRestAPIClient.getTodoById(todoId);

        // response status assertion
        expect(response.status()).toBe(404);
        //console.log(`GET /todos/${todoId} - Response Status:`, response.status());

        // response body assertions
        const body = await response.json();
        expect(body.message).toBe('Resource not found');
      }
    });   

  });  // end of GET/todos collection 


  // -------------------------------------------------------
  // POST
  // -------------------------------------------------------  

  goRestTest.describe('GoRest API - POST - todos', () => {

    // POST - Create a new todo with valid data    
    goRestTest('POST - should create a todo successfully with status 201', async ({ goRestAPIClient }) => {

      // First, create a user to associate the todo with
      const userResponse = await goRestAPIClient.createUser(createUserValidData);
      const userBody = await userResponse.json();
      userId = userBody.id;
      
      // Then, create a todo for that user
      const todoData = { ...createTodoValidData, user_id: userId };
      const response = await goRestAPIClient.createTodo(userId, todoData);

      // response status assertion
      expect(response.status()).toBe(201);
      //console.log(`POST /users - Response Status:`, response.status());

      // response body assertions
      const body = await response.json();
      expect(body).toHaveProperty('id');
      todoId = body.id; // store the created todo ID for subsequent tests

      expect(body).toHaveProperty('user_id', createUserValidData.name);
      expect(body).toHaveProperty('title', createUserValidData.email);
      expect(body).toHaveProperty('body', createUserValidData.gender);
     
    });  

    // // POST - Create a new user with invalid data (missing email)    
    // goRestTest('POST - should return 422 when email is missing', async ({ goRestAPIClient }) => {
      
    //   const response = await goRestAPIClient.createUser(createUserMissingEmail);

    //   // response status assertion
    //   expect(response.status()).toBe(422);
    //   //console.log(`POST /users - Response Status:`, response.status());

    //   // response body assertions
    //   const body = await response.json();
    //   expect(body.field).toBe('email');
    //   expect(body.message).toBe('can\'t be blank');
    // });

    // // POST - Create a new user with invalid data (unknown gender)    
    // goRestTest('POST - should return 422 when gender is invalid', async ({ goRestAPIClient }) => {
      
    //   const response = await goRestAPIClient.createUser(createUserInvalidGender);

    //   // response status assertion
    //   expect(response.status()).toBe(422);
    //   //console.log(`POST /users - Response Status:`, response.status());

    //   // response body assertions
    //   const body = await response.json();
    //   expect(body.field).toBe('gender');
    //   expect(body.message).toBe('can\'t be blank, can be male or female');
    // });
  
 
  });  // end of POST/posts collection



  // -------------------------------------------------------
  // PUT
  // -------------------------------------------------------  

  goRestTest.describe('GoRest API - PUT - todos', () => {

    // PUT - update todo details with valid data    
    goRestTest('PUT - should update a todo successfully with status 200', async ({ goRestAPIClient }) => {
      
      const response = await goRestAPIClient.updateTodo(todoId, updateTodoDetails);

      // response status assertion
      expect(response.status()).toBe(200);
      //console.log(`POST /users - Response Status:`, response.status());

      // response body assertions
      const body = await response.json();

      // generic assertion — validates response matches request dynamically
      Object.keys(updateTodoDetails).forEach(key => {
        expect(body[key]).toBe(updateTodoDetails[key as keyof typeof updateTodoDetails]);
      });
    
    });  

  }); // end of PUT/todos collection


  // -------------------------------------------------------
  // PATCH
  // -------------------------------------------------------  

  goRestTest.describe('GoRest API - PATCH - todos', () => {

    // PATCH - update todo details with valid data    
    goRestTest('PATCH - should update a todo successfully with status 200', async ({ goRestAPIClient }) => {
      
      const response = await goRestAPIClient.patchTodo(todoId, patchTodoStatus);

      // response status assertion
      expect(response.status()).toBe(200);
      //console.log(`POST /users - Response Status:`, response.status());

      // response body assertions
      const body = await response.json();

      // generic assertion — validates response matches request dynamically
      Object.keys(patchTodoStatus).forEach(key => {
        expect(body[key]).toBe(patchTodoStatus[key as keyof typeof patchTodoStatus]);
      });
    
    });  

  }); // end of PATCH/todos collection


  // -------------------------------------------------------
  // DELETE
  // -------------------------------------------------------  

  goRestTest.describe('GoRest API - DELETE - todos', () => {

    // DELETE - delete a todo    
    goRestTest('DELETE - should delete a todo successfully with status 204', async ({ goRestAPIClient }) => {

      const response = await goRestAPIClient.deleteTodo(todoId);

      // response status assertion
      expect(response.status()).toBe(204);
      //console.log(`POST /users - Response Status:`, response.status());

      // response body assertions
      const body = await response.json();

      // generic assertion — validates response matches request dynamically
      Object.keys(patchTodoStatus).forEach(key => {
        expect(body[key]).toBe(patchTodoStatus[key as keyof typeof patchTodoStatus]);
      });
    
    });  

  }); // end of PATCH/todos collection




}); // end of overall CRUD Collection for posts endpoint
