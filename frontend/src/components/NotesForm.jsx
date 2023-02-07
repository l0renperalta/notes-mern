import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../features/notes/noteSlice';

function NotesForm() {
   const [note, setNote] = useState({
      title: '',
      description: '',
   });

   const dispatch = useDispatch();

   const onChange = (e) => {
      setNote((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
   };

   const onSubmit = (e) => {
      e.preventDefault();
      dispatch(createNote(note));
      setNote({
         title: '',
         description: '',
      });
   };

   return (
      <section className="form">
         <form onSubmit={onSubmit}>
            <div className="form-group">
               <input type="text" id="title" name="title" placeholder="Note title" onChange={onChange} />
            </div>
            <div className="form-group">
               <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Note description"
                  onChange={onChange}
               />
            </div>
            <div className="form-group">
               <button type="submit" className="btn btn-block">
                  Save
               </button>
            </div>
         </form>
      </section>
   );
}

export default NotesForm;
