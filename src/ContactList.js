import React, { useState } from 'react';
import { TextField, List, ListItem, ListItemText } from '@mui/material';

const contactsData = [
  { id: 1, name: 'John Doe', contactNumber: '1234567890' },
  { id: 2, name: 'Jane Smith', contactNumber: '0987654321' },
  { id: 3, name: 'Alice Johnson', contactNumber: '1112223333' },
  { id: 4, name: 'Bob Brown', contactNumber: '4445556666' },
];

function ContactList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState(contactsData);

  // Filter contacts based on searchTerm
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <TextField
        label="Search Contacts"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />
      <List>
        {filteredContacts.map(contact => (
          <ListItem key={contact.id}>
            <ListItemText primary={contact.name} secondary={contact.contactNumber} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ContactList;
