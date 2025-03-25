import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import DoraChart from '../components/DoraChart';
import MetricsTable from '../components/MetricsTable';
import { fetchStaticData } from '../api/doraData';
import { DoraMetric } from '../api/types';
import KoyaRepos from '../components/KoyaRepos';

export default function Analytics() {
  const [data, setData] = useState<DoraMetric[]>([]);

  useEffect(() => {
    setData(fetchStaticData());
  }, []);

  return (
    <Box>
      <KoyaRepos />  
      <MetricsTable data={data} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <DoraChart 
          data={data} 
          metric="deploymentFrequency" 
          title="Deployment Frequency (per week)" 
        />
        <DoraChart 
          data={data} 
          metric="leadTime" 
          title="Lead Time (days)" 
        />
        <DoraChart 
          data={data} 
          metric="changeFailRate" 
          title="Change Fail Rate (%)" 
        />
      </Box>
    </Box>
  );
}