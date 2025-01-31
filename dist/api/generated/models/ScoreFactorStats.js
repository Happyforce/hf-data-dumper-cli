"use strict";
/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreFactorStats = void 0;
var ScoreFactorStats;
(function (ScoreFactorStats) {
    /**
     * Quality of the measurement, based on the participation
     */
    let quality;
    (function (quality) {
        quality["NO_DATA"] = "NO_DATA";
        quality["LOW"] = "LOW";
        quality["WARNING"] = "WARNING";
        quality["NORMAL"] = "NORMAL";
        quality["GOOD"] = "GOOD";
    })(quality = ScoreFactorStats.quality || (ScoreFactorStats.quality = {}));
    /**
     * Valuation of the factor
     */
    let valuation;
    (function (valuation) {
        valuation["NO_DATA"] = "NO_DATA";
        valuation["BAD"] = "BAD";
        valuation["WARNING"] = "WARNING";
        valuation["NEUTRAL"] = "NEUTRAL";
        valuation["GOOD"] = "GOOD";
        valuation["EXCELLENT"] = "EXCELLENT";
    })(valuation = ScoreFactorStats.valuation || (ScoreFactorStats.valuation = {}));
})(ScoreFactorStats || (exports.ScoreFactorStats = ScoreFactorStats = {}));
