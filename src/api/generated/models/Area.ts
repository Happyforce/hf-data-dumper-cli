/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Entity representing the information for a given area or department on your account
 */
export type Area = {
    id?: string;
    /**
     * Name of the area
     */
    name?: string;
    /**
     * sub areas under this one
     */
    children?: Array<Area>;
};

