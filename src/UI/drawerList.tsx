import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {useNavigate } from 'react-router';
import { List } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';

interface Props {
    onListItemClick: (index: number, path: string) => void;
    selectedIndex: number;
};

const DrawerListItems: React.FC<Props> = ({onListItemClick, selectedIndex}) => {

    

    return(
        <List component='nav'>
            <React.Fragment> 
                <ListItemButton 
                    selected = {selectedIndex === 0}
                    onClick = {() => onListItemClick(0, 'usermanage')}>
                <ListItemIcon>
                    <PeopleAltIcon/>
                </ListItemIcon>
                <ListItemText primary="用户管理" />
                </ListItemButton >  
                <ListItemButton 
                    selected = {selectedIndex === 1}
                    onClick = {() => onListItemClick(1, 'verify')}>
                <ListItemIcon>
                    <ListAltIcon/>
                </ListItemIcon>
                <ListItemText primary="内容审核" />
                </ListItemButton> 
                <ListItemButton 
                    selected = {selectedIndex === 2}
                    onClick = {() => onListItemClick(2, 'content')}>
                <ListItemIcon>
                    <ViewListIcon/>
                </ListItemIcon>
                <ListItemText primary="内容查寻" />
                </ListItemButton>  
                <ListItemButton 
                    selected = {selectedIndex === 3}
                    onClick = {() => onListItemClick(3, 'account')}>
                <ListItemIcon>
                    <ManageAccountsIcon/>
                </ListItemIcon>
                <ListItemText primary="账户设置" />
                </ListItemButton>
            </React.Fragment>
        </List> 
    );
} 
  export default DrawerListItems;
  
