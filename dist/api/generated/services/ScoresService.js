"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoresService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class ScoresService {
    /**
     * Retrieves a list of all available scores on your account
     * The information provided by this endpoint is useful to build the filters on the score Stats API
     * @returns Score OK
     * @throws ApiError
     */
    static getCompanyScoreStats2() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/public/company/scores',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
exports.ScoresService = ScoresService;
