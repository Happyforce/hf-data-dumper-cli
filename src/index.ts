#!/usr/bin/env node

import { Command } from 'commander';
import { HappyforceClient } from './api';
import { writeFileSync } from 'fs';
import { parse as parsePath } from 'path';
import { ExportOptions, exportStats } from './csv/export';
import { collectData } from './utils/data-collector';
import { checkForUpdates, updateTool } from './utils/update-checker';

const program = new Command();

program
  .name('hf-dumper')
  .description('CLI tool for dumping data from Public API')
  .version('1.0.0')
  .requiredOption('-k, --api-key <key>', 'API key for authentication');

program
  .command('update')
  .description('Update to the latest version')
  .action(updateTool);

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
  .option('-f, --from <date>', 'Start date (ddMMyyyy format)')
  .option('-t, --to <date>', 'End date (ddMMyyyy format)')
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
  .option('-f, --from <date>', 'Start date (ddMMyyyy format)')
  .option('-t, --to <date>', 'End date (ddMMyyyy format)')
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
  .option('-f, --from <date>', 'Start date (ddMMyyyy format)')
  .option('-t, --to <date>', 'End date (ddMMyyyy format)')
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

program
  .command('export')
  .description('Export stats data to CSV')
  .option('--hi', 'Export Happiness Index stats')
  .option('--enps', 'Export eNPS stats')
  .option('--score-id <id>', 'Export specific score stats')
  .option('--scores', 'Export all scores stats')
  .requiredOption('--from <date>', 'Start date (ddMMyyyy format)')
  .requiredOption('--to <date>', 'End date (ddMMyyyy format)')
  .option('--hierarchies', 'Export data by hierarchies')
  .option('--groups', 'Export data by groups')
  .option('--segments', 'Export data by segments')
  .option('-o, --output <file>', 'Output file path (defaults to export_YYYYMMDD.csv)')
  .action(async (options: ExportOptions) => {
    const client = new HappyforceClient(program.opts().apiKey);
    
    try {
      // Validate that at least one stat type is selected
      if (!options.hi && !options.enps && !options.scoreId && !options.scores) {
        throw new Error('Please specify at least one stat type to export (--hi, --enps, --score-id, or --scores)');
      }

      // Can't use both --score-id and --scores
      if (options.scoreId && options.scores) {
        throw new Error('Cannot use both --score-id and --scores options together');
      }

      // Validate that at least one grouping is selected
      if (!options.hierarchies && !options.groups && !options.segments) {
        throw new Error('Please specify at least one grouping method (--hierarchies, --groups, or --segments)');
      }

      const results = await collectData(client, options);
      await exportStats(results, options);
    } catch (error) {
      console.error('Error exporting data:', error);
      process.exit(1);
    }
  });

// Check for updates on every run (except update command)
if (process.argv[2] !== 'update') {
  checkForUpdates();
}

program.parse(); 