/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Area } from '../models/Area';
import type { Group } from '../models/Group';
import type { Profile } from '../models/Profile';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SegmentationService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Retrieves all the areas metadata and configuration available for your company in a hirarchical way
     * The information provided by this endpoint is useful to build the filters on the stats API or setup the employee profiles on the Employees API.
     * @returns Area OK
     * @throws ApiError
     */
    public getHierarchy(): CancelablePromise<Array<Area>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/public/company/hierarchy',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Retrieves all the group metadata (eg: perfomant users, newbies...) and configuration available for your company
     * The information provided by this endpoint is useful to build the filters on the stats API or setup the employee profiles on the Employees API.
     * @returns Group OK
     * @throws ApiError
     */
    public getGroups(): CancelablePromise<Array<Group>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/public/company/groups',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Retrieves all the personal profile metadata (eg: gender, age, tenure) and configuration available for your company
     * The information provided by this endpoint is useful to build the filters on the stats API or setup the employee profiles on the Employees API.
     * @returns Profile OK
     * @throws ApiError
     */
    public getCharacteristics(): CancelablePromise<Array<Profile>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/public/company/characteristics',
            errors: {
                400: `Bad Request`,
            },
        });
    }

}
