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
   * Gets a list of users.
   * @param userId - The ID of the user to retrieve.
   * @returns The API response.
   */
  async getUsers(): Promise<APIResponse> {
    return this.get(`/api/users`, `Get users`);
  }
}