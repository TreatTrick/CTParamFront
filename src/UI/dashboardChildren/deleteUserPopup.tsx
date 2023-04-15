import { Popover, Box, Typography, Button } from '@mui/material';

interface DeleteConfirmationProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ open, anchorEl, onClose, onDelete }) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Box p={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography gutterBottom>
          是否删除该用户？
        </Typography>
        <Box sx={{ m: 1 }} />
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Button onClick={onClose} color="primary" variant='outlined'>
            取消
          </Button>
          <Box sx={{ m: 1 }} />
          <Button onClick={onDelete} color="error" autoFocus variant='outlined'>
            删除
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};

export default DeleteConfirmation;
