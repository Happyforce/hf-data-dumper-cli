/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FactorDTO } from './FactorDTO';

/**
 * Self contained model that contains the metadata for a given score
 */
export type Score = {
    id?: string;
    /**
     * Which is the status for a given score
     */
    status?: 'ACTIVATED' | 'DISABLED';
    /**
     * Title of the score
     */
    name?: string;
    /**
     * Description of the score
     */
    description?: string;
    /**
     * Factors that compose this score
     */
    factors?: Array<FactorDTO>;
};

