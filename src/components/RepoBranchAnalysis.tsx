// src/components/RepoBranchAnalysis.tsx
import { useState, useEffect } from 'react';
import { 
  DataGrid, 
  GridColDef, 
  GridToolbar,
  GridRowParams
} from '@mui/x-data-grid';
import { 
  Box, 
  Typography, 
  Button, 
  Chip, 
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { fetchReposWithManyBranches, getExactBranchCount } from '../api/githubService';
import { RepoWithBranches } from '../interfaces/interface';

const columns: GridColDef[] = [
  { 
    field: 'name', 
    headerName: 'Repository', 
    width: 200,
    renderCell: (params) => (
      <Typography fontWeight="medium">{params.value}</Typography>
    )
  },
  { 
    field: 'owner', 
    headerName: 'Owner', 
    width: 150 
  },
  { 
    field: 'branchesCount', 
    headerName: 'Branches', 
    width: 120,
    renderCell: (params) => (
      <Chip 
        label={params.value} 
        color={
          params.value > 50 ? 'error' : 
          params.value > 30 ? 'warning' : 'success'
        } 
        variant="outlined"
      />
    )
  },
  { 
    field: 'url', 
    headerName: 'Actions', 
    width: 200,
    renderCell: (params) => (
      <Button 
        variant="contained" 
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          window.open(params.value, '_blank');
        }}
        sx={{ textTransform: 'none' }}
      >
        View Repository
      </Button>
    )
  },
];

export default function RepoBranchAnalysis() {
  const [repos, setRepos] = useState<RepoWithBranches[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [minBranches, setMinBranches] = useState(30);
  const [selectedRepo, setSelectedRepo] = useState<RepoWithBranches | null>(null);
  const [exactCount, setExactCount] = useState<number | null>(null);
  const [countLoading, setCountLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchReposWithManyBranches(minBranches);
      setRepos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (params: GridRowParams) => {
    setSelectedRepo(params.row as RepoWithBranches);
    setExactCount(null);
  };

  const fetchExactCount = async () => {
    if (!selectedRepo) return;
    setCountLoading(true);
    try {
      const count = await getExactBranchCount(selectedRepo.owner, selectedRepo.name);
      setExactCount(count);
    } catch (err) {
      setError('Failed to get exact branch count');
    } finally {
      setCountLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [minBranches]);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="h2">
          Repository Branch Analysis
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant={minBranches === 30 ? 'contained' : 'outlined'}
            onClick={() => setMinBranches(30)}
            disabled={loading}
          >
            30+ Branches
          </Button>
          <Button
            variant={minBranches === 50 ? 'contained' : 'outlined'}
            onClick={() => setMinBranches(50)}
            disabled={loading}
          >
            50+ Branches
          </Button>
          <Button
            variant="outlined"
            onClick={loadData}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ flex: 1 }}>
        <DataGrid
          rows={repos}
          columns={columns}
          loading={loading}
          onRowClick={handleRowClick}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          sx={{
            '& .MuiDataGrid-row': {
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            },
          }}
        />
      </Box>

      {/* Repository Details Dialog */}
      <Dialog 
        open={!!selectedRepo} 
        onClose={() => setSelectedRepo(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedRepo?.owner}/{selectedRepo?.name}
        </DialogTitle>
        <DialogContent>
          {exactCount !== null ? (
            <Typography variant="body1" paragraph>
              Exact branch count: <strong>{exactCount}</strong>
            </Typography>
          ) : (
            <Typography variant="body1" paragraph>
              Estimated branches: <strong>{selectedRepo?.branchesCount}+</strong>
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            Note: Initial scan only checks for {minBranches}+ branches for performance.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={fetchExactCount} 
            disabled={countLoading}
            startIcon={countLoading ? <CircularProgress size={20} /> : null}
          >
            Get Exact Count
          </Button>
          <Button 
            onClick={() => window.open(selectedRepo?.url, '_blank')}
            variant="contained"
          >
            Open in GitHub
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}