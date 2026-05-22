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
import createUserValidData from '../testData/users/POST/createUser_valid.json';

