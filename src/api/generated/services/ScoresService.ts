/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Score } from '../models/Score';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ScoresService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Retrieves a list of all available scores on your account
     * The information provided by this endpoint is useful to build the filters on the score Stats API
     * @returns Score OK
     * @throws ApiError
     */
    public getCompanyScoreStats2(): CancelablePromise<Array<Score>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/public/company/scores',
            errors: {
                400: `Bad Request`,
            },
        });
    }

}
