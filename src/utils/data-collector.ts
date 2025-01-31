import { HappyforceClient, Score } from '../api';
import { ExportOptions } from '../csv/export';

export interface CollectedData {
  dimensions: Array<{
    dimension: any;
    stats: any;
  }>;
  scoresInfo?: Score[];
}

export async function collectData(client: HappyforceClient, options: ExportOptions): Promise<CollectedData> {
  const dimensions: any[] = [];
  
  // Get all hierarchies/groups/segments first
  const dimensionsList = await getDimensions(client, options);
  
  let scoresInfo: Score[] | undefined = undefined;

  // Get score info if needed
  if (options.scoreId) {
    const scores = await client.api.scores.getCompanyScoreStats2();
    const scoreInfo = scores.find(s => s.id === options.scoreId);
    if (scoreInfo) {
      scoresInfo = [scoreInfo];
    }
  } else if (options.scores) {
    const scores = await client.api.scores.getCompanyScoreStats2();
    scoresInfo = scores.filter(score => score.id !== undefined);
  }

  // Collect stats for each dimension
  for (const dimension of dimensionsList) {
    const stats = await getStats(client, options, dimension, scoresInfo);
    dimensions.push({
      dimension,
      stats
    });
  }
  
  return {
    dimensions,
    scoresInfo
  };
}

function flattenSegments(characteristics: any[]): any[] {
  let result: any[] = [];
  
  for (const characteristic of characteristics) {
    for (const value of characteristic.allowedValues) {
      result.push({
        id: value.id,
        name: `${characteristic.name} > ${value.label}`,
        originalName: characteristic.name,
        valueLabel: value.label
      });
    }
  }
  
  return result;
}

async function getDimensions(client: HappyforceClient, options: ExportOptions) {
  const dimensions: any[] = [];
  
  if (options.hierarchies) {
    const hierarchy = await client.api.segmentation.getHierarchy();
    dimensions.push(...flattenHierarchy(hierarchy).map(h => ({
      ...h,
      type: 'hierarchy'
    })));
  }
  
  if (options.groups) {
    const groups = await client.api.segmentation.getGroups();
    dimensions.push(...groups.map(g => ({
      ...g,
      type: 'group'
    })));
  }
  
  if (options.segments) {
    const characteristics = await client.api.segmentation.getCharacteristics();
    dimensions.push(...flattenSegments(characteristics).map(s => ({
      ...s,
      type: 'segment'
    })));
  }
  
  return dimensions;
}

function flattenHierarchy(areas: any[], parentPath = ''): any[] {
  let result: any[] = [];
  
  for (const area of areas) {
    const currentPath = parentPath ? `${parentPath} > ${area.name}` : area.name;
    result.push({
      id: area.id,
      name: currentPath
    });
    
    if (area.children?.length) {
      result = result.concat(flattenHierarchy(area.children, currentPath));
    }
  }
  
  return result;
}

async function getStats(client: HappyforceClient, options: ExportOptions, dimension: any, allScores: Score[] | undefined) {
  const stats: any = {};
  const params = {
    from: options.from,
    to: options.to,
    hierarchyId: options.hierarchies ? dimension.id : undefined,
    groupId: options.groups ? [dimension.id] : undefined,
    profile: options.segments ? dimension.id : undefined
  };

  if (options.hi) {
    try {
      stats.hi = await client.api.stats.getCompanyHiStats(params);
    } catch (error: any) {
      if (error?.body?.errorCode === 'NOT_ENOUGH_ACTIVE_EMPLOYEES') {
        stats.hi = { result: '-', participants: '-' };
      } else {
        throw error;
      }
    }
  }
  
  if (options.enps) {
    try {
      stats.enps = await client.api.stats.getCompanyEnpsStats(params);
    } catch (error: any) {
      if (error?.body?.errorCode === 'NOT_ENOUGH_ACTIVE_EMPLOYEES') {
        stats.enps = { result: '-', participants: '-', averageResult: '-', detractors: '-', neutral: '-', promoters: '-', quality: '-', valuation: '-' };
      } else {
        throw error;
      }
    }
  }
  
  if (options.scoreId && allScores?.[0]) {
    const scoreInfo = allScores[0];
    try {
      stats.score = await client.api.stats.getCompanyScoreStats({
        ...params,
        scoreId: scoreInfo.id!
      });
    } catch (error: any) {
      if (error?.body?.errorCode === 'NOT_ENOUGH_ACTIVE_EMPLOYEES') {
        stats.score = { result: '-', participants: '-', quality: '-', valuation: '-', factors: [] };
        stats.scoreInfo = scoreInfo;
      } else {
        throw error;
      }
    }
  }

  if (options.scores && allScores) {
    stats.scores = {};
    for (const scoreInfo of allScores) {
      if (!scoreInfo.id) continue;
      try {
        stats.scores[scoreInfo.id] = await client.api.stats.getCompanyScoreStats({
          ...params,
          scoreId: scoreInfo.id
        });
      } catch (error: any) {
        if (error?.body?.errorCode === 'NOT_ENOUGH_ACTIVE_EMPLOYEES') {
          stats.scores[scoreInfo.id] = { result: '-', participants: '-', quality: '-', valuation: '-', factors: [] };
        } else {
          throw error;
        }
      }
    }
  }
  return stats;
}

export { getStats, getDimensions, flattenHierarchy }; 