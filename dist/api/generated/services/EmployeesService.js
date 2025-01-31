"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesService = void 0;
const OpenAPI_1 = require("../core/OpenAPI");
const request_1 = require("../core/request");
class EmployeesService {
    /**
     * Retrieves an employee by email
     * @param employeeEmail The email of the employee you want to retrieve
     * @returns Employee OK
     * @throws ApiError
     */
    static getEmployeeByEmail(employeeEmail) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/public/company/employees/{employeeEmail}',
            path: {
                'employeeEmail': employeeEmail,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Updates an employee email address or hierarchy for a given email address
     * @param employeeEmail The email of the employee you wish to update
     * @param requestBody
     * @returns Employee OK
     * @throws ApiError
     */
    static updateEmployeeEmail(employeeEmail, requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PUT',
            url: '/v1/public/company/employees/{employeeEmail}',
            path: {
                'employeeEmail': employeeEmail,
            },
            body: requestBody,
            mediaType: '*/*',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Deletes an employee for a given email address
     * @param employeeEmail The email of the employee you wish to delete
     * @param turnoverDate The turnover date of the employee (ddMMyyyy format)
     * @param turnoverType The type of turnover: Voluntary or involuntary
     * @returns string OK
     * @throws ApiError
     */
    static deleteEmployee(employeeEmail, turnoverDate, turnoverType) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'DELETE',
            url: '/v1/public/company/employees/{employeeEmail}',
            path: {
                'employeeEmail': employeeEmail,
            },
            query: {
                'turnoverDate': turnoverDate,
                'turnoverType': turnoverType,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Resets the employee profile for a given email address, allowing the employee to select a new are and profile when they log in on the app
     * @param requestBody
     * @returns Employee OK
     * @throws ApiError
     */
    static resetEmployee(requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'PUT',
            url: '/v1/public/company/employees/reset',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Invite an employee for a given email address
     * @param requestBody
     * @returns Employee OK
     * @throws ApiError
     */
    static inviteEmployee(requestBody) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'POST',
            url: '/v1/public/company/employees/invite',
            body: requestBody,
            mediaType: '*/*',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Retrieves all the employees
     * @param hierarchyId
     * @param profile
     * @param groupId
     * @param activated
     * @param deleted
     * @returns Employee OK
     * @throws ApiError
     */
    static getEmployees(hierarchyId, profile, groupId, activated, deleted) {
        return (0, request_1.request)(OpenAPI_1.OpenAPI, {
            method: 'GET',
            url: '/v1/public/company/employees',
            query: {
                'hierarchyId': hierarchyId,
                'profile': profile,
                'groupId': groupId,
                'activated': activated,
                'deleted': deleted,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
exports.EmployeesService = EmployeesService;
