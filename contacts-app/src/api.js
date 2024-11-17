// src/api.js
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchContacts = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response;
};

export const createContact = async (contact) => {
  const response = await axios.post(`${API_URL}/users`, contact);
  return response;
};

export const updateContact = async (id, contact) => {
  const response = await axios.put(`${API_URL}/users/${id}`, contact);
  return response;
};

export const deleteContact = async (id) => {
  await axios.delete(`${API_URL}/users/${id}`);
};