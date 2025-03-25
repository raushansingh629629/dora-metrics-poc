import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Typography, useTheme } from '@mui/material';
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
  const theme = useTheme();

  return (
    <Box sx={{ 
      height: 400, 
      width: '100%', 
      mb: 4,
      '& .MuiDataGrid-root': {
        borderColor: theme.palette.divider,
        color: theme.palette.text.primary,
      },
      '& .MuiDataGrid-cell': {
        borderBottomColor: theme.palette.divider,
      },
      '& .MuiDataGrid-columnHeaders': {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        color: theme.palette.text.primary,
      },
      '& .MuiDataGrid-footerContainer': {
        borderTopColor: theme.palette.divider,
      },
    }}>
      <Typography variant="h6" gutterBottom sx={{ color: theme.palette.text.primary }}>
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