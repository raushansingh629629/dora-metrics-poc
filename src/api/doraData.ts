import { DoraMetric } from './types';

// Static data for POC
export const fetchStaticData = (): DoraMetric[] => [
  { id: 1, repo: 'frontend', deploymentFrequency: 5, leadTime: 2, changeFailRate: 10, restoreTime: 1 },
  { id: 2, repo: 'backend', deploymentFrequency: 3, leadTime: 3, changeFailRate: 15, restoreTime: 2 },
  { id: 3, repo: 'mobile', deploymentFrequency: 7, leadTime: 1, changeFailRate: 5, restoreTime: 0.5 },
];

// Ready for API integration
export const fetchGitHubData = async (): Promise<DoraMetric[]> => {
  // Implementation for real API calls
  return [];
};