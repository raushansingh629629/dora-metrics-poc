import { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useTheme } from './context/ThemeContext';
import DrawerComponent from './components/DrawerComponent';
import Home from './pages/Home';
import Analytics from './pages/Analytics';

export type PageType = 'home' | 'analytics';

export default function App() {
  const { darkMode, toggleTheme, theme } = useTheme();
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DORA Metrics Dashboard
          </Typography>
          <IconButton onClick={toggleTheme} color="inherit">
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      
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
          overflow: 'auto',
          pt: 8,
          px: 3,
          width: `calc(100% - ${drawerOpen ? 240 : 56}px)`,
          ml: `${drawerOpen ? 40 : 56}px`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          backgroundColor: theme.palette.background.default,
        }}
      >
        {currentPage === 'home' ? <Home /> : <Analytics />}
      </Box>
    </Box>
  );
}