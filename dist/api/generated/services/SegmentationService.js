"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegmentationService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class SegmentationService {
    /**
     * Retrieves all the areas metadata and configuration available for your company in a hirarchical way
     * The information provided by this endpoint is useful to build the filters on the stats API or setup the employee profiles on the Employees API.
     * @returns Area OK
     * @throws ApiError
     */
    static getHierarchy() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static getGroups() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
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
    static getCharacteristics() {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/public/company/characteristics',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
exports.SegmentationService = SegmentationService;
