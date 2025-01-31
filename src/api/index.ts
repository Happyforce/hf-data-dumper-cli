export * from './generated';
import { OpenAPI, HappyforceAPI } from './generated';

export class HappyforceClient {
  private client: HappyforceAPI;

  constructor(apiKey: string) {
    this.client = new HappyforceAPI({
      BASE: 'https://api.myhappyforce.com/api',
      WITH_CREDENTIALS: false,
      CREDENTIALS: 'include',
      HEADERS: {
        'happyforceAPIKey': apiKey
      }
    });
  }

  get api() {
    return this.client;
  }
} 