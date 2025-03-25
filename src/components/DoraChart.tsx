import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Box, Typography } from '@mui/material';
import { DoraMetric } from '../api/types';

Chart.register(...registerables);

interface DoraChartProps {
  data: DoraMetric[];
  metric: keyof Omit<DoraMetric, 'id' | 'repo'>;
  title: string;
}

export default function DoraChart({ data, metric, title }: DoraChartProps) {
  const chartData = {
    labels: data.map((item) => item.repo),
    datasets: [
      {
        label: title,
        data: data.map((item) => item[metric]),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <Box sx={{ 
      mb: 4, 
      p: 2, 
      border: '1px solid #eee', 
      borderRadius: 2,
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ width: '100%', height: '300px' }}>
        <Bar data={chartData} options={options} />
      </Box>
    </Box>
  );
}