import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_EVENTS } from '../utils/queries';
import { UPDATE_EVENT } from '../utils/mutations';
import AddEventModal from './AddEventModal'; // Assume this is your modal for adding events

const AdminEvents = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_EVENTS);
  const [updateEvent] = useMutation(UPDATE_EVENT);
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({});
  const [message, setMessage] = useState('');

  const handleEditClick = (event) => {
    setIsEditing(event.id);
    setEditData(event); // Populate edit data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async (eventId) => {
    try {
      await updateEvent({ variables: { updateEventId: eventId, input: editData } });
      setMessage('Changes saved!');
      refetch(); // Refetch the events to get the latest data
      setIsEditing(null); // Close edit mode
    } catch (err) {
      console.error(err);
      setMessage('Error saving changes.');
    }
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error.message}</p>;

  return (
    <div>
      <h1>Admin Events</h1>
      <button onClick={() => setIsEditing('add')}>Add Event</button>
      {message && <p>{message}</p>}
      <div className="event-list">
        {data.events.map((event) => (
          <div key={event.id} className="event-card">
            {isEditing === event.id ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  placeholder="Event Name"
                />
                <input
                  type="text"
                  name="description"
                  value={editData.description}
                  onChange={handleChange}
                  placeholder="Description"
                />
                <input
                  type="text"
                  name="city"
                  value={editData.city}
                  onChange={handleChange}
                  placeholder="City"
                />
                <input
                  type="text"
                  name="state"
                  value={editData.state}
                  onChange={handleChange}
                  placeholder="State"
                />
                <input
                  type="text"
                  name="address"
                  value={editData.address}
                  onChange={handleChange}
                  placeholder="Address"
                />
                <input
                  type="text"
                  name="zip"
                  value={editData.zip}
                  onChange={handleChange}
                  placeholder="ZIP Code"
                />
                <input
                  type="text"
                  name="time"
                  value={editData.time}
                  onChange={handleChange}
                  placeholder="Time"
                />
                <input
                  type="text"
                  name="date"
                  value={editData.date}
                  onChange={handleChange}
                  placeholder="Date"
                />
                <input
                  type="text"
                  name="image"
                  value={editData.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                />
                <button onClick={() => handleSaveChanges(event.id)}>Save Changes</button>
                <button onClick={() => setIsEditing(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h2>{event.name}</h2>
                <p>{event.description}</p>
                <p>Location: {event.city}, {event.state}</p>
                <p>Date: {event.date}</p>
                <img src={event.image} alt={event.name} style={{ width: '100px', height: '100px' }} />
                <button onClick={() => handleEditClick(event)}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isEditing === 'add' && <AddEventModal onClose={() => setIsEditing(null)} refetch={refetch} />}
    </div>
  );
};

export default AdminEvents;

