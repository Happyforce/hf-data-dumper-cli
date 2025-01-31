/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EmployeeProfile } from './EmployeeProfile';

/**
 * The details of the employee you want to invite to Happyforce
 */
export type Employee = {
    /**
     * Name of the employee
     */
    name?: string;
    /**
     * Email of the employee
     */
    email?: string;
    hierarchyId?: string;
    /**
     * Employee profile data, used for later segmentation
     */
    profile?: Array<EmployeeProfile>;
    /**
     * List of groups to which this user belongs
     */
    groupIds?: Array<string>;
};

