/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';

import { EmployeesService } from './services/EmployeesService';
import { ScoresService } from './services/ScoresService';
import { SegmentationService } from './services/SegmentationService';
import { StatsService } from './services/StatsService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class HappyforceAPI {

    public readonly employees: EmployeesService;
    public readonly scores: ScoresService;
    public readonly segmentation: SegmentationService;
    public readonly stats: StatsService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'https://api.myhappyforce.com/api',
            VERSION: config?.VERSION ?? '1',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.employees = new EmployeesService(this.request);
        this.scores = new ScoresService(this.request);
        this.segmentation = new SegmentationService(this.request);
        this.stats = new StatsService(this.request);
    }
}

