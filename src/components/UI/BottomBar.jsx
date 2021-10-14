import React from 'react'
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";

const BottomBar = () => {
  return (
      <Paper sx={{ position: 'static', bottom: 0, left: 0, right: 0 }}>
          <BottomNavigation
              showLabels
          >
              <BottomNavigationAction label="Recents"  />
              <BottomNavigationAction label="Favorites"  />
              <BottomNavigationAction label="Archive" />
          </BottomNavigation>
      </Paper>
  )
}

export default BottomBar
