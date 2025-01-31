/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ENPSStatsDateResultPublicDTO } from './ENPSStatsDateResultPublicDTO';

/**
 * Self contained model that contains the stats during a period for the eNPS
 */
export type ENPSStats = {
    /**
     * Date from where the stats of this results start
     */
    from?: string;
    /**
     * Date to where the stats of this results ends
     */
    to?: string;
    /**
     * Result for the eNPS
     */
    result?: number;
    /**
     * Result for the eNPS in average mode
     */
    averageResult?: number;
    /**
     * The unique participants
     */
    participants?: number;
    /**
     * Results by date for the given score. (for each iteration requested)
     */
    dateResults?: Array<ENPSStatsDateResultPublicDTO>;
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
     * Valuation of the score
     */
    valuation?: 'NO_DATA' | 'BAD' | 'WARNING' | 'NEUTRAL' | 'GOOD' | 'EXCELLENT';
};

