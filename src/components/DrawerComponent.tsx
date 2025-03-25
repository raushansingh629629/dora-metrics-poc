import { Box, Drawer, List, IconButton } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { PageType } from '../api/types';

interface DrawerComponentProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  drawerOpen: boolean;
  toggleDrawer: () => void;
}

export default function DrawerComponent({ 
  currentPage,
  setCurrentPage,
  drawerOpen,
  toggleDrawer
}: DrawerComponentProps) {
  return (
<Drawer
  variant="permanent"
  open={drawerOpen}
  sx={{
    width: drawerOpen ? 240 : 56,
    //minWidth: 300,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: drawerOpen ? 240 : 56,
      boxSizing: 'border-box',
      position: 'relative',
      whiteSpace: 'nowrap',
      transition: (theme) => theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: 'hidden',
    },
  }}
>
      <Box sx={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '8px 8px 8px 16px',
        minHeight: '64px'
      }}>
        <IconButton onClick={toggleDrawer}>
          {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
      
      <List>
        <ListItemButton 
          onClick={() => setCurrentPage('home')}
          selected={currentPage === 'home'}
          sx={{
            minHeight: 48,
            justifyContent: drawerOpen ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 3 : 'auto' }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" sx={{ opacity: drawerOpen ? 1 : 0 }} />
        </ListItemButton>
        
        <ListItemButton 
          onClick={() => setCurrentPage('analytics')}
          selected={currentPage === 'analytics'}
          sx={{
            minHeight: 48,
            justifyContent: drawerOpen ? 'initial' : 'center',
            px: 2.5,
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: drawerOpen ? 3 : 'auto' }}>
            <AnalyticsIcon />
          </ListItemIcon>
          <ListItemText primary="Analytics" sx={{ opacity: drawerOpen ? 1 : 0 }} />
        </ListItemButton>
      </List>
    </Drawer>
  );
}