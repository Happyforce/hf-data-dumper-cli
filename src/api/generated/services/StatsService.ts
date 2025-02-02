/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Activation_Stats } from '../models/Activation_Stats';
import type { ENPSStats } from '../models/ENPSStats';
import type { HIStats } from '../models/HIStats';
import type { Participation_Stats } from '../models/Participation_Stats';
import type { ScoreStats } from '../models/ScoreStats';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class StatsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Retrieves the Stats of a score for a given iteractions
     * @returns ScoreStats OK
     * @throws ApiError
     */
    public getCompanyScoreStats({
        scoreId,
        from,
        to,
        hierarchyId,
        profile,
        groupId,
    }: {
        /**
         * Score from which the stats should be retrieved
         */
        scoreId: string,
        /**
         * For which date from the results should be returned
         */
        from?: string,
        /**
         * For which date to the results should be returned
         */
        to?: string,
        /**
         * Id of the area for which you want to retrive the stats. If null, all company data is returned
         */
        hierarchyId?: string,
        /**
         * Profile filter string. If not specified, no profile filtering will be applied. Check examples for details
         */
        profile?: string,
        /**
         * One or more group ids for which you want to retrieve the stats. If not specified, no group filtering will be applied
         */
        groupId?: Array<string>,
    }): CancelablePromise<ScoreStats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/public/company/stats/scores/stats/{scoreId}',
            path: {
                'scoreId': scoreId,
            },
            query: {
                'from': from,
                'to': to,
                'hierarchyId': hierarchyId,
                'profile': profile,
                'groupId': groupId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Retrieves the Stats of a score for a given iteractions
     * @returns ScoreStats OK
     * @throws ApiError
     */
    public getCompanyScoreStats1({
        scoreId,
        from,
        to,
        hierarchyId,
        profile,
        groupId,
    }: {
        /**
         * Score from which the stats should be retrieved
         */
        scoreId: string,
        /**
         * For which date from the results should be returned
         */
        from?: string,
        /**
         * For which date to the results should be returned
         */
        to?: string,
        /**
         * Id of the area for which you want to retrive the stats. If null, all company data is returned
         */
        hierarchyId?: string,
        /**
         * Profile filter string. If not specified, no profile filtering will be applied. Check examples for details
         */
        profile?: string,
        /**
         * One or more group ids for which you want to retrieve the stats. If not specified, no group filtering will be applied
         */
        groupId?: Array<string>,
    }): CancelablePromise<ScoreStats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/public/company/stats/scores/{scoreId}',
            path: {
                'scoreId': scoreId,
            },
            query: {
                'from': from,
                'to': to,
                'hierarchyId': hierarchyId,
                'profile': profile,
                'groupId': groupId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Retrieves the Participation stats for the requested period
     * @returns Participation_Stats OK
     * @throws ApiError
     */
    public getCompanyParticipationStats({
        from,
        to,
        hierarchyId,
        profile,
        groupId,
        grouping = 'MONTH',
    }: {
        /**
         * Start date for retrieving stats (ddMMyyyy format). If null: Today minus one month
         */
        from?: string,
        /**
         * End date for retrieving stats  (ddMMyyyy format). If null: Today
         */
        to?: string,
        /**
         * Id of the area for which you want to retrive the stats. If null, all company data is returned
         */
        hierarchyId?: string,
        /**
         * Profile filter string. If not specified, no profile filtering will be applied.
         */
        profile?: string,
        /**
         * One or more group ids for which you want to retrieve the stats. If not specified, no group filtering will be applied
         */
        groupId?: Array<string>,
        /**
         * The type of grouping for the results. Default is by moth
         */
        grouping?: 'DAY' | 'WEEK' | 'MONTH' | 'QUARTER' | 'YEAR',
    }): CancelablePromise<Participation_Stats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/public/company/stats/participation',
            query: {
                'from': from,
                'to': to,
                'hierarchyId': hierarchyId,
                'profile': profile,
                'groupId': groupId,
                'grouping': grouping,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Retrieves the HI stats for the requested period
     * @returns HIStats OK
     * @throws ApiError
     */
    public getCompanyHiStats({
        from,
        to,
        hierarchyId,
        profile,
        groupId,
    }: {
        /**
         * Start date for retrieving stats (ddMMyyyy format). If null: Today minus one month
         */
        from?: string,
        /**
         * End date for retrieving stats  (ddMMyyyy format). If null: Today
         */
        to?: string,
        /**
         * Id of the area for which you want to retrive the stats. If null, all company data is returned
         */
        hierarchyId?: string,
        /**
         * Profile filter string. If not specified, no profile filtering will be applied.
         */
        profile?: string,
        /**
         * One or more group ids for which you want to retrieve the stats. If not specified, no group filtering will be applied
         */
        groupId?: Array<string>,
    }): CancelablePromise<HIStats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/public/company/stats/hi',
            query: {
                'from': from,
                'to': to,
                'hierarchyId': hierarchyId,
                'profile': profile,
                'groupId': groupId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Retrieves the eNPS stats for the requested period
     * @returns ENPSStats OK
     * @throws ApiError
     */
    public getCompanyEnpsStats({
        from,
        to,
        hierarchyId,
        profile,
        groupId,
    }: {
        /**
         * Start date for retrieving stats (ddMMyyyy format). If null: Today minus one month
         */
        from?: string,
        /**
         * End date for retrieving stats  (ddMMyyyy format). If null: Today
         */
        to?: string,
        /**
         * Id of the area for which you want to retrive the stats. If null, all company data is returned
         */
        hierarchyId?: string,
        /**
         * Profile filter string. If not specified, no profile filtering will be applied.
         */
        profile?: string,
        /**
         * One or more group ids for which you want to retrieve the stats. If not specified, no group filtering will be applied
         */
        groupId?: Array<string>,
    }): CancelablePromise<ENPSStats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/public/company/stats/enps',
            query: {
                'from': from,
                'to': to,
                'hierarchyId': hierarchyId,
                'profile': profile,
                'groupId': groupId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Retrieves the Activation stats for the requested period
     * @returns Activation_Stats OK
     * @throws ApiError
     */
    public getCompanyActivationStats({
        from,
        to,
        hierarchyId,
        profile,
        groupId,
    }: {
        /**
         * Start date for retrieving stats (ddMMyyyy format). If null: Today minus one month
         */
        from?: string,
        /**
         * End date for retrieving stats  (ddMMyyyy format). If null: Today
         */
        to?: string,
        /**
         * Id of the area for which you want to retrive the stats. If null, all company data is returned
         */
        hierarchyId?: string,
        /**
         * Profile filter string. If not specified, no profile filtering will be applied.
         */
        profile?: string,
        /**
         * One or more group ids for which you want to retrieve the stats. If not specified, no group filtering will be applied
         */
        groupId?: Array<string>,
    }): CancelablePromise<Activation_Stats> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/public/company/stats/activation',
            query: {
                'from': from,
                'to': to,
                'hierarchyId': hierarchyId,
                'profile': profile,
                'groupId': groupId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

}
