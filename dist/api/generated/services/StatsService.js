"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class StatsService {
    /**
     * Retrieves the Stats of a score for a given iteractions
     * @param scoreId Score from which the stats should be retrieved
     * @param from For which date from the results should be returned
     * @param to For which date to the results should be returned
     * @param hierarchyId Id of the area for which you want to retrive the stats. If null, all company data is returned
     * @param profile Profile filter string. If not specified, no profile filtering will be applied. Check examples for details
     * @param groupId One or more group ids for which you want to retrieve the stats. If not specified, no group filtering will be applied
     * @returns ScoreStats OK
     * @throws ApiError
     */
    static getCompanyScoreStats(scoreId, from, to, hierarchyId, profile, groupId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
     * @param scoreId Score from which the stats should be retrieved
     * @param from For which date from the results should be returned
     * @param to For which date to the results should be returned
     * @param hierarchyId Id of the area for which you want to retrive the stats. If null, all company data is returned
     * @param profile Profile filter string. If not specified, no profile filtering will be applied. Check examples for details
     * @param groupId One or more group ids for which you want to retrieve the stats. If not specified, no group filtering will be applied
     * @returns ScoreStats OK
     * @throws ApiError
     */
    static getCompanyScoreStats1(scoreId, from, to, hierarchyId, profile, groupId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
     * Retrieves the HI stats for the requested period
     * @param from Start date for retrieving stats (ddMMyyyy format). If null: Today minus one month
     * @param to End date for retrieving stats  (ddMMyyyy format). If null: Today
     * @param hierarchyId Id of the area for which you want to retrive the stats. If null, all company data is returned
     * @param profile Profile filter string. If not specified, no profile filtering will be applied.
     * @param groupId One or more group ids for which you want to retrieve the stats. If not specified, no group filtering will be applied
     * @returns HIStats OK
     * @throws ApiError
     */
    static getCompanyHiStats(from, to, hierarchyId, profile, groupId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
     * @param from Start date for retrieving stats (ddMMyyyy format). If null: Today minus one month
     * @param to End date for retrieving stats  (ddMMyyyy format). If null: Today
     * @param hierarchyId Id of the area for which you want to retrive the stats. If null, all company data is returned
     * @param profile Profile filter string. If not specified, no profile filtering will be applied.
     * @param groupId One or more group ids for which you want to retrieve the stats. If not specified, no group filtering will be applied
     * @returns ENPSStats OK
     * @throws ApiError
     */
    static getCompanyEnpsStats(from, to, hierarchyId, profile, groupId) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
}
exports.StatsService = StatsService;
