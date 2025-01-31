#!/usr/bin/env node

import { Command } from 'commander';
import { HappyforceClient } from './api';

const program = new Command();

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
    const client = new HappyforceClient(program.opts().apiKey);
    try {
      const employees = await client.api.employees.getEmployees({
        hierarchyId: options.hierarchy,
        profile: options.profile,
        groupId: options.group,
        activated: options.activated === 'true',
        deleted: options.deleted === 'true'
      });
      console.log(JSON.stringify(employees, null, 2));
    } catch (error) {
      console.error('Error fetching employees:', error);
      process.exit(1);
    }
  });

program
  .command('hierarchy')
  .description('Dump organization hierarchy')
  .action(async () => {
    const client = new HappyforceClient(program.opts().apiKey);
    try {
      const hierarchy = await client.api.segmentation.getHierarchy();
      console.log(JSON.stringify(hierarchy, null, 2));
    } catch (error) {
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
    const client = new HappyforceClient(program.opts().apiKey);
    try {
      const stats = await client.api.stats.getCompanyScoreStats({
        scoreId: options.scoreId,
        from: options.from,
        to: options.to,
        hierarchyId: options.hierarchy,
        profile: options.profile,
        groupId: options.group
      });
      console.log(JSON.stringify(stats, null, 2));
    } catch (error) {
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
    const client = new HappyforceClient(program.opts().apiKey);
    try {
      const stats = await client.api.stats.getCompanyEnpsStats({
        from: options.from,
        to: options.to,
        hierarchyId: options.hierarchy,
        profile: options.profile,
        groupId: options.group
      });
      console.log(JSON.stringify(stats, null, 2));
    } catch (error) {
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
    const client = new HappyforceClient(program.opts().apiKey);
    try {
      const stats = await client.api.stats.getCompanyHiStats({
        from: options.from,
        to: options.to,
        hierarchyId: options.hierarchy,
        profile: options.profile,
        groupId: options.group
      });
      console.log(JSON.stringify(stats, null, 2));
    } catch (error) {
      console.error('Error fetching HI stats:', error);
      process.exit(1);
    }
  });

program.parse(); 