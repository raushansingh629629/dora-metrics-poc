import { useState } from 'react';
import { Box  } from '@mui/material';
import DrawerComponent from './components/DrawerComponent';
import Home from './pages/Home';
import Analytics from './pages/Analytics';
import { PageType } from './api/types';

// src/App.tsx
// src/App.tsx
export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ 
      display: 'flex',
      height: '100vh',
      overflow: 'hidden' // Prevent double scrollbars
    }}>
      <DrawerComponent 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
      />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          height: '100%',
          overflowY: 'auto', // Only scroll the content area
          p: 3,
          width: `calc(100% - ${drawerOpen ? 240 : 56}px)`,
          ml: `${drawerOpen ? 40 : 56}px`,
          transition: (theme) => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
        }}
      >
        {currentPage === 'home' ? <Home /> : <Analytics />}
      </Box>
    </Box>
  );
}