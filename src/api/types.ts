export interface DoraMetric {
    id: number;
    repo: string;
    deploymentFrequency: number;
    leadTime: number;
    changeFailRate: number;
    restoreTime: number;
  }