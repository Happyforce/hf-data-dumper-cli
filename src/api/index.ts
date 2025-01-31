export * from './generated';
import { ApiError, OpenAPI, HappyforceAPI } from './generated';

export class HappyforceClient {
  private client: HappyforceAPI;

  constructor(apiKey: string) {
    OpenAPI.BASE = 'http://localhost:9000/api';
    OpenAPI.WITH_CREDENTIALS = false;
    OpenAPI.CREDENTIALS = 'include';
    OpenAPI.HEADERS = {
      'happyforceAPIKey': apiKey
    };
    this.client = new HappyforceAPI();
  }

  get api() {
    return this.client;
  }
} 