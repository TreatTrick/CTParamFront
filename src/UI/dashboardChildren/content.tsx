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
import { Box, Button, Toolbar } from '@mui/material';
import SearchBar from './searchBar';
import { User } from '../../functionality/interactWithBackEnd';
import EditUserDialog from './editUser';
import DeleteUserPopover from './deleteUserPopup';



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

interface Column {
  id: 'id' | 'name' | 'account' | 'telephone';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'id', minWidth: 170, },
  { id: 'name', label: 'name', minWidth: 170 },
  {
    id: 'account',
    label: 'account',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'telephone',
    label: 'telephone',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

function createData(
  id: string,
  name: string,
  account: string,
  telephone: string | undefined,
): User {
  return { id, name, account, telephone };
}

const rows = [
  createData('India', 'IN', '1324171354', '3287263'),
  createData('China', 'CN', '1403500365', '9596961'),
  createData('Italy', 'IT', '60483973', '301340'),
  createData('United States', 'US', '327167434', '9833520'),
  createData('Canada', 'CA', '37602103', '9984670'),
  createData('Australia', 'AU', '25475400', '7692024'),
  createData('Germany', 'DE', '83019200', '357578'),
  createData('Ireland', 'IE', '4857000', '70273'),
  createData('Mexico', 'MX', '126577691', '1972550'),
  createData('Japan', 'JP', '126317000', '377973'),
  createData('France', 'FR', '67022000', '640679'),
  createData('United Kingdom', 'GB', '67545757', '242495'),
  createData('Russia', 'RU', '146793744', '17098246'),
  createData('Nigeria', 'NG', '200962417', '923768'),
  createData('Brazil', 'BR', '210147125', '8515767'),
];

export default function StickyHeadTable() {

  const [selectedUser, setSelecteduser] = React.useState<User>({ id: "id", name: "name", account: "account", telephone: "telephone" });
  const [editOpen, setEditOpen] = React.useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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

  const openDeleteUserDialog = (e:React.MouseEvent<HTMLButtonElement>, user: User) => {
    setSelecteduser(user);
    setAnchorEl(e.currentTarget);
    setDeleteOpen(true);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setDeleteOpen(false);
  };

  const handleDeleteUser = () => {
    console.log('User deleted');
    setAnchorEl(null);
    setDeleteOpen(false);
  };

  const onSearch = (keyWord: string) => {

  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box margin='10px' sx={{ width: '50%', marginLeft: 'auto' }}>
        <SearchBar onSearch={onSearch} />
      </Box>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              {columns.map((column) => (
                <StyledTableCell
                  align={column.align}
                  key={column.id}
                >
                  {column.label}
                </StyledTableCell>
              ))}
              <StyledTableCell
                key={columns.length}
                align='right'
              >
                operation
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <StyledTableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number'
                          ? column.format(value)
                          : value}
                      </StyledTableCell>
                    );
                  })}
                  <StyledTableCell padding='none'
                    key={columns.length}
                    align='right'
                  >
                    <Box margin='0'>
                      <Button type='button' onClick={() => openEditUserDialog(row)}>
                        编辑
                      </Button>
                      <Button type='button' color='error' onClick={(e) => openDeleteUserDialog(e, row)}>
                        删除
                      </Button>
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <EditUserDialog key={selectedUser.id} user={selectedUser} open={editOpen} onClose={() => { setEditOpen(false) }}></EditUserDialog>
      <DeleteUserPopover anchorEl={anchorEl} open={deleteOpen} onClose={handleClosePopover} onDelete={handleDeleteUser}></DeleteUserPopover>
    </Paper>
  );
}
