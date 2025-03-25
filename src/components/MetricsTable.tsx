import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import { DoraMetric } from '../api/types';

const columns: GridColDef[] = [
  { field: 'repo', headerName: 'Repository', width: 150 },
  { field: 'deploymentFrequency', headerName: 'Deployments/Week', width: 180, type: 'number' },
  { field: 'leadTime', headerName: 'Lead Time (days)', width: 150, type: 'number' },
  { field: 'changeFailRate', headerName: 'Change Fail Rate (%)', width: 180, type: 'number' },
  { field: 'restoreTime', headerName: 'Restore Time (hours)', width: 180, type: 'number' },
];

interface MetricsTableProps {
  data: DoraMetric[];
}

export default function MetricsTable({ data }: MetricsTableProps) {
  return (
    <Box sx={{ height: 400, width: '100%', mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        DORA Metrics Overview
      </Typography>
      <DataGrid
        rows={data}
        columns={columns}
        pageSizeOptions={[5]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
      />
    </Box>
  );
}