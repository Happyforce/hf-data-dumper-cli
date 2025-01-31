/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ScoreFactorStats } from './ScoreFactorStats';

/**
 * Self contained model that contains the metadata for a given score
 */
export type ScoreStatsDateResult = {
    /**
     * Date of beginning of the measurement on this result. Usually the period is one month
     */
    date?: string;
    /**
     * The unique participants
     */
    participants?: number;
    /**
     * Result for the given score on that period
     */
    result?: number;
    /**
     * How the votes of each participants are distributed
     */
    distribution?: Record<string, number>;
    /**
     * Individual results for each factor composing the score
     */
    factors?: Array<ScoreFactorStats>;
    /**
     * Quality of the measurement, based on the participation
     */
    quality?: 'NO_DATA' | 'LOW' | 'WARNING' | 'NORMAL' | 'GOOD';
    /**
     * Valuation of the score
     */
    valuation?: 'NO_DATA' | 'BAD' | 'WARNING' | 'NEUTRAL' | 'GOOD' | 'EXCELLENT';
};

