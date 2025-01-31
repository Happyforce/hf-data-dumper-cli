import { writeFileSync } from 'fs';
import { ENPSStats } from '../api/generated/models/ENPSStats';
import { HIStats } from '../api/generated/models/HIStats';
import { ScoreStats } from '../api/generated/models/ScoreStats';
import { Score } from '../api/generated/models/Score';
import { CollectedData } from '../utils/data-collector';

export interface ExportOptions {
  hi?: boolean;
  enps?: boolean;
  scoreId?: string;
  scores?: boolean;
  from: string;
  to: string;
  hierarchies?: boolean;
  groups?: boolean;
  segments?: boolean;
  output?: string;
  allScores?: Array<Score>;
}

interface ScoreCSVData {
  dimension: { name: string; id: string; type: string };
  stats: { score?: ScoreStats };
}

interface ScoresCSVData {
  dimension: { name: string; id: string; type: string };
  stats: { scores?: Record<string, ScoreStats> };
}

class CSVGenerators {
  generateHiCSV(data: Array<{ 
    dimension: { name: string, id: string, type: string }, 
    stats: { hi?: HIStats } 
  }>) {
    const headers = ['Dimension ID', 'Dimension Type', 'Dimension', 'HI Score', 'HI Participants'];
    const rows = [headers.join(',')];

    for (const item of data) {
      rows.push([
        item.dimension.id,
        item.dimension.type,
        item.dimension.name,
        String(item.stats.hi?.periodIndex ?? ''),
        String(item.stats.hi?.participants ?? '')
      ].join(','));
    }

    return rows.join('\n');
  }

  generateEnpsCSV(data: Array<{ 
    dimension: { name: string, id: string, type: string }, 
    stats: { enps?: ENPSStats } 
  }>) {
    const headers = [
      'Dimension ID',
      'Dimension Type',
      'Dimension',
      'eNPS Score',
      'Average Score',
      'Participants',
      'Detractors',
      'Neutrals',
      'Promoters',
      'Quality',
      'Valuation'
    ];
    const rows = [headers.join(',')];

    for (const item of data) {
      rows.push([
        item.dimension.id,
        item.dimension.type,
        item.dimension.name,
        String(item.stats.enps?.result ?? ''),
        String(item.stats.enps?.averageResult ?? ''),
        String(item.stats.enps?.participants ?? ''),
        String(item.stats.enps?.dectractors ?? ''),
        String(item.stats.enps?.neutral ?? ''),
        String(item.stats.enps?.promoters ?? ''),
        String(item.stats.enps?.quality ?? ''),
        String(item.stats.enps?.valuation ?? '')
      ].join(','));
    }

    return rows.join('\n');
  }

  generateScoreCSV(data: Array<ScoreCSVData>, scoreInfo: Score) {
    const headers = [
      'Dimension ID',
      'Dimension Type',
      'Dimension',
      'Score Type',
      `${scoreInfo.name} Value`,
      'Participants',
      'Quality',
      'Valuation',
      ...(scoreInfo.factors?.map(f => f.name) ?? [])
    ];
    const rows = [headers.join(',')];

    for (const item of data) {
      // Main score row
      rows.push([
        item.dimension.id,
        item.dimension.type,
        item.dimension.name,
        'Score',
        String(item.stats.score?.result ?? ''),
        String(item.stats.score?.participants ?? ''),
        String(item.stats.score?.quality ?? ''),
        String(item.stats.score?.valuation ?? ''),
        ...(scoreInfo.factors?.map(() => '') ?? []) // Empty factor columns
      ].join(','));

      // Factor rows
      item.stats.score?.factors?.forEach(factorStats => {
        const factorInfo = scoreInfo.factors?.find(f => f.id === factorStats.factorId);
        if (!factorInfo) return;

        const factorValues = scoreInfo.factors?.map(f => 
          f.id === factorStats.factorId ? String(factorStats.result ?? '') : ''
        ) ?? [];

        rows.push([
          item.dimension.id,
          item.dimension.type,
          item.dimension.name,
          `Factor: ${factorInfo.name}`,
          String(factorStats.result ?? ''),
          String(factorStats.participants ?? ''),
          String(factorStats.quality ?? ''),
          String(factorStats.valuation ?? ''),
          ...factorValues
        ].join(','));
      });
    }

    return rows.join('\n');
  }

  generateScoresCSV(data: Array<ScoresCSVData>, scoresInfo: Score[]) {
    const headers = [
      'Dimension ID',
      'Dimension Type',
      'Dimension',
      'Score Name',
      'Score Type',
      'Score Value',
      'Participants',
      'Quality',
      'Valuation'
    ];
    const rows = [headers.join(',')];

    for (const item of data) {
      for (const scoreInfo of scoresInfo) {
        if (!scoreInfo.id) continue;
        const scoreStats = item.stats.scores?.[scoreInfo.id];
        if (!scoreStats) continue;

        // Main score row
        rows.push([
          item.dimension.id,
          item.dimension.type,
          item.dimension.name,
          scoreInfo.name,
          'Score',
          String(scoreStats.result ?? ''),
          String(scoreStats.participants ?? ''),
          String(scoreStats.quality ?? ''),
          String(scoreStats.valuation ?? '')
        ].join(','));

        // Factor rows
        scoreStats.factors?.forEach(factorStats => {
          const factorInfo = scoreInfo.factors?.find(f => f.id === factorStats.factorId);
          if (!factorInfo) return;

          rows.push([
            item.dimension.id,
            item.dimension.type,
            item.dimension.name,
            scoreInfo.name,
            `Factor: ${factorInfo.name}`,
            String(factorStats.result ?? ''),
            String(factorStats.participants ?? ''),
            String(factorStats.quality ?? ''),
            String(factorStats.valuation ?? '')
          ].join(','));
        });
      }
    }

    return rows.join('\n');
  }
}

const csvGenerators = new CSVGenerators();

export async function exportStats(results: CollectedData, options: ExportOptions) {
  const baseFileName = options.output?.replace('.csv', '') || `export_${new Date().toISOString().split('T')[0].replace(/-/g, '')}`;

  if (options.hi) {
    const hiData = csvGenerators.generateHiCSV(results.dimensions);
    writeFileSync(`${baseFileName}_hi.csv`, hiData);
    console.log(`HI stats exported to ${baseFileName}_hi.csv`);
  }

  if (options.enps) {
    const enpsData = csvGenerators.generateEnpsCSV(results.dimensions);
    writeFileSync(`${baseFileName}_enps.csv`, enpsData);
    console.log(`eNPS stats exported to ${baseFileName}_enps.csv`);
  }

  if (options.scoreId && results.scoresInfo) {
    const scoreData = csvGenerators.generateScoreCSV(results.dimensions, results.scoresInfo[0]);
    writeFileSync(`${baseFileName}_score.csv`, scoreData);
    console.log(`Score stats exported to ${baseFileName}_score.csv`);
  }

  if (options.scores && results.scoresInfo) {
    const scoresData = csvGenerators.generateScoresCSV(results.dimensions, results.scoresInfo);
    writeFileSync(`${baseFileName}_scores.csv`, scoresData);
    console.log(`All scores stats exported to ${baseFileName}_scores.csv`);
  }
} 