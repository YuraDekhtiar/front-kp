import React, {useEffect} from 'react'
import {Rating} from "@mui/material";
import {getTaskRating, setRating} from "../../API/TaskService";

const RatingComponent = (props) => {

    return (
        <Rating
            name="task-rating"
            value={props.value}
            readOnly={!props.authenticated}
            onChange={e => props.onChange(e)}
        />
      )
}

export default RatingComponent
