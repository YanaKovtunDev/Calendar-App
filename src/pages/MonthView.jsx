import {
  Box,
  Button,
  CardActionArea,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Typography,
  Container,
  Paper,
  Fab,
} from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ArrowBackIos, ArrowForwardIos, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Colors } from '../styles/theme';
import { getMonthCalendar } from '../utils/time';
import { EventModal } from '../modals/EventModal.jsx';
import { MyCard } from '../styles/card';
import { DATEFORMAT } from '../constants';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const MonthViewPage = () => {
  const events = useSelector((state) => state.events.events);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [openModal, toggleOpenModal] = useState(false);
  const [activeDate, updateActiveDate] = useState(moment().toDate());

  const monthDays = getMonthCalendar(moment(activeDate).toDate());

  return (
    <Box
      backgroundColor={Colors.background}
      sx={{ padding: '2rem 0', overflow: 'auto' }}
      height='100vh'
    >
      <Typography variant='h3' textAlign='center' mb='2rem'>
        My Events Calendar
      </Typography>
      <Container>
        <Paper
          sx={{
            backgroundColor: Colors.white,
            borderRadius: '1rem',
            padding: '2rem 1rem 1rem',
          }}
        >
          <Stack direction='row' mb='2rem' justifyContent={{ xs: 'center', sm: 'space-between' }}>
            <Stack direction='row' alignItems='center'>
              <IconButton
                size='sm'
                onClick={() => {
                  updateActiveDate(moment(activeDate).subtract(1, 'month').toDate());
                }}
              >
                <ArrowBackIos />
              </IconButton>
              <TextField
                label='Select month'
                size='small'
                value={moment(activeDate).format('YYYY-MM')}
                type='month'
                onChange={(e) => {
                  const split = e.target.value.split('-');
                  const year = +split[0];
                  const month = +split[1];
                  if (year && month) {
                    updateActiveDate(moment(e.target.value).toDate());
                  }
                }}
              />
              <IconButton
                size='sm'
                onClick={() => {
                  updateActiveDate(moment(activeDate).add(1, 'month').toDate());
                }}
              >
                <ArrowForwardIos />
              </IconButton>
            </Stack>

            {isMobile ? (
              <Fab
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  right: 20,
                  backgroundColor: Colors.secondaryDark,
                  color: Colors.white,
                }}
                onClick={() => toggleOpenModal(true)}
              >
                <Add />
              </Fab>
            ) : (
              <Button variant='contained' onClick={() => toggleOpenModal(true)} startIcon={<Add />}>
                Add Event
              </Button>
            )}
          </Stack>
          <Box sx={{ overflow: 'auto' }}>
            <Stack direction='row' sx={{ minWidth: '46rem' }}>
              {weekDays.map((day) => (
                <Box
                  fontWeight='500'
                  key={day}
                  sx={{
                    width: `calc(${100 / 7}%)`,
                    fontSize: '1rem',
                    color: day === 'Sat' || day === 'Sun' ? Colors.grayDark : Colors.black,
                  }}
                >
                  {day}
                </Box>
              ))}
            </Stack>
            <Stack flexWrap='wrap' direction='row' mt='1rem' sx={{ minWidth: '46rem' }}>
              {monthDays?.map((day, key) => (
                <MyCard
                  key={key}
                  sx={{
                    backgroundColor: `${moment().isSame(day, 'date') && Colors.secondaryLight}`,
                  }}
                >
                  <Link
                    to={`/calendar/${moment(day).format(DATEFORMAT.DATE)}`}
                    style={{
                      color: Colors.black,
                      textDecoration: 'none',
                    }}
                  >
                    <CardActionArea
                      sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <CardContent
                        sx={{
                          padding: '.3rem .5rem',
                        }}
                      >
                        <Typography
                          variant='subtitle1'
                          fontWeight='600'
                          color={`${
                            moment().isSame(day, 'date')
                              ? Colors.secondaryDark
                              : moment(activeDate).isSame(day, 'month')
                                ? Colors.black
                                : Colors.grayDark
                          }`}
                          mb='.5rem'
                        >
                          {moment(day).format('D')}
                        </Typography>
                        <Box>
                          {events
                            ?.filter((event) => moment(event.date).isSame(day, 'date'))
                            .map((event) => (
                              <Typography
                                sx={{
                                  padding: '.2rem',
                                  backgroundColor: `${
                                    moment().isSame(day, 'date')
                                      ? Colors.white
                                      : Colors.secondaryLight
                                  }`,
                                  borderRadius: '.5rem',
                                  border: `1px solid ${Colors.secondaryDark}`,
                                }}
                                key={event.id}
                                mb='.3rem'
                              >
                                {event.title?.length > 20
                                  ? event.title.slice(0, 30) + '...'
                                  : event.title}
                              </Typography>
                            ))}
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </MyCard>
              ))}
            </Stack>
          </Box>
          <EventModal onClose={() => toggleOpenModal(false)} open={openModal} />
        </Paper>
      </Container>
    </Box>
  );
};
