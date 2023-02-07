import { useState, useEffect } from 'react';
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
      if (e.keyCode === 13) {
         if(values.title !== '' && values.description !== '') {
          dispatch(editNote({ values, noteId: note._id }));
          setStatusEdit(false);
         }
         if(values.title !== '' && values.description === '') {
          setValues(values['description'] = note.description);
          dispatch(editNote({ values, noteId: note._id }));
          console.log(values);
         }
         if(values.title === '' && values.description !== '') {
          setValues(values['title'] = note.title);
          dispatch(editNote({ values, noteId: note._id }));
          console.log(values);
         }

      }
      if (e.key === 'Escape') {
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
                  id="title" 
                  name="title"
                  onChange={onChange}
                  onKeyDown={(e) => handleOnKeyDown(e)}
                  autoFocus
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
               <h2 onClick={setStatusEdit} style={{cursor:'pointer'}}>{note.title}</h2>
               <h3 onClick={setStatusEdit} style={{cursor:'pointer'}}>{note.description}</h3>
            </>
         )}
         <div>{new Date(note.createdAt).toLocaleString('en-US')}</div>
      </div>
   );
}

export default ItemNote;
