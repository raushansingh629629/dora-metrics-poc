import { Typography } from '@mui/material';

export default function Home() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Welcome to DORA Metrics Dashboard
      </Typography>
      <Typography paragraph>
        Select "Analytics" from the sidebar to view your deployment metrics.
      </Typography>
    </>
  );
}