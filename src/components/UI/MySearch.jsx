import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {IconButton} from "@mui/material";
import {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {Link} from "@mui/icons-material";

const MySearch = () => {
    let query = "";
    const history = useHistory();

    const onClick = () => {
        if(query.length > 0) {
            history.push("/search/" + query);
        }
    }

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: "#E3E3E3",
        '&:hover': {
            backgroundColor: "#F5F5F5",
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));


    return (

        <Search>
            <InputBase
                sx={{pl:2}}
                placeholder="поиск..."
                onClick={e => (e.target.value = "") }
                onChange={e => (query = e.target.value)}
            />
            <IconButton onClick={onClick}>
                <SearchIcon />
            </IconButton>
        </Search>

  )
}

export default MySearch
