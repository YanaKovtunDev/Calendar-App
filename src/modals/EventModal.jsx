import { useState } from 'react';
import { Alert, Button, Fade, Modal, Snackbar, Stack, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import { object, string } from 'yup';
import * as moment from 'moment';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';

import { ModalContainer } from '../styles/modal';
import { DATEFORMAT, FORMTEXT } from '../constants';
import { addEvent, editEvent } from '../app/features/eventSlice';

export const EventModal = ({ open, onClose, event, date }) => {
  const dispatch = useDispatch();

  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState('success');

  const isEdit = !!event;

  const validationSchema = object({
    title: string().required(FORMTEXT.REQUIRED),
    date: string(),
    startTime: string(),
    endTime: string().test('is-greater', FORMTEXT.TIMEVALIDATION, function (value) {
      const { startTime } = this.parent;
      return moment(value, DATEFORMAT.TIME).isAfter(moment(startTime, DATEFORMAT.TIME));
    }),
    description: string(),
  });

  const initialValues = {
    title: isEdit ? event.title : '',
    date: isEdit ? event.date : date ? date : moment().format(DATEFORMAT.DATE),
    startTime: isEdit ? event.startTime : moment().format(DATEFORMAT.TIME),
    endTime: isEdit ? event.endTime : moment().add(1, 'hour').format(DATEFORMAT.TIME),
    description: isEdit ? event.description : '',
  };

  const onSubmitHandler = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      if (isEdit) {
        dispatch(editEvent({ ...values, id: event.id }));
      } else {
        const id = uuid();
        dispatch(addEvent({ ...values, id }));
      }
      setSubmitting(false);
      onClose();
      setAlertVariant('success');
      setAlertMessage('The information was updated successfully!');
    } catch (e) {
      setAlertVariant('error');
      setAlertMessage(`Error: ${e}`);
    }
  };

  return (
    <>
      <Modal open={open} onClose={() => onClose()}>
        <Fade in={open}>
          <ModalContainer>
            <Typography variant='h4' mb='2rem' textAlign='center'>
              {isEdit ? 'Edit ' : 'New '} event
            </Typography>
            <Formik
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={onSubmitHandler}
            >
              {({ handleSubmit, values, errors, handleChange, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    required
                    error={errors.title}
                    label='Title'
                    fullWidth
                    type='text'
                    name='title'
                    value={values.title}
                    onChange={handleChange}
                    helperText={errors.title || ''}
                  />
                  <TextField
                    sx={{ marginTop: '1.5rem' }}
                    label='Date'
                    fullWidth
                    type='date'
                    name='date'
                    value={values.date}
                    onChange={handleChange}
                  />

                  <Stack justifyContent='space-between' direction='row' mt='1.5rem' spacing={2}>
                    <TextField
                      sx={{ width: '50%' }}
                      label='Start time'
                      type='time'
                      name='startTime'
                      value={values.startTime}
                      onChange={handleChange}
                    />
                    <TextField
                      error={errors.endTime}
                      sx={{ width: '50%' }}
                      label='End time'
                      type='time'
                      name='endTime'
                      value={values.endTime}
                      onChange={handleChange}
                      helperText={errors.endTime || ''}
                    />
                  </Stack>

                  <TextField
                    sx={{ marginTop: '1.5rem' }}
                    label='Description'
                    name='description'
                    fullWidth
                    multiline
                    value={values.description}
                    onChange={handleChange}
                  />
                  <Stack justifyContent='space-between' direction='row' mt='3rem' spacing={2}>
                    <Button variant='outlined' sx={{ width: '50%' }} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      variant='contained'
                      sx={{ width: '50%' }}
                      onClick={handleSubmit}
                      disabled={isSubmitting || !!errors.title || !!errors.endTime}
                    >
                      Submit
                    </Button>
                  </Stack>
                </form>
              )}
            </Formik>
          </ModalContainer>
        </Fade>
      </Modal>
      <Snackbar
        open={!!alertMessage}
        autoHideDuration={4000}
        onClose={() => {
          setAlertMessage('');
          setAlertVariant('');
        }}
      >
        <Alert
          onClose={() => {
            setAlertMessage('');
            setAlertVariant('');
          }}
          severity={alertVariant}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
