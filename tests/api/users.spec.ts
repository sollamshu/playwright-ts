import { test, expect } from '../fixtures/pageFixtures';

test.describe('ReqRes User API Tests @api', () => {

  test('Get User (GET)', async ({ userEndpoints }) => {
    test.info().annotations.push({ type: 'story', description: 'API-102: Get User' });
    
    const response = await userEndpoints.getUsers();

    // Verify response status
    expect(response.status()).toBe(200);

    // Verify response body
    const responseBody = await response.json();
    expect(responseBody.total).toBeGreaterThan(0);
    expect(responseBody.total_pages).toBeGreaterThan(0);
    expect(responseBody.data.length).toBeGreaterThan(0);
  });
});