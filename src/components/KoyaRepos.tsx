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
  DialogContentText,
  DialogActions,
  Stack,
  Link
} from '@mui/material';
import { fetchKoyaRepos, getRepoDetails } from '../api/githubService';

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
    field: 'language', 
    headerName: 'Language', 
    width: 120,
    renderCell: (params) => (
      params.value ? (
        <Chip 
          label={params.value} 
          size="small"
          variant="outlined"
        />
      ) : null
    )
  },
  { 
    field: 'branchesCount', 
    headerName: 'Branches', 
    width: 100,
    renderCell: (params) => (
      <Chip 
        label={params.value} 
        color={
          params.value > 50 ? 'error' : 
          params.value > 30 ? 'warning' : 'success'
        }
      />
    )
  },
  { 
    field: 'lastUpdated', 
    headerName: 'Last Updated', 
    width: 150,
    valueGetter: (params) => new Date(params.value).toLocaleDateString()
  },
  { 
    field: 'url', 
    headerName: 'Actions', 
    width: 180,
    renderCell: (params) => (
      <Button 
        variant="contained" 
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          window.open(params.value, '_blank');
        }}
      >
        View
      </Button>
    )
  },
];

export default function KoyaRepos() {
  const [repos, setRepos] = useState<RepoWithBranches[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<RepoWithBranches | null>(null);
  const [repoDetails, setRepoDetails] = useState<any>(null);
  const [showBranchesFilter, setShowBranchesFilter] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchKoyaRepos(showBranchesFilter ? 30 : undefined);
      setRepos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (params: GridRowParams) => {
    setSelectedRepo(params.row);
    setRepoDetails(null);
  };

  const loadRepoDetails = async () => {
    if (!selectedRepo) return;
    try {
      const { data } = await getRepoDetails(selectedRepo.name);
      setRepoDetails(data);
    } catch (err) {
      setError('Failed to load repository details');
    }
  };

  useEffect(() => {
    loadData();
  }, [showBranchesFilter]);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" component="h2">
          Koya Organization Repositories
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant={showBranchesFilter ? 'contained' : 'outlined'}
            onClick={() => setShowBranchesFilter(!showBranchesFilter)}
            startIcon={
              <span style={{ fontSize: '0.75rem' }}>
                {showBranchesFilter ? '30+ branches' : 'All repos'}
              </span>
            }
          >
            Filter
          </Button>
          <Button
            variant="outlined"
            onClick={loadData}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Refresh
          </Button>
        </Stack>
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
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedRepo?.owner}/{selectedRepo?.name}
        </DialogTitle>
        <DialogContent>
          {repoDetails ? (
            <Stack spacing={2}>
              <DialogContentText>
                {repoDetails.description || 'No description available'}
              </DialogContentText>
              <Stack direction="row" spacing={2}>
                <Chip label={`Stars: ${repoDetails.stargazers_count}`} />
                <Chip label={`Forks: ${repoDetails.forks_count}`} />
                <Chip label={`Issues: ${repoDetails.open_issues_count}`} />
              </Stack>
              <Typography variant="body2">
                <strong>Default Branch:</strong> {repoDetails.default_branch}
              </Typography>
              <Typography variant="body2">
                <strong>Created:</strong> {new Date(repoDetails.created_at).toLocaleDateString()}
              </Typography>
              <Typography variant="body2">
                <strong>Last Push:</strong> {new Date(repoDetails.pushed_at).toLocaleString()}
              </Typography>
              <Link href={repoDetails.html_url} target="_blank" rel="noopener">
                View on GitHub
              </Link>
            </Stack>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedRepo(null)}>Close</Button>
          {!repoDetails && (
            <Button onClick={loadRepoDetails} variant="contained">
              Load Details
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}