import { DoraMetric } from './types';

// Static data for POC
export const fetchStaticData = (): DoraMetric[] => [
  { id: 1, repo: 'frontend', deploymentFrequency: 5, leadTime: 2, changeFailRate: 10, restoreTime: 1 },
  { id: 2, repo: 'backend', deploymentFrequency: 3, leadTime: 3, changeFailRate: 15, restoreTime: 2 },
  { id: 3, repo: 'mobile', deploymentFrequency: 7, leadTime: 1, changeFailRate: 5, restoreTime: 0.5 },
];

// API functions (for production)
export const fetchGitHubData = async (): Promise<DoraMetric[]> => {
  /* Example:
  const response = await axios.get<GitHubDeployment[]>('https://api.github.com/repos/org/repo/deployments');
  return transformToDoraMetrics(response.data);
  */
  return [];
};

interface JenkinsBuild {
  // Define Jenkins API response structure
}

export const fetchJenkinsData = async (): Promise<DoraMetric[]> => {
  /* Jenkins API integration */
  return [];
};