"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = exports.SegmentationService = exports.ScoresService = exports.EmployeesService = exports.ScoreStatsDateResult = exports.ScoreStats = exports.ScoreFactorStats = exports.Score = exports.Profile = exports.ENPSStatsDateResultPublicDTO = exports.ENPSStats = exports.OpenAPI = exports.CancelError = exports.CancelablePromise = exports.ApiError = void 0;
/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
var ApiError_1 = require("./core/ApiError");
Object.defineProperty(exports, "ApiError", { enumerable: true, get: function () { return ApiError_1.ApiError; } });
var CancelablePromise_1 = require("./core/CancelablePromise");
Object.defineProperty(exports, "CancelablePromise", { enumerable: true, get: function () { return CancelablePromise_1.CancelablePromise; } });
Object.defineProperty(exports, "CancelError", { enumerable: true, get: function () { return CancelablePromise_1.CancelError; } });
var OpenAPI_1 = require("./core/OpenAPI");
Object.defineProperty(exports, "OpenAPI", { enumerable: true, get: function () { return OpenAPI_1.OpenAPI; } });
var ENPSStats_1 = require("./models/ENPSStats");
Object.defineProperty(exports, "ENPSStats", { enumerable: true, get: function () { return ENPSStats_1.ENPSStats; } });
var ENPSStatsDateResultPublicDTO_1 = require("./models/ENPSStatsDateResultPublicDTO");
Object.defineProperty(exports, "ENPSStatsDateResultPublicDTO", { enumerable: true, get: function () { return ENPSStatsDateResultPublicDTO_1.ENPSStatsDateResultPublicDTO; } });
var Profile_1 = require("./models/Profile");
Object.defineProperty(exports, "Profile", { enumerable: true, get: function () { return Profile_1.Profile; } });
var Score_1 = require("./models/Score");
Object.defineProperty(exports, "Score", { enumerable: true, get: function () { return Score_1.Score; } });
var ScoreFactorStats_1 = require("./models/ScoreFactorStats");
Object.defineProperty(exports, "ScoreFactorStats", { enumerable: true, get: function () { return ScoreFactorStats_1.ScoreFactorStats; } });
var ScoreStats_1 = require("./models/ScoreStats");
Object.defineProperty(exports, "ScoreStats", { enumerable: true, get: function () { return ScoreStats_1.ScoreStats; } });
var ScoreStatsDateResult_1 = require("./models/ScoreStatsDateResult");
Object.defineProperty(exports, "ScoreStatsDateResult", { enumerable: true, get: function () { return ScoreStatsDateResult_1.ScoreStatsDateResult; } });
var EmployeesService_1 = require("./services/EmployeesService");
Object.defineProperty(exports, "EmployeesService", { enumerable: true, get: function () { return EmployeesService_1.EmployeesService; } });
var ScoresService_1 = require("./services/ScoresService");
Object.defineProperty(exports, "ScoresService", { enumerable: true, get: function () { return ScoresService_1.ScoresService; } });
var SegmentationService_1 = require("./services/SegmentationService");
Object.defineProperty(exports, "SegmentationService", { enumerable: true, get: function () { return SegmentationService_1.SegmentationService; } });
var StatsService_1 = require("./services/StatsService");
Object.defineProperty(exports, "StatsService", { enumerable: true, get: function () { return StatsService_1.StatsService; } });
