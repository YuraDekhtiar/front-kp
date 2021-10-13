import React from 'react'
import {Grid, Typography} from "@mui/material";

const UserNoAvatar = (props) => {
  return (
      <Grid item
            width={100}
            height={100}
            borderRadius={100}
            sx={{
                background:"#33691E",
                textAlign:"center",
            }}
      >
          <Typography color="#fff" pt={2} variant="h2" component="h1">
              {props.userName[0]}
          </Typography>
      </Grid>
  )
}

export default UserNoAvatar
