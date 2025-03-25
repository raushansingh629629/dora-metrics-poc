import { Typography } from '@mui/material';

export default function Home() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        DORA Metrics Dashboard
      </Typography>
      <Typography paragraph>
        Select "Analytics" from the sidebar to view metrics.
      </Typography>
    </>
  );
}