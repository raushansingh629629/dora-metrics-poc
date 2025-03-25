import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Box, Typography, useTheme } from '@mui/material';
import { DoraMetric } from '../api/types';

Chart.register(...registerables);

interface DoraChartProps {
  data: DoraMetric[];
  metric: keyof Omit<DoraMetric, 'id' | 'repo'>;
  title: string;
}

export default function DoraChart({ data, metric, title }: DoraChartProps) {
  const theme = useTheme();

  const chartData = {
    labels: data.map((item) => item.repo),
    datasets: [{
      label: title,
      data: data.map((item) => item[metric]),
      backgroundColor: theme.palette.mode === 'dark' 
        ? 'rgba(100, 181, 246, 0.7)'
        : 'rgba(75, 192, 192, 0.6)',
      borderColor: theme.palette.mode === 'dark'
        ? 'rgba(100, 181, 246, 1)'
        : 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: theme.palette.text.primary,
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}`,
        },
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
      },
    },
    scales: {
      x: {
        ticks: {
          color: theme.palette.text.secondary,
        },
        grid: {
          color: theme.palette.divider,
        },
      },
      y: {
        ticks: {
          color: theme.palette.text.secondary,
        },
        grid: {
          color: theme.palette.divider,
        },
      },
    },
  };

  return (
    <Box sx={{ 
      mb: 4, 
      p: 2, 
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 2,
      backgroundColor: theme.palette.background.paper,
    }}>
      <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
        {title}
      </Typography>
      <Box sx={{ height: 300 }}>
        <Bar data={chartData} options={options} />
      </Box>
    </Box>
  );
}