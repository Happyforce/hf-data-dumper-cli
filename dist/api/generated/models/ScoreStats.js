"use strict";
/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreStats = void 0;
var ScoreStats;
(function (ScoreStats) {
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
    })(quality = ScoreStats.quality || (ScoreStats.quality = {}));
    /**
     * Valuation of the score
     */
    let valuation;
    (function (valuation) {
        valuation["NO_DATA"] = "NO_DATA";
        valuation["BAD"] = "BAD";
        valuation["WARNING"] = "WARNING";
        valuation["NEUTRAL"] = "NEUTRAL";
        valuation["GOOD"] = "GOOD";
        valuation["EXCELLENT"] = "EXCELLENT";
    })(valuation = ScoreStats.valuation || (ScoreStats.valuation = {}));
})(ScoreStats || (exports.ScoreStats = ScoreStats = {}));
