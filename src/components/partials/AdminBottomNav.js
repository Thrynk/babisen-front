import React from "react";

import {Link, useLocation} from "react-router-dom";

import { makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';

const actionNavStyles= makeStyles({
    root : {
        color: 'rgba(255, 255, 255, 0.74) !important'
    },
    selected: {
        color: '#fff !important'
    }
});

const navStyles = makeStyles({
    root: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#6200EE',
        zIndex: 2
    }
});

export default function AdminBottomNav() {
    const classesNav = navStyles();
    const classesActionNav = actionNavStyles();
    const [value, setValue] = React.useState(0);
    const location = useLocation();
    const isAdminPage = location.pathname === "/admin" || location.pathname === "/notifications";

    return(
        isAdminPage ? (
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                classes={{root: classesNav.root}}
            >
                <BottomNavigationAction
                    label="New Tounament"
                    icon={<AccountTreeOutlinedIcon/>}
                    component={Link} to="/admin" 
                    classes={{root: classesActionNav.root, selected: classesActionNav.selected}}
                />

            <BottomNavigationAction
                    label="Add Notifications"
                    icon={<AccountCircleOutlinedIcon/>}
                    component={Link} to="/notifications" />
                    classes={{root: classesActionNav.root, selected: classesActionNav.selected}}
            </BottomNavigation>
        ) : null
    );

}