import React from 'react'
import {MenuItem, Select} from "@mui/material";

const MySelect = (props) => {
  return (
      <Select
          sx={{margin: 2, width: "50%", height:40}}
          id="demo-simple-select"
          label="Category"
          variant="standard"
          defaultValue={props.defaultValue}
          onChange={e => props.setTask({...props.task, category: e.target.value})}
      >

          <MenuItem disabled value=""><em>Категории</em></MenuItem>
          {props.categories.map((item, index) =>
              <MenuItem value={item.name}>{item.name}</MenuItem>
          )}
      </Select>
  )
}

export default MySelect
