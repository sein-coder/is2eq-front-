import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {ListItem, ListItemIcon, ListItemText, List, Collapse} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BuildIcon from '@material-ui/icons/Build';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddBoxIcon from '@material-ui/icons/AddBox';
import ViewListIcon from '@material-ui/icons/ViewList';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

export default function SideBar() {
    const classes = useStyles();
    const [openEq, setOpenEq] = React.useState(true);
    const [openUser, setOpenUser] = React.useState(true);

    const handleClickEq = () => {
        setOpenEq(!openEq);
    };

    const handleClickUser = () => {
        setOpenUser(!openUser);
    };

    return(
        <div>
            
            <ListItem button component={Link} to="/home/dashboard">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="현황"/>
            </ListItem>

            <ListItem button onClick={handleClickEq}>
            <ListItemIcon>
                <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="장비" />
            {openEq ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openEq} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem button className={classes.nested} component={Link} to="/home/eqlist">
                    <ListItemIcon>
                    <ViewListIcon />
                    </ListItemIcon>
                    <ListItemText primary="장비 리스트" />
                </ListItem>
                <ListItem button className={classes.nested} component={Link} to="/home/eqenroll">
                    <ListItemIcon>
                    <AddBoxIcon />
                    </ListItemIcon>
                    <ListItemText primary="장비 등록" />
                </ListItem>
                </List>
            </Collapse>

            <ListItem button onClick={handleClickUser}>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="유저" />
            {openUser ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openUser} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem button className={classes.nested} component={Link} to="/home/profile">
                    <ListItemIcon>
                    <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="유저 프로필" />
                </ListItem>
                </List>
            </Collapse>
        </div>
    );
};