/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { QuestionValue } from './QuestionValue';

/**
 * Self contained model that contains the HI stats for a certain period
 */
export type HIStats = {
    /**
     * Title of the HI question
     */
    title?: string;
    /**
     * Allowed values for the HI question
     */
    values?: Array<QuestionValue>;
    /**
     * Votes received per type during this period
     */
    ratings?: Record<string, number>;
    /**
     * Number of unique participants on the period
     */
    participants?: number;
    /**
     * HI of the given period
     */
    periodIndex?: number;
    /**
     * HI by date given period
     */
    dailyIndex?: Record<string, number>;
};

