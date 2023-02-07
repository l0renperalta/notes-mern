import axios from 'axios';

const API_URL = '/api/notes/';

const getNotes = async (token) => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   };
   const response = await axios.get(API_URL, config);
   return response.data;
};

const createNote = async (noteData, token) => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   };
   const response = await axios.post(API_URL, noteData, config);
   return response.data;
};

const editNote = async (values, noteId, token) => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   };
   const response = await axios.put(API_URL + noteId, values, config);
   return response.data;
};

const deleteNote = async (noteId, token) => {
   const config = {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   };
   const response = await axios.delete(API_URL + noteId, config);
   console.log(response);
   return response.data;
};

const noteService = {
   getNotes,
   createNote,
   editNote,
   deleteNote,
};

export default noteService;
