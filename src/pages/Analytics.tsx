import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DoraChart from '../components/DoraChart';
import MetricsTable from '../components/MetricsTable';
import { fetchStaticData } from '../api/doraData';
import { DoraMetric } from '../api/types';

// src/pages/Analytics.tsx
export default function Analytics() {
    const [data, setData] = useState<DoraMetric[]>([]);
  
    useEffect(() => {
      setData(fetchStaticData());
    }, []);
  
    return (
      <Box sx={{ 
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        pb: 2 // Add some padding at bottom
      }}>
        <Typography variant="h4" gutterBottom>
          DORA Metrics Analytics
        </Typography>
        
        <MetricsTable data={data} />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3,
          width: '100%',
          maxWidth: '100%',
          overflow: 'hidden'
        }}>
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