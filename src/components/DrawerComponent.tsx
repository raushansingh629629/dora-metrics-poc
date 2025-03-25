import { Drawer, List, Box, IconButton, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useTheme } from '../context/ThemeContext';
import { PageType } from '../App';

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
  const { theme } = useTheme();

  return (
    <Drawer
      variant="permanent"
      open={drawerOpen}
      sx={{
        width: drawerOpen ? 240 : 56,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerOpen ? 240 : 56,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          transition: theme.transitions.create('width', {
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
        p: 1,
        height: 64
      }}>
        <IconButton onClick={toggleDrawer}>
          {drawerOpen ? <ChevronLeft /> : <ChevronRight />}
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