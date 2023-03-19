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

export default function DrawerListItems(){
    const [selectedIndex, setSelectedIndex] = React.useState<number| undefined>();

    const navigate = useNavigate();
    
    const handleListItemClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      index: number,
      path: string,
    ) => {
      setSelectedIndex(index);
      navigate(path);
    };

    return(
        <List component='nav'>
            <React.Fragment> 
                <ListItemButton 
                    selected = {selectedIndex === 0}
                    onClick = {(event) => handleListItemClick(event, 0, 'usermanage')}>
                <ListItemIcon>
                    <PeopleAltIcon/>
                </ListItemIcon>
                <ListItemText primary="用户管理" />
                </ListItemButton >  
                <ListItemButton 
                    selected = {selectedIndex === 1}
                    onClick = {(event) => handleListItemClick(event, 1, 'check')}>
                <ListItemIcon>
                    <ListAltIcon/>
                </ListItemIcon>
                <ListItemText primary="内容审核" />
                </ListItemButton> 
                <ListItemButton 
                    selected = {selectedIndex === 2}
                    onClick = {(event) => handleListItemClick(event, 2, 'content')}>
                <ListItemIcon>
                    <ViewListIcon/>
                </ListItemIcon>
                <ListItemText primary="内容查寻" />
                </ListItemButton>  
                <ListItemButton 
                    selected = {selectedIndex === 3}
                    onClick = {(event) => handleListItemClick(event, 3, 'account')}>
                <ListItemIcon>
                    <ManageAccountsIcon/>
                </ListItemIcon>
                <ListItemText primary="账户" />
                </ListItemButton>
            </React.Fragment>
        </List> 
    );
} 
    
