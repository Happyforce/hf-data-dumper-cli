/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProfileValue } from './ProfileValue';

/**
 * Entity representing the information for a given employee
 */
export type Profile = {
    id?: string;
    type?: 'DATE' | 'LIST' | 'BOOLEAN';
    name?: string;
    allowedValues?: Array<ProfileValue>;
};

