import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {MenuItem, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom";


export default function NavBar(props) {
    return (
        <AppBar position="static" color="transparent"  >
            <Toolbar variant="dense">
                <IconButton edge="start"  aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Link to="/" >
                    <MenuItem>
                        Главная
                    </MenuItem>
                </Link>
                <Link to="/tasks" >
                    <MenuItem>
                        Все задачи
                    </MenuItem>
                </Link>
                {
                    props.authenticated
                        ?
                        <>
                            <Link to="/profile" >
                                <MenuItem>
                                    Мой профиль
                                </MenuItem>
                            </Link>
                        </>
                        : <></>
                }
                <Typography sx={{ flexGrow: 1 }}/>
                {props.authenticated
                    ?
                    <Button onClick={props.onLogout}   color="primary" >Logout</Button>
                    :
                    <Link to="/login">
                        <Button color="primary" variant="contained">Login</Button>
                    </Link>
                }
            </Toolbar>
        </AppBar>
    );
}