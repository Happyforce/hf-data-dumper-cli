import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';
import { ENPSStats } from '../api/generated/models/ENPSStats';
import { HIStats } from '../api/generated/models/HIStats';
import { ScoreStats } from '../api/generated/models/ScoreStats';
import { Score } from '../api/generated/models/Score';
import { CollectedData } from '../utils/data-collector';
import { Activation_Stats } from '../api/generated/models/Activation_Stats';
import { Participation_Stats } from '../api';

export interface ExportOptions {
  hi?: boolean;
  enps?: boolean;
  participation?: boolean;
  activation?: boolean;
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

  generateScoresMainCSV(data: Array<ScoresCSVData>, scoresInfo: Score[]) {
    const headers = [
      'Dimension ID',
      'Dimension Type',
      'Dimension',
      'Score ID',
      'Score Name',
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
        const dateResults = scoreStats?.dateResults?.[0];
        if (!dateResults) continue;

        rows.push([
          item.dimension.id,
          item.dimension.type,
          item.dimension.name,
          scoreInfo.id,
          scoreInfo.name,
          String(dateResults.result ?? ''),
          String(dateResults.participants ?? ''),
          String(dateResults.quality ?? ''),
          String(dateResults.valuation ?? '')
        ].join(','));
      }
    }

    return rows.join('\n');
  }

  generateScoresFactorsCSV(data: Array<ScoresCSVData>, scoresInfo: Score[]) {
    const headers = [
      'Dimension ID',
      'Dimension Type',
      'Dimension',
      'Score ID',
      'Factor ID',
      'Factor Name',
      'Factor Value',
      'Participants',
      'Quality',
      'Valuation'
    ];
    const rows = [headers.join(',')];

    for (const item of data) {
      for (const scoreInfo of scoresInfo) {
        if (!scoreInfo.id) continue;
        const scoreStats = item.stats.scores?.[scoreInfo.id];
        const dateResults = scoreStats?.dateResults?.[0];
        if (!dateResults) continue;

        dateResults.factors?.forEach(factorStats => {
          const factorInfo = scoreInfo.factors?.find(f => f.id === factorStats.factorId);
          if (!factorInfo) return;

          rows.push([
            item.dimension.id,
            item.dimension.type,
            item.dimension.name,
            scoreInfo.id,
            factorInfo.id,
            factorInfo.name,
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

  generateScoresQuestionsCSV(data: Array<ScoresCSVData>, scoresInfo: Score[]) {
    const headers = [
      'Dimension ID',
      'Dimension Type',
      'Dimension',
      'Score ID',
      'Factor ID',
      'Question ID',
      'Question Title',
      'Question Value',
      'Participants'
    ];
    const rows = [headers.join(',')];

    for (const item of data) {
      for (const scoreInfo of scoresInfo) {
        if (!scoreInfo.id) continue;
        const scoreStats = item.stats.scores?.[scoreInfo.id];
        const dateResults = scoreStats?.dateResults?.[0];
        if (!dateResults) continue;

        dateResults.factors?.forEach(factorStats => {
          const factorInfo = scoreInfo.factors?.find(f => f.id === factorStats.factorId);
          if (!factorInfo) return;

          factorStats.questions?.forEach(question => {
            const questionInfo = factorInfo.questions?.find(q => q.id === question.questionId);
            rows.push([
              item.dimension.id,
              item.dimension.type,
              item.dimension.name,
              scoreInfo.id,
              factorStats.factorId,
              question.questionId,
              questionInfo?.title ?? '',
              String(question.result ?? ''),
              String(question.participants ?? '')
            ].join(','));
          });
        });
      }
    }

    return rows.join('\n');
  }

  generateParticipationCSV(data: Array<{ 
    dimension: { name: string, id: string, type: string }, 
    stats: { participation?: Participation_Stats } 
  }>) {
    const headers = [
      'Dimension ID',
      'Dimension Type',
      'Dimension',
      'Participants',
      'Lost Participants',
      'New Participants'
    ];
    const rows = [headers.join(',')];

    for (const item of data) {
      rows.push([
        item.dimension.id,
        item.dimension.type,
        item.dimension.name,
        String(item.stats.participation?.participants ?? ''),
        String(item.stats.participation?.lostParticipants ?? ''),
        String(item.stats.participation?.newParticipants ?? '')
      ].join(','));
    }

    return rows.join('\n');
  }

  generateActivationCSV(data: Array<{ 
    dimension: { name: string, id: string, type: string }, 
    stats: { activation?: Activation_Stats } 
  }>) {
    const headers = [
      'Dimension ID',
      'Dimension Type',
      'Dimension',
      'Total Activated',
      'Total Invited'
    ];
    const rows = [headers.join(',')];

    for (const item of data) {
      rows.push([
        item.dimension.id,
        item.dimension.type,
        item.dimension.name,
        String(item.stats.activation?.totalActivated ?? ''),
        String(item.stats.activation?.totalInvited ?? ''),
      ].join(','));
    }

    return rows.join('\n');
  }
}

const csvGenerators = new CSVGenerators();

export async function exportStats(results: CollectedData, options: ExportOptions) {
  const baseFileName = options.output?.replace('.csv', '') || `dumps/export_${new Date().toISOString().split('T')[0].replace(/-/g, '')}`;

  // Ensure dumps directory exists
  const dir = dirname(baseFileName);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  if (options.hi) {
    console.log('Exporting HI stats...');
    const hiData = csvGenerators.generateHiCSV(results.dimensions);
    writeFileSync(`${baseFileName}_hi.csv`, hiData);
    console.log(`✓ HI stats exported to ${baseFileName}_hi.csv`);
  }

  if (options.enps) {
    console.log('Exporting eNPS stats...');
    const enpsData = csvGenerators.generateEnpsCSV(results.dimensions);
    writeFileSync(`${baseFileName}_enps.csv`, enpsData);
    console.log(`✓ eNPS stats exported to ${baseFileName}_enps.csv`);
  }

  if (options.scores && results.scoresInfo) {
    // Main scores stats
    console.log('Exporting scores main stats...');
    const scoresData = csvGenerators.generateScoresMainCSV(results.dimensions, results.scoresInfo);
    writeFileSync(`${baseFileName}_scores.csv`, scoresData);
    console.log(`✓ All scores stats exported to ${baseFileName}_scores.csv`);

    // All factors stats
    console.log('Exporting scores factors...');
    const factorsData = csvGenerators.generateScoresFactorsCSV(results.dimensions, results.scoresInfo);
    writeFileSync(`${baseFileName}_scores_factors.csv`, factorsData);
    console.log(`✓ All scores factors exported to ${baseFileName}_scores_factors.csv`);

    // All questions results
    console.log('Exporting scores questions...');
    const questionsData = csvGenerators.generateScoresQuestionsCSV(results.dimensions, results.scoresInfo);
    writeFileSync(`${baseFileName}_scores_questions.csv`, questionsData);
    console.log(`✓ All scores questions exported to ${baseFileName}_scores_questions.csv`);
  }

  if (options.participation) {
    console.log('Exporting participation stats...');
    const participationData = csvGenerators.generateParticipationCSV(results.dimensions);
    writeFileSync(`${baseFileName}_participation.csv`, participationData);
    console.log(`✓ Participation stats exported to ${baseFileName}_participation.csv`);
  }

  if (options.activation) {
    console.log('Exporting activation stats...');
    const activationData = csvGenerators.generateActivationCSV(results.dimensions);
    writeFileSync(`${baseFileName}_activation.csv`, activationData);
    console.log(`✓ Activation stats exported to ${baseFileName}_activation.csv`);
  }

  console.log('Export completed!');
} 