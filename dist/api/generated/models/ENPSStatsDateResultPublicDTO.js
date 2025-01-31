"use strict";
/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENPSStatsDateResultPublicDTO = void 0;
var ENPSStatsDateResultPublicDTO;
(function (ENPSStatsDateResultPublicDTO) {
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
    })(quality = ENPSStatsDateResultPublicDTO.quality || (ENPSStatsDateResultPublicDTO.quality = {}));
    /**
     * Valuation of the eNPS
     */
    let valuation;
    (function (valuation) {
        valuation["NO_DATA"] = "NO_DATA";
        valuation["BAD"] = "BAD";
        valuation["WARNING"] = "WARNING";
        valuation["NEUTRAL"] = "NEUTRAL";
        valuation["GOOD"] = "GOOD";
        valuation["EXCELLENT"] = "EXCELLENT";
    })(valuation = ENPSStatsDateResultPublicDTO.valuation || (ENPSStatsDateResultPublicDTO.valuation = {}));
})(ENPSStatsDateResultPublicDTO || (exports.ENPSStatsDateResultPublicDTO = ENPSStatsDateResultPublicDTO = {}));
