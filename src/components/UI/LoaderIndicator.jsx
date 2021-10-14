import React from 'react'
import {CircularProgress, Grid} from "@mui/material";

const LoaderIndicator = () => {
  return (
    <Grid textAlign="center">
        <CircularProgress size={150} />
    </Grid>
  )
}

export default LoaderIndicator
