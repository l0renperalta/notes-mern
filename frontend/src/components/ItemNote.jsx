import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote, editNote } from '../features/notes/noteSlice';

function ItemNote({ note }) {
   const [statusEdit, setStatusEdit] = useState(false);
   const [values, setValues] = useState({ title: '', description: '' });
   const dispatch = useDispatch();

   const onChange = (e) => {
      setValues((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
   };

   const handleOnKeyDown = (e) => {
      if (e.keyCode === 13 && values.title !== '' && values.description !== '') {
         dispatch(editNote({ values, noteId: note._id }));
         setStatusEdit(false);
      }
      if (e.keyCode === 13 && values.title === '' && values.description !== '') {
         dispatch(editNote({ title: note.title, description: values.description, noteId: note._id }));
         setStatusEdit(false);
      }
      if (e.keyCode === 13 && values.title !== '' && values.description === '') {
         dispatch(editNote({ title: values.title, description: note.description, noteId: note._id }));
         setStatusEdit(false);
      }
   };

   return (
      <div className="goal">
         <button type="button" onClick={() => dispatch(deleteNote(note._id))} className="close">
            X
         </button>
         {statusEdit ? (
            <div className="form-group">
               <input
                  defaultValue={note.title}
                  name="title"
                  onChange={onChange}
                  onKeyDown={(e) => handleOnKeyDown(e)}
               />
               <input
                  defaultValue={note.description}
                  name="description"
                  onChange={onChange}
                  onKeyDown={(e) => handleOnKeyDown(e)}
               />
            </div>
         ) : (
            <>
               <h2 onClick={() => setStatusEdit(true)}>{note.title}</h2>
               <h3 onClick={() => setStatusEdit(true)}>{note.description}</h3>
            </>
         )}
         <div>{new Date(note.createdAt).toLocaleString('en-US')}</div>
      </div>
   );
}

export default ItemNote;
