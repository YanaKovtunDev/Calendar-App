import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Paper,
  Button,
  IconButton,
  Stack,
  Fab,
} from '@mui/material';
import moment from 'moment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Add } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { ConfirmDialog } from '../components/ConfirmDialog.jsx';
import { Colors } from '../styles/theme.js';
import { EventModal } from '../modals/EventModal.jsx';
import { DATEFORMAT } from '../constants';
import { deleteEvent } from '../app/features/eventSlice';

export const DayViewPage = () => {
  const { date } = useParams();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const [openEventModal, toggleEventModal] = useState(false);
  const [openDeleteDialog, toggleDeleteDialog] = useState(false);
  const [confirmDelete, toggleConfirmDelete] = useState(false);
  const [selectingEvent, setSelectingEvent] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const filteredEvents = events.filter((event) => moment(event.date).isSame(date, 'date'));
  filteredEvents.sort((a, b) => {
    return moment(a.startTime, DATEFORMAT.TIME).diff(
      moment(b.startTime, DATEFORMAT.TIME),
      'minutes',
    );
  });

  useEffect(() => {
    if (confirmDelete) {
      dispatch(deleteEvent(selectingEvent.id));
      toggleConfirmDelete(false);
    }
  }, [confirmDelete]);

  return (
    <Box
      height='100vh'
      backgroundColor={Colors.background}
      padding='1.5rem 0'
      sx={{ overflow: 'auto' }}
    >
      <Container>
        <Link to='/' style={{ color: Colors.white, textDecoration: 'none' }}>
          {isMobile ? (
            <Fab
              variant='extended'
              color='primary'
              sx={{
                position: 'absolute',
                top: 10,
                left: 20,
              }}
            >
              <ArrowBackIosIcon sx={{ mr: 1 }} />
              Back
            </Fab>
          ) : (
            <Button variant='contained' startIcon={<ArrowBackIosIcon />}>
              Back to calendar
            </Button>
          )}
        </Link>
        <Typography
          variant='h3'
          textAlign='center'
          mb='2rem'
          sx={{ marginTop: { xs: '4rem', sm: '2rem' } }}
        >
          My events of the day
        </Typography>
        <Paper
          sx={{
            bgcolor: Colors.white,
            borderRadius: '1rem',
            padding: '2rem 1rem 1rem',
            maxWidth: { xs: '100%', md: '70%' },
            display: 'flex',
            alignItems: 'center',
            margin: '0 auto',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Stack>
            <Typography
              variant='h5'
              textAlign='center'
              color={Colors.black}
              sx={{ marginBottom: '1.5rem' }}
            >
              {moment(date).format('dddd, DD MMMM')}
            </Typography>
            {isMobile ? (
              <Fab
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  right: 20,
                  backgroundColor: Colors.secondaryDark,
                  color: Colors.white,
                }}
                onClick={() => toggleEventModal(true)}
              >
                <Add />
              </Fab>
            ) : (
              <Box textAlign='center' mb='1rem'>
                <Button
                  variant='contained'
                  onClick={() => toggleEventModal(true)}
                  startIcon={<Add />}
                  size='small'
                >
                  Add Event
                </Button>
              </Box>
            )}
          </Stack>

          <Box sx={{ width: '100%' }}>
            {!filteredEvents?.length ? (
              <Typography variant='h5' color={Colors.grayDark} textAlign='center'>
                There are no events yet
              </Typography>
            ) : (
              <List sx={{ width: '100%' }}>
                {filteredEvents.map((event, key) => (
                  <Box key={event.id}>
                    <Divider variant='inset' component='li' />
                    <ListItem
                      alignItems='flex-start'
                      sx={{ marginBottom: key !== filteredEvents.length - 1 ? '2rem' : 0 }}
                    >
                      <ListItemIcon>
                        <AccessTimeIcon />
                      </ListItemIcon>
                      <ListItemText>
                        <Box>
                          <Typography
                            variant='subtitle1'
                            fontStyle='italic'
                          >{`${event.startTime} - ${event.endTime}`}</Typography>
                          <Typography
                            variant='h5'
                            mt='.5rem'
                            color={Colors.primary}
                            fontWeight='600'
                          >
                            {event.title}
                          </Typography>
                          {event.description && (
                            <Typography mt='1rem' color={Colors.grayDark}>
                              {event.description}
                            </Typography>
                          )}
                        </Box>
                      </ListItemText>
                      <Box display='flex'>
                        <IconButton
                          sx={{ marginRight: '.5rem' }}
                          onClick={() => {
                            toggleEventModal(true);
                            setSelectingEvent(event);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color='error'
                          onClick={() => {
                            setSelectingEvent(event);
                            toggleDeleteDialog(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                  </Box>
                ))}
              </List>
            )}
          </Box>
        </Paper>
      </Container>
      <EventModal
        event={selectingEvent}
        open={openEventModal}
        onClose={() => {
          toggleEventModal(false);
          setSelectingEvent(null);
        }}
        date={date}
      />
      <ConfirmDialog
        event={selectingEvent}
        confirmAction={() => toggleConfirmDelete(true)}
        openDialog={openDeleteDialog}
        onClose={() => toggleDeleteDialog(false)}
      />
    </Box>
  );
};
