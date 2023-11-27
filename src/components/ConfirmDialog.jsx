import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import moment from 'moment/moment';

export const ConfirmDialog = ({ openDialog, onClose, confirmAction, event }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog fullScreen={isMobile} open={openDialog} onClose={onClose}>
      <DialogTitle>Are you sure you want to delete this event?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This action will delete <strong>{event?.title}</strong> on{' '}
          {moment(event?.date).format('dddd, DD MMMM')}. This action is irreversible
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => onClose()}>
          Disagree
        </Button>
        <Button
          onClick={() => {
            confirmAction(true);
            onClose();
          }}
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
