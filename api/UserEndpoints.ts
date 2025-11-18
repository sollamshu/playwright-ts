import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseAPI } from '../utils/BaseAPI';

/**
 * Represents the /api/users endpoint.
 * Provides methods for creating, getting, and updating users.
 */
export class UserEndpoints extends BaseAPI {
  constructor(request: APIRequestContext) {
    super(request);
  }

  /**
   * Creates a new user.
   * @param userData - The user data to create.
   * @returns The API response.
   */
  async createUser(userData: { name: string; job: string }): Promise<APIResponse> {
    return this.post('/api/users', userData, `Create user ${userData.name}`);
  }

  /**
   * Gets a specific user by ID.
   * @param userId - The ID of the user to retrieve.
   * @returns The API response.
   */
  async getUser(userId: number): Promise<APIResponse> {
    return this.get(`/api/users`, `Get users`);
  }

  /**
   * Updates an existing user.
   * @param userId - The ID of the user to update.
   * @param userData - The new data for the user.
   * @returns The API response.
   */
  async updateUser(userId: number, userData: { name: string; job: string }): Promise<APIResponse> {
    return this.put(`/api/users/${userId}`, userData, `Update user ${userId}`);
  }

  /**
   * Deletes a user.
   * @param userId - The ID of the user to delete.
   * @returns The API response.
   */
  async deleteUser(userId: number): Promise<APIResponse> {
    return this.delete(`/api/users/${userId}`, `Delete user ${userId}`);
  }
}