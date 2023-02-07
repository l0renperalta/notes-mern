import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from './noteService';

const initialState = {
   notes: [],
   isError: false,
   isSuccess: false,
   isLoading: false,
   message: '',
};

export const getNotes = createAsyncThunk('note/getAll', async (_, thunkAPI) => {
   try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.getNotes(token);
   } catch (error) {
      const message =
         (error.response && error.response.data && error.response.data.message) ||
         error.message ||
         error.toString();
      return thunkAPI.rejectWithValue(message);
   }
});

export const createNote = createAsyncThunk('note/create', async (noteData, thunkAPI) => {
   try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.createNote(noteData, token);
   } catch (error) {
      const message =
         (error.response && error.response.data && error.response.data.message) ||
         error.message ||
         error.toString();
      return thunkAPI.rejectWithValue(message);
   }
});

export const editNote = createAsyncThunk('note/edit', async ({ values, noteId }, thunkAPI) => {
   try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.editNote(values, noteId, token);
   } catch (error) {
      const message =
         (error.response && error.response.data && error.response.data.message) ||
         error.message ||
         error.toString();
      return thunkAPI.rejectWithValue(message);
   }
});

export const deleteNote = createAsyncThunk('note/delete', async (noteId, thunkAPI) => {
   try {
      const token = thunkAPI.getState().auth.user.token;
      return await noteService.deleteNote(noteId, token);
   } catch (error) {
      const message =
         (error.response && error.response.data && error.response.data.message) ||
         error.message ||
         error.toString();
      return thunkAPI.rejectWithValue(message);
   }
});

export const noteSlice = createSlice({
   name: 'notes',
   initialState,
   reducers: {
      reset: (state) => initialState,
   },
   extraReducers: (builder) => {
      builder
         .addCase(getNotes.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getNotes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.notes = action.payload;
         })
         .addCase(getNotes.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
         })
         .addCase(createNote.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(createNote.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.notes.push(action.payload);
         })
         .addCase(createNote.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
         })
         .addCase(editNote.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(editNote.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.notes = state.notes.map((note) =>
               note._id === action.payload._id
                  ? {
                       title: action.payload.title,
                       description: action.payload.description,
                       ...action.payload,
                    }
                  : note
            );
         })
         .addCase(editNote.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
         })
         .addCase(deleteNote.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteNote.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.notes.splice(state.notes.indexOf(action.payload), 1);
         })
         .addCase(deleteNote.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
         });
   },
});

export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
