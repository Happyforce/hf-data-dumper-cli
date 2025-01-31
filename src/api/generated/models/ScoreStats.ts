/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ScoreFactorStats } from './ScoreFactorStats';
import type { ScoreStatsDateResult } from './ScoreStatsDateResult';

/**
 * Self contained model that contains the stats during a period for a given score
 */
export type ScoreStats = {
    scoreId?: string;
    /**
     * Date from where the stats of this results start
     */
    from?: string;
    /**
     * Date from where the stats of this results ends
     */
    to?: string;
    /**
     * Result for the given score
     */
    result?: number;
    /**
     * The unique participants
     */
    participants?: number;
    /**
     * Results by date for the given score. (for each iteration requested)
     */
    dateResults?: Array<ScoreStatsDateResult>;
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

