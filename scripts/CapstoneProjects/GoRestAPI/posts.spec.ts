// *****************************
// File: posts.spec.ts
// Description: This file contains tests for the post-related endpoints of the GoRest API, including creating, retrieving, updating, and deleting posts.
// Endpoints tested include:
//  - GET /public/v2/posts
//  - GET /public/v2/posts/{id}
//  - POST /public/v2/posts
//  - PUT /public/v2/posts/{id}
//  - PATCH /public/v2/posts/{id}
//  - DELETE /public/v2/posts/{id}
//
// *****************************

// Import necessary modules and fixtures
import { goRestTest, expect } from '../../../fixtures';


// Import test data - POST
import createUserValidData from './testData/users/POST/createUser_valid.json';
import createPostValidData from './testData/posts/POST/createPost_valid.json';
//import createPostMissingBody from './testData/posts/POST/createPost_missingBody.json';
//import createPostBlankTitle from './testData/posts/POST/createPost_blankTitle.json';

// Import test data - PUT
import updatePostDetails from './testData/posts/PUT/updatePost_title.json';

// Import test data - PATCH
import patchPostBody from './testData/posts/PATCH/patchPost_body.json';


// variable: userId [store the ID of the user created during POST test to be used in subsequent PUT, PATCH, DELETE tests] 
let userId: number = 0; // initialize with a default value, will be updated after POST test runs successfully
let postId: number = 0; // initialize with a default value, will be updated after POST test runs successfully
let postIds: number[] = [];  // array to store all the post Ids


// Post-related tests - GET, POST, PUT, PATCH, DELETE (CRUD operations)
goRestTest.describe('GoRest API - Posts Endpoint', () => {

  // -------------------------------------------------------
  // GET
  // -------------------------------------------------------

  goRestTest.describe('GoRest API - GET - posts', () => {

    // GET - Retrieve list of all posts
    goRestTest('GET - should return all posts with status 200', async ({ goRestAPIClient }) => {
      const response = await goRestAPIClient.getAllPosts();

      // response status assertion
      expect(response.status()).toBe(200);
      //console.log('GET /users - Response Status:', response.status());

      // response body assertions
      const body = await response.json();
      const postIds = body.map((post: any) => post.id);  // store all the existing ids into an array.

      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBe(10);
      //console.log('GET /users - Response Body:', body);

    });

    // GET - Retrieve a single post by ID
    goRestTest('GET - should return a single post by ID with status 200', async ({ goRestAPIClient }) => {
      
      const randomIds: number[] = [
                                    postIds[Math.floor(Math.random() * postIds.length)]!,
                                    postIds[Math.floor(Math.random() * postIds.length)]!,
                                    postIds[Math.floor(Math.random() * postIds.length)]!
      ];

      for (const postId of postIds) {
        console.log(`Testing GET /users/${userId} endpoint...`);
        const response = await goRestAPIClient.getPostById(postId);

        // response status assertion
        expect(response.status()).toBe(200);
        console.log(`GET /posts/${postId} - Response Status:`, response.status());

        // response body assertions
        const body = await response.json();
      
        expect(body).toHaveProperty('id', postId);
        expect(body).toHaveProperty('name');
        console.log(body.name);
        expect(body).toHaveProperty('email');
        expect(body).toHaveProperty('gender');
        expect(body).toHaveProperty('status');
      }

    });

    // GET - Error on invalid post ID
      goRestTest('GET - should return 404 for invalid user ID', async ({ goRestAPIClient }) => {
      
      const userIds = [9975762]; // existing user IDs in the system

      for (const userId of userIds) {
        console.log(`Testing GET /posts/${postId} endpoint...`);
        const response = await goRestAPIClient.getPostById(postId);

        // response status assertion
        expect(response.status()).toBe(404);
        //console.log(`GET /users/${userId} - Response Status:`, response.status());

        // response body assertions
        const body = await response.json();
        expect(body.message).toBe('Resource not found');
      }
    });   

  });  // end of GET/post collection 


  // -------------------------------------------------------
  // POST
  // -------------------------------------------------------  

  goRestTest.describe('GoRest API - POST - posts', () => {

    // POST - Create a new post with valid data    
    goRestTest('POST - should create a post successfully with status 201', async ({ goRestAPIClient }) => {

      // First, create a user to associate the post with
      const userResponse = await goRestAPIClient.createUser(createUserValidData);
      const userBody = await userResponse.json();
      userId = userBody.id;
      
      // Then, create a post for that user
      const postData = { ...createPostValidData, user_id: userId };
      const response = await goRestAPIClient.createPost(userId, postData);

      // response status assertion
      expect(response.status()).toBe(201);
      //console.log(`POST /users - Response Status:`, response.status());

      // response body assertions
      const body = await response.json();
      expect(body).toHaveProperty('id');
      postId = body.id; // store the created post ID for subsequent tests

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

  goRestTest.describe('GoRest API - PUT - posts', () => {

    // PUT - update post details with valid data    
    goRestTest('PUT - should update a post successfully with status 200', async ({ goRestAPIClient }) => {
      
      const response = await goRestAPIClient.updatePost(postId, updatePostDetails);

      // response status assertion
      expect(response.status()).toBe(200);
      //console.log(`POST /users - Response Status:`, response.status());

      // response body assertions
      const body = await response.json();

      // generic assertion — validates response matches request dynamically
      Object.keys(updatePostDetails).forEach(key => {
        expect(body[key]).toBe(updatePostDetails[key as keyof typeof updatePostDetails]);
      });
    
    });  

  }); // end of PUT/posts collection


  // -------------------------------------------------------
  // PATCH
  // -------------------------------------------------------  

  goRestTest.describe('GoRest API - PATCH - posts', () => {

    // PATCH - update post details with valid data    
    goRestTest('PATCH - should update a post successfully with status 200', async ({ goRestAPIClient }) => {
      
      const response = await goRestAPIClient.patchPost(postId, patchPostBody);

      // response status assertion
      expect(response.status()).toBe(200);
      //console.log(`POST /users - Response Status:`, response.status());

      // response body assertions
      const body = await response.json();

      // generic assertion — validates response matches request dynamically
      Object.keys(patchPostBody).forEach(key => {
        expect(body[key]).toBe(patchPostBody[key as keyof typeof patchPostBody]);
      });
    
    });  

  }); // end of PATCH/posts collection


  // -------------------------------------------------------
  // DELETE
  // -------------------------------------------------------  

  goRestTest.describe('GoRest API - DELETE - posts', () => {

    // DELETE - delete a post    
    goRestTest('DELETE - should delete a post successfully with status 204', async ({ goRestAPIClient }) => {

      const response = await goRestAPIClient.deletePost(postId);

      // response status assertion
      expect(response.status()).toBe(204);
      //console.log(`POST /users - Response Status:`, response.status());

      // response body assertions
      const body = await response.json();

      // generic assertion — validates response matches request dynamically
      Object.keys(patchPostBody).forEach(key => {
        expect(body[key]).toBe(patchPostBody[key as keyof typeof patchPostBody]);
      });
    
    });  

  }); // end of PATCH/posts collection




}); // end of overall CRUD Collection for posts endpoint
