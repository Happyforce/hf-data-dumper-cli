/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Self contained model that contains the metadata for a given score
 */
export type ScoreFactorStats = {
    factorId?: string;
    /**
     * Result for this factor
     */
    result?: number;
    /**
     * The unique participants
     */
    participants?: number;
    /**
     * How the votes of each participants are distributed
     */
    distribution?: Record<string, number>;
    /**
     * Quality of the measurement, based on the participation
     */
    quality?: 'NO_DATA' | 'LOW' | 'WARNING' | 'NORMAL' | 'GOOD';
    /**
     * Valuation of the factor
     */
    valuation?: 'NO_DATA' | 'BAD' | 'WARNING' | 'NEUTRAL' | 'GOOD' | 'EXCELLENT';
};

