// src/App.js
import React, { useEffect, useState } from 'react';
import { fetchContacts, createContact, updateContact, deleteContact } from './api';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', mobile: '', category: '', jobRole: '' });
  const [editingContactId, setEditingContactId] = useState(null);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const { data } = await fetchContacts();
        setContacts(data);
      } catch (err) {
        setError('Failed to fetch contacts');
      } finally {
        setLoading(false);
      }
    };
    getContacts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addContact = async () => {
    try {
      const { data } = await createContact(form);
      setContacts((prevContacts) => [...prevContacts, data]);
      resetForm();
    } catch (err) {
      setError('Failed to add contact');
    }
  };

  const handleUpdateContact = async () => {
    try {
      const { data } = await updateContact(editingContactId, form);
      setContacts((prevContacts) =>
        prevContacts.map((contact) => (contact.id === data.id ? data : contact))
      );
      resetForm();
    } catch (err) {
      setError('Failed to update contact');
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id);
      setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
    } catch (err) {
      setError('Failed to delete contact');
    }
  };

  const resetForm = () => {
    setForm({ firstName: '', lastName: '', email: '', mobile: '', category: '', jobRole: '' });
    setEditingContactId(null);
  };

  const startEditing = (contact) => {
    setForm(contact);
    setEditingContactId(contact.id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Contact Management</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        editingContactId ? handleUpdateContact() : addContact();
      }}>
        <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="mobile" placeholder="Mobile No" value={form.mobile} onChange={handleChange} required />
        <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
        <input type="text" name="jobRole" placeholder="Job Role" value={form.jobRole} onChange={handleChange} required />
        <button type="submit">{editingContactId ? 'Update Contact' : 'Add Contact'}</button>
      </form>

      // Inside the contacts mapping in App.js
<ul>
  {contacts.map(contact => (
    <li key={contact.id}>
      {contact.name} - {contact.email} - {contact.phone} - {contact.address.city} - {contact.company.name}
      <button onClick={() => startEditing(contact)}>Edit</button>
      <button onClick={() => handleDeleteContact(contact.id)}>Delete</button>
    </li>
  ))}
</ul>
    </div>
  );
};

export default App;