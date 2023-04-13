import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Alert, Box, Button, Checkbox, Container, Snackbar, Toolbar, Typography } from '@mui/material';
import SearchBar from './searchBar';
import EditUserDialog from './editUser';
import DeleteUserPopover from './deleteUserPopup';
import { LoginUser, User, UserColumns } from '../../functionality/dbTypes';
import api from '../../functionality/axiosInstance';
import config from '../../functionality/frontend_config.json';
import AddUserDialog from './addUserDialog';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Tooltip from '@mui/material/Tooltip';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; import { Person } from '@mui/icons-material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#fafafa',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function StickyHeadTable() {

  const [selectedUser, setSelecteduser] = React.useState<User>({ id: "id", user_name: "account", is_admin: false });
  const [editOpen, setEditOpen] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [userList, setUserList] = React.useState<User[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openAddUserDialog, setOpenAddUserDialog] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [isTooltipOpen, setIsTooltipOpem] = React.useState(false);

  React.useEffect(() => {
    api.get(config.get_user, {
      params: {
        pagenum: page,
        pagesize: rowsPerPage
      }
    }).then((response) => {
      const ul: User[] = response.data.array.map((user: any) => ({
        id: user.id,
        user_name: user.user_name,
        nick_name: user.nick_name,
        is_admin: user.is_admin,
        telephone: user.telephone,
      }));
      setUserList(ul);
    }).catch((error) => {
      console.log(error);
    });
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openEditUserDialog = (user: User) => {
    setSelecteduser(user);
    setEditOpen(true);
  };

  const [deleteOpen, setDeleteOpen] = React.useState<boolean>(false);

  const openDeleteUserDialog = (e: React.MouseEvent<HTMLButtonElement>, user: User) => {
    setSelecteduser(user);
    setAnchorEl(e.currentTarget);
    setDeleteOpen(true);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setDeleteOpen(false);
  };

  const handleDeleteUser = () => {
    api.delete(config.delete_user + '/' + selectedUser.id)
      .then((response) => {
        setAlertMessage(response.data.msg);
        setOpenSnackbar(true);
        setUserList(userList.filter((user) => user.id !== selectedUser.id));
      })
      .catch((error) => {
        setAlertMessage(error.response.data.msg);
        setOpenSnackbar(true);
      });
    setAnchorEl(null);
    setDeleteOpen(false);
  };

  const onSearch = (keyWord: string) => {
    const filteredUserList = userList.filter((user) => {
      return Object.values(user).some((value) => {
        return value.toString().toLowerCase().includes(keyWord.toLowerCase());
      });
    });
    setUserList(filteredUserList);
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleAddUser = async (user: User) => {
    let formData = new FormData();
    formData.append('user_name', user.user_name);
    formData.append('nick_name', user.nick_name ? user.nick_name : '');
    formData.append('telephone', user.telephone ? user.telephone : '');
    formData.append('password', user.password ? user.password : '');
    formData.append('is_admin', user.is_admin ? '1' : '0');
    api.post(config.add_user, formData)
      .then((response) => {
        setAlertMessage('新增成功');
        setOpenSnackbar(true);
        setUserList([...userList, user]);
      })
      .catch((error) => {
        setAlertMessage('新增失败: ' + error.response.data.msg);
        setOpenSnackbar(true);
      });
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button sx={{ margin: '0 10px' }} variant='outlined' color='primary' onClick={() => setOpenAddUserDialog(true)}>
          新增用户
        </Button>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Box margin='10px' sx={{ width: '50%' }}>
          <SearchBar onSearch={onSearch} />
        </Box>
      </Box>

      <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              {UserColumns.map((column, index) => (
                <StyledTableCell align={column.align}
                  key={index}
                >
                  {column.label}
                </StyledTableCell>
              ))}
              <StyledTableCell
                key='isAdmin' align='center'
                sx={{ minWidth: 120 }}
              >
                是否管理员
              </StyledTableCell>
              <StyledTableCell align='right'
                key='operation'
              >
                操作
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {userList.map((row) => (
              <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {UserColumns.map((column) => {
                  const value = row[column.id];
                  return (
                    <StyledTableCell key={column.id} align={column.align}>
                      {
                        row.id === LoginUser.id && column.id === 'user_name'
                          ?
                          <Box display='flex'>
                            <Typography>{value}</Typography>
                            <Tooltip title='当前登陆用户' arrow>
                              <AdminPanelSettingsIcon sx={{ fontSize: 'middle', margin: '1px' }} />
                            </Tooltip>
                          </Box>
                          :
                          value
                      }
                    </StyledTableCell>
                  );
                })}
                <StyledTableCell padding="checkbox" align='center'>
                  {row.is_admin ? <CheckCircleIcon color='success' /> : <CancelIcon color='warning' />}
                </StyledTableCell>
                <StyledTableCell padding='none'
                  key={UserColumns.length}
                  align='right'
                >
                  <Box margin='0'>
                    <Tooltip title={row.id === LoginUser.id ? '无法编辑自身' : ''} arrow>
                      <Box component="span" display="inline" margin={0}>
                        <Button
                          disabled={row.id === LoginUser.id}
                          type="button"
                          onClick={() => openEditUserDialog(row)}
                        >
                          编辑
                        </Button>
                      </Box>
                    </Tooltip>
                    <Tooltip title={row.id === LoginUser.id ? '无法删除自身' : ''} arrow>
                      <Box component="span" display="inline" margin={0}>
                        <Button
                          disabled={row.id === LoginUser.id}
                          type="button"
                          color="error"
                          onClick={(e) => openDeleteUserDialog(e, row)}
                        >
                          删除
                        </Button>
                      </Box>
                    </Tooltip>
                    
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 25, 100]}
        component="div"
        count={userList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <EditUserDialog key={selectedUser.id} user={selectedUser} open={editOpen} onClose={() => { setEditOpen(false) }}></EditUserDialog>
      <DeleteUserPopover anchorEl={anchorEl} open={deleteOpen} onClose={handleClosePopover} onDelete={handleDeleteUser}></DeleteUserPopover>
      <AddUserDialog onSubmit={handleAddUser} onClose={() => setOpenAddUserDialog(false)} open={openAddUserDialog}></AddUserDialog>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={(e, r) => handleCloseSnackbar(e, r)}>
        <Alert onClose={(e) => handleCloseSnackbar(e)} severity="success" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
