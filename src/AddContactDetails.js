import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { Accordion, AccordionDetails, AccordionSummary, Box, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    contactNumber: Yup.string()
        .matches(/^[0-9]{10}$/, 'Contact number must be 10 digits')
        .required('Contact number is required'),
});

function AddContactDetails() {
    const [open, setOpen] = useState(false);
    const [isSubContact, setIsSubContact] = useState(false);
    const [parentId, setParentId] = useState(null);
    const [editingContact, setEditingContact] = useState(null);
    const [editingSubContact, setEditingSubContact] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [subOpen,setSubOpen] = useState(false)

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleFormSubmit = (values, { resetForm }) => {
        if (isSubContact) {
            if (editingSubContact) {
                setContacts(prevContacts =>
                    prevContacts.map(contact =>
                        contact.id === parentId
                            ? {
                                ...contact,
                                subContacts: contact.subContacts.map(subContact =>
                                    subContact.id === editingSubContact.id
                                        ? { ...values }
                                        : subContact
                                ),
                            }
                            : contact
                    )
                );
                alert('Sub-Contact updated successfully!');
            } else {
                setContacts(prevContacts =>
                    prevContacts.map(contact =>
                        contact.id === parentId
                            ? { ...contact, subContacts: [...contact.subContacts, { ...values, id: uuidv4() }] }
                            : contact
                    )
                );
                alert('Sub-Contact added successfully!');
            }
        } else {
            if (editingContact) {
                setContacts(prevContacts =>
                    prevContacts.map(contact =>
                        contact.id === editingContact.id
                            ? { ...values, subContacts: contact.subContacts }
                            : contact
                    )
                );
                alert('Contact updated successfully!');
            } else {
                setContacts([...contacts, { ...values, id: uuidv4(), subContacts: [] }]);
                alert('Contact added successfully!');
            }
        }
        resetForm();
        handleClose();
        setIsSubContact(false); 
        setEditingSubContact(null); 
    };

    const handleAddSubContact = (parentId) => {
        setIsSubContact(true);
        setParentId(parentId);
        setEditingSubContact(null); 
        setOpen(true);
    };

    const handleEdit = (contact) => {
        setIsSubContact(false);
        setEditingContact(contact);
        setOpen(true);
    };

    const handleEditSubContact = (parentId, subContact) => {
        setIsSubContact(true);
        setParentId(parentId);
        setEditingSubContact(subContact);
        setOpen(true);
    };

    const handleDelete = (id) => {
        setContacts(contacts.filter(contact => contact.id !== id));
        alert('Contact deleted successfully!');
    };

    const handleDeleteSubContact = (parentId, subContactId) => {
        setContacts(prevContacts =>
            prevContacts.map(contact =>
                contact.id === parentId
                    ? { ...contact, subContacts: contact.subContacts.filter(subContact => subContact.id !== subContactId) }
                    : contact
            )
        );
        alert('Sub-Contact deleted successfully!');
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <Button variant="contained" onClick={handleClickOpen}>
                Add Contact
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Formik
                        initialValues={{
                            name: editingContact?.name  || '',
                            contactNumber: editingContact?.contactNumber  || '',
                            id: editingContact?.id || uuidv4(),
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <h3>{editingContact?"Edit Contact Details":'Add Contact Details'}</h3>
                                <Field
                                    name="name"
                                    as={TextField}
                                    label="Name"
                                    fullWidth
                                    error={touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                    margin="dense"
                                />
                                <Field
                                    name="contactNumber"
                                    as={TextField}
                                    label="Contact Number"
                                    fullWidth
                                    error={touched.contactNumber && !!errors.contactNumber}
                                    helperText={touched.contactNumber && errors.contactNumber}
                                    margin="dense"
                                />
                                <Field
                                    name="id"
                                    as={TextField}
                                    label="ID"
                                    fullWidth
                                    disabled
                                    margin="dense"
                                />
                                <DialogActions>
                                    <Button variant="outlined" onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        type="submit"
                                        color="primary"
                                        disabled={isSubmitting}
                                    >
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
            <Dialog open={subOpen} onClose={handleClose}>
                <DialogContent>
                    <Formik
                        initialValues={{
                            name: editingSubContact?.name || '',
                            contactNumber:editingSubContact?.contactNumber || '',
                            id: editingSubContact?.id || uuidv4(),
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({ errors, touched, isSubmitting }) => (
                            <Form>
                                <h3>{editingSubContact ? 'Edit Sub-Contact' : 'Add Sub-Contact'}</h3>
                                <Field
                                    name="name"
                                    as={TextField}
                                    label="Name"
                                    fullWidth
                                    error={touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                    margin="dense"
                                />
                                <Field
                                    name="contactNumber"
                                    as={TextField}
                                    label="Contact Number"
                                    fullWidth
                                    error={touched.contactNumber && !!errors.contactNumber}
                                    helperText={touched.contactNumber && errors.contactNumber}
                                    margin="dense"
                                />
                                <Field
                                    name="id"
                                    as={TextField}
                                    label="ID"
                                    fullWidth
                                    disabled
                                    margin="dense"
                                />
                                <DialogActions>
                                    <Button variant="outlined" onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        type="submit"
                                        color="primary"
                                        disabled={isSubmitting}
                                    >
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
            <div style={{ margin: '20px auto', width: '50%' }}>
                {contacts.map((contact) => (
                    <Accordion key={contact.id} sx={{ borderRadius: 2, marginBottom: 2 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ padding: 2, backgroundColor: '#f0f0f0', borderRadius: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', gap: '30px' }}>
                                <Typography variant="h6" style={{ fontWeight: 500 }}>{contact.name}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<AddIcon />}
                                    onClick={() => handleAddSubContact(contact.id)}
                                >
                                    Add Sub-Contact
                                </Button>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails sx={{ padding: '16px', backgroundColor: '#ffffff' }}>
                            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="body1"><strong>Contact Name:</strong> {contact.name}</Typography>
                                <Typography variant="body1"><strong>Contact Number:</strong> {contact.contactNumber}</Typography>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <Button
                                        variant="contained"
                                        color="info"
                                        size="small"
                                        startIcon={<EditIcon />}
                                        onClick={() => handleEdit(contact)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDelete(contact.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                            {contact.subContacts.length > 0 && (
                                <Box mt={2}>
                                    {contact.subContacts.map((subContact) => (
                                        <Accordion key={subContact.id} sx={{ borderRadius: 2, marginBottom: 1, backgroundColor: '#f7f7f7' }}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ padding: 1, backgroundColor: '#e0e0e0' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                    <Typography variant="subtitle1">{subContact.name}</Typography>
                                                </div>
                                            </AccordionSummary>
                                            <AccordionDetails sx={{ padding: '16px', backgroundColor: '#ffffff' }}>
                                                <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                                                    <Typography variant="body1"><strong>Contact Name:</strong> {subContact.name}</Typography>
                                                    <Typography variant="body1"><strong>Contact Number:</strong> {subContact.contactNumber}</Typography>
                                                    <div style={{ display: 'flex', gap: '10px' }}>
                                                        <Button
                                                            variant="contained"
                                                            color="info"
                                                            size="small"
                                                            startIcon={<EditIcon />}
                                                            onClick={() => handleEditSubContact(contact.id, subContact)}
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            size="small"
                                                            startIcon={<DeleteIcon />}
                                                            onClick={() => handleDeleteSubContact(contact.id, subContact.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}
                                </Box>
                            )}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </div>
    ); 
}

export default AddContactDetails;
