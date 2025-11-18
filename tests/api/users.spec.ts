import { test, expect } from '../fixtures/pageFixtures';
import { newUser, updatedUser } from '../../data/users.data';

test.describe('ReqRes User API Tests @api', () => {
  let createdUserId: number;

  test('Create New User (POST)', async ({ userEndpoints }) => {
    test.info().annotations.push({ type: 'story', description: 'API-101: Create User' });

    // Use the userEndpoints fixture
    const response = await userEndpoints.createUser(newUser);

    // Verify response status
    expect(response.status()).toBe(201);

    // Verify response body
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('name', newUser.name);
    expect(responseBody).toHaveProperty('job', newUser.job);
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('createdAt');

    // Store the created user ID for other tests
    createdUserId = parseInt(responseBody.id, 10);
  });

  test('Get User (GET)', async ({ userEndpoints }) => {
    test.info().annotations.push({ type: 'story', description: 'API-102: Get User' });
    
    // Use an ID (e.g., 2) as ReqRes is a mock API
    const userIdToGet = 2;
    const response = await userEndpoints.getUser(userIdToGet);

    // Verify response status
    expect(response.status()).toBe(200);

    // Verify response body
    const responseBody = await response.json();
    expect(responseBody.data).toHaveProperty('id', userIdToGet);
    expect(responseBody.data).toHaveProperty('first_name', 'Janet');
  });

  test('Update User (PUT)', async ({ userEndpoints }) => {
    test.info().annotations.push({ type: 'story', description: 'API-103: Update User' });
    
    // Use the ID from the POST test if available, or a default
    const userIdToUpdate = createdUserId || 2;

    const response = await userEndpoints.updateUser(userIdToUpdate, updatedUser);

    // Verify response status
    expect(response.status()).toBe(200);

    // Verify response body
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('name', updatedUser.name);
    expect(responseBody).toHaveProperty('job', updatedUser.job);
    expect(responseBody).toHaveProperty('updatedAt');
  });

  test('Delete User (DELETE)', async ({ userEndpoints }) => {
    test.info().annotations.push({ type: 'story', description: 'API-104: Delete User' });
    
    // Use the ID from the POST test if available, or a default
    const userIdToDelete = createdUserId || 2;
    
    const response = await userEndpoints.deleteUser(userIdToDelete);

    // Verify response status
    expect(response.status()).toBe(204); // 204 No Content is standard for DELETE
  });
});