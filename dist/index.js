#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const api_1 = require("./api");
const generated_1 = require("./api/generated");
const program = new commander_1.Command();
program
    .name('hf-dumper')
    .description('CLI tool for dumping data from Public API')
    .version('1.0.0')
    .requiredOption('-k, --api-key <key>', 'API key for authentication');
program
    .command('employees')
    .description('Dump all employees data')
    .option('--hierarchy <ids...>', 'Filter by hierarchy IDs')
    .option('--profile <profile>', 'Filter by profile')
    .option('--group <ids...>', 'Filter by group IDs')
    .option('--activated <boolean>', 'Filter by activation status')
    .option('--deleted <boolean>', 'Filter by deletion status')
    .action(async (options) => {
    const api = new api_1.HappyforceAPI(program.opts().apiKey);
    try {
        const employees = await generated_1.EmployeesService.getEmployees(options.hierarchy, options.profile, options.group, options.activated === 'true', options.deleted === 'true');
        console.log(JSON.stringify(employees, null, 2));
    }
    catch (error) {
        console.error('Error fetching employees:', error);
        process.exit(1);
    }
});
program
    .command('hierarchy')
    .description('Dump organization hierarchy')
    .action(async () => {
    const api = new api_1.HappyforceAPI(program.opts().apiKey);
    try {
        const hierarchy = await generated_1.SegmentationService.getHierarchy();
        console.log(JSON.stringify(hierarchy, null, 2));
    }
    catch (error) {
        console.error('Error fetching hierarchy:', error);
        process.exit(1);
    }
});
program
    .command('score-stats')
    .description('Dump score stats')
    .requiredOption('-s, --score-id <id>', 'Score ID to fetch stats for')
    .option('-f, --from <date>', 'Start date (YYYY-MM-DD)')
    .option('-t, --to <date>', 'End date (YYYY-MM-DD)')
    .option('--hierarchy <id>', 'Filter by hierarchy ID')
    .option('--profile <profile>', 'Filter by profile')
    .option('--group <ids...>', 'Filter by group IDs')
    .action(async (options) => {
    const api = new api_1.HappyforceAPI(program.opts().apiKey);
    try {
        const stats = await generated_1.StatsService.getCompanyScoreStats(options.scoreId, options.from, options.to, options.hierarchy, options.profile, options.group);
        console.log(JSON.stringify(stats, null, 2));
    }
    catch (error) {
        console.error('Error fetching stats:', error);
        process.exit(1);
    }
});
program
    .command('enps-stats')
    .description('Dump eNPS (Employee Net Promoter Score) stats')
    .option('-f, --from <date>', 'Start date (YYYY-MM-DD)')
    .option('-t, --to <date>', 'End date (YYYY-MM-DD)')
    .option('--hierarchy <id>', 'Filter by hierarchy ID')
    .option('--profile <profile>', 'Filter by profile')
    .option('--group <ids...>', 'Filter by group IDs')
    .action(async (options) => {
    const api = new api_1.HappyforceAPI(program.opts().apiKey);
    try {
        const stats = await generated_1.StatsService.getCompanyEnpsStats(options.from, options.to, options.hierarchy, options.profile, options.group);
        console.log(JSON.stringify(stats, null, 2));
    }
    catch (error) {
        console.error('Error fetching eNPS stats:', error);
        process.exit(1);
    }
});
program
    .command('hi-stats')
    .description('Dump HI (Happiness Index) stats')
    .option('-f, --from <date>', 'Start date (YYYY-MM-DD)')
    .option('-t, --to <date>', 'End date (YYYY-MM-DD)')
    .option('--hierarchy <id>', 'Filter by hierarchy ID')
    .option('--profile <profile>', 'Filter by profile')
    .option('--group <ids...>', 'Filter by group IDs')
    .action(async (options) => {
    const api = new api_1.HappyforceAPI(program.opts().apiKey);
    try {
        const stats = await generated_1.StatsService.getCompanyHiStats(options.from, options.to, options.hierarchy, options.profile, options.group);
        console.log(JSON.stringify(stats, null, 2));
    }
    catch (error) {
        console.error('Error fetching HI stats:', error);
        process.exit(1);
    }
});
program.parse();
