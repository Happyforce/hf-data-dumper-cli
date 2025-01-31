/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Self contained model that contains the metadata for the eNPS
 */
export type ENPSStatsDateResultPublicDTO = {
    /**
     * Date of beginning of the measurement on this result. Usually the period is one month
     */
    date?: string;
    /**
     * The unique participants
     */
    participants?: number;
    /**
     * Result for the eNPS on that period
     */
    result?: number;
    /**
     * Result for the eNPS in average mode
     */
    averageResult?: number;
    /**
     * Number of detractors
     */
    dectractors?: number;
    /**
     * Number of neutral
     */
    neutral?: number;
    /**
     * Number of promoters
     */
    promoters?: number;
    /**
     * Quality of the measurement, based on the participation
     */
    quality?: 'NO_DATA' | 'LOW' | 'WARNING' | 'NORMAL' | 'GOOD';
    /**
     * Valuation of the eNPS
     */
    valuation?: 'NO_DATA' | 'BAD' | 'WARNING' | 'NEUTRAL' | 'GOOD' | 'EXCELLENT';
};

