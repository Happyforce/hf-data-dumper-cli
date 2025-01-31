/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Employee } from '../models/Employee';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class EmployeesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Retrieves an employee by email
     * @returns Employee OK
     * @throws ApiError
     */
    public getEmployeeByEmail({
        employeeEmail,
    }: {
        /**
         * The email of the employee you want to retrieve
         */
        employeeEmail: string,
    }): CancelablePromise<Employee> {
        return this.httpRequest.request({
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
     * @returns Employee OK
     * @throws ApiError
     */
    public updateEmployeeEmail({
        employeeEmail,
        requestBody,
    }: {
        /**
         * The email of the employee you wish to update
         */
        employeeEmail: string,
        requestBody: Employee,
    }): CancelablePromise<Employee> {
        return this.httpRequest.request({
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
     * @returns string OK
     * @throws ApiError
     */
    public deleteEmployee({
        employeeEmail,
        turnoverDate,
        turnoverType,
    }: {
        /**
         * The email of the employee you wish to delete
         */
        employeeEmail: string,
        /**
         * The turnover date of the employee (ddMMyyyy format)
         */
        turnoverDate?: string,
        /**
         * The type of turnover: Voluntary or involuntary
         */
        turnoverType?: 'VOLUNTARY' | 'INVOLUNTARY' | 'OTHER',
    }): CancelablePromise<string> {
        return this.httpRequest.request({
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
     * @returns Employee OK
     * @throws ApiError
     */
    public resetEmployee({
        requestBody,
    }: {
        requestBody: Employee,
    }): CancelablePromise<Employee> {
        return this.httpRequest.request({
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
     * @returns Employee OK
     * @throws ApiError
     */
    public inviteEmployee({
        requestBody,
    }: {
        requestBody: Employee,
    }): CancelablePromise<Employee> {
        return this.httpRequest.request({
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
     * @returns Employee OK
     * @throws ApiError
     */
    public getEmployees({
        hierarchyId,
        profile,
        groupId,
        activated,
        deleted,
    }: {
        hierarchyId?: Array<string>,
        profile?: string,
        groupId?: Array<string>,
        activated?: boolean,
        deleted?: boolean,
    }): CancelablePromise<Array<Employee>> {
        return this.httpRequest.request({
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
