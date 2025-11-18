import { APIRequestContext, expect } from '@playwright/test';
import { Logger } from './Logger';

/**
 * BaseAPI class provides common methods for API interactions.
 */
export class BaseAPI {
  protected readonly request: APIRequestContext;
  protected readonly logger: Logger;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.logger = new Logger(this.constructor.name);
  }

  /**
   * Sends a GET request.
   * @param endpoint - The API endpoint.
   * @param description - A human-readable description of the request.
   * @returns The API response.
   */
  async get(endpoint: string, description: string) {
    this.logger.info(`Sending GET request to ${endpoint}: ${description}`);
    try {
      const response = await this.request.get(endpoint);
      this.logger.info(`GET ${endpoint} responded with status ${response.status()}`);
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`GET request to ${endpoint} failed. Error: ${errorMessage}`);
      throw new Error(`GET ${endpoint} failed: ${errorMessage}`);
    }
  }

  /**
   * Sends a POST request.
   * @param endpoint - The API endpoint.
   * @param data - The payload to send.
   * @param description - A human-readable description of the request.
   * @returns The API response.
   */
  async post(endpoint: string, data: any, description: string) {
    this.logger.info(`Sending POST request to ${endpoint}: ${description}`);
    try {
      const response = await this.request.post(endpoint, { data });
      this.logger.info(`POST ${endpoint} responded with status ${response.status()}`);
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`POST request to ${endpoint} failed. Error: ${errorMessage}`);
      throw new Error(`POST ${endpoint} failed: ${errorMessage}`);
    }
  }

  /**
   * Sends a PUT request.
   * @param endpoint - The API endpoint.
   * @param data - The payload to send.
   * @param description - A human-readable description of the request.
   * @returns The API response.
   */
  async put(endpoint: string, data: any, description: string) {
    this.logger.info(`Sending PUT request to ${endpoint}: ${description}`);
    try {
      const response = await this.request.put(endpoint, { data });
      this.logger.info(`PUT ${endpoint} responded with status ${response.status()}`);
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`PUT request to ${endpoint} failed. Error: ${errorMessage}`);
      throw new Error(`PUT ${endpoint} failed: ${errorMessage}`);
    }
  }

  /**
   * Sends a DELETE request.
   * @param endpoint - The API endpoint.
   * @param description - A human-readable description of the request.
   * @returns The API response.
   */
  async delete(endpoint: string, description: string) {
    this.logger.info(`Sending DELETE request to ${endpoint}: ${description}`);
    try {
      const response = await this.request.delete(endpoint);
      this.logger.info(`DELETE ${endpoint} responded with status ${response.status()}`);
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`DELETE request to ${endpoint} failed. Error: ${errorMessage}`);
      throw new Error(`DELETE ${endpoint} failed: ${errorMessage}`);
    }
  }
}