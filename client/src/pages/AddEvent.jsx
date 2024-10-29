import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TextField, Button, Box, Typography } from '@mui/material';
import { ADD_EVENT } from '../utils/mutations';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    date: null,
    time: '',
    image: '',
  });

  const [addEvent, { error }] = useMutation(ADD_EVENT);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEvent({
        variables: {
          input: {
            ...eventData,
            date: eventData.date ? eventData.date.toISOString() : null,
          },
        },
      });
      alert('Event added successfully!');
      setEventData({
        name: '',
        description: '',
        adddress: '',
        city: '',
        state: '',
        zip: '',
        date: null,
        time: '',
        photo: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        padding: '10px',
        flexDirection: 'column',
        gap: 3,
        maxWidth: '600px',
        margin: 'auto',
        mt: 5,
        backgroundColor: 'white'
      }}
    >
      <Typography variant='h4' component='h1' textAlign='center'>
        Add Event
      </Typography>
      <TextField
        name='name'
        label='Event Name'
        value={eventData.name}
        onChange={handleChange}
        required
      />
      <TextField
        name='description'
        label='Event Description'
        multiline
        rows={4}
        value={eventData.description}
        onChange={handleChange}
      />
      <TextField
        name='address'
        label='Event Address'
        value={eventData.address}
        onChange={handleChange}
      />
      <TextField
        name='city'
        label='City'
        value={eventData.city}
        onChange={handleChange}
      />
      <TextField
        name='state'
        label='State'
        value={eventData.state}
        onChange={handleChange}
      />
      <TextField
        name='zip'
        label='Zip'
        value={eventData.zip}
        onChange={handleChange}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label='Event Date'
          value={eventData.date}
          onChange={(newValue) =>
            setEventData({ ...eventData, date: newValue })
          }
          renderInput={(params) => (
            <TextField {...params} fullWidth margin='normal' />
          )}
        />
      </LocalizationProvider>
      <TextField
        name='time'
        label='Event Time'
        value={eventData.time}
        onChange={handleChange}
        required
      />

      <TextField
        name='image'
        label='Event Photo URL'
        value={eventData.image}
        onChange={handleChange}
      />
      <Button type='submit' variant='contained' color='primary'>
        Add Event
      </Button>
      {error && <Typography color='error'>Something went wrong...</Typography>}
    </Box>
  );
};

export default AddEvent;

  /* import * as React from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import Box from '@mui/material/Box';
import { useDemoData } from '@mui/x-data-grid-generator';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import MessageIcon from '@mui/icons-material/Message';

function MessageAction(params) {
  const handleMessage = () => {
    console.log(`send message to ${params.row.phone}`);
  };
  return (
    <IconButton aria-label="Message" onClick={handleMessage}>
      <MessageIcon />
    </IconButton>
  );
}

function ListViewCell(params) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        height: '100%',
        gap: 2,
      }}
    >
      <Avatar sx={{ width: 32, height: 32, backgroundColor: params.row.avatar }} />
      <Stack sx={{ flexGrow: 1 }}>
        <Typography variant="body2" fontWeight={500}>
          {params.row.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {params.row.position}
        </Typography>
      </Stack>
      <MessageAction {...params} />
    </Stack>
  );
}

const listColDef = {
  field: 'listColumn',
  renderCell: ListViewCell,
};

const VISIBLE_FIELDS = ['avatar', 'name', 'position'];

export default function ListView() {
  const [isListView, setIsListView] = React.useState(true);

  const { data } = useDemoData({
    dataSet: 'Employee',
    rowLength: 20,
    visibleFields: VISIBLE_FIELDS,
  });

  const columns = React.useMemo(() => {
    return [
      ...data.columns,
      {
        type: 'actions',
        field: 'actions',
        width: 75,
        getActions: (params) => [<MessageAction {...params} />],
      },
    ];
  }, [data.columns]);

  const rowHeight = isListView ? 64 : 52;

  return (
    <Box sx={{ width: '100%' }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isListView}
            onChange={(event) => setIsListView(event.target.checked)}
          />
        }
        label="Enable list view"
      />
      <Box
        sx={{
          width: '100%',
          maxWidth: isListView ? 360 : undefined,
          height: 600,
          margin: '0 auto',
        }}
      >
        <DataGridPro
          {...data}
          columns={columns}
          rowHeight={rowHeight}
          unstable_listView={isListView}
          unstable_listColumn={listColDef}
        />
      </Box>
    </Box>
  );
}







      </Button>
      {error && <Typography color='error'>Something went wrong...</Typography>}
    </Box>
  );
};

export default AddEvent; */

