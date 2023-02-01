import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteNote } from '../features/notes/noteSlice'

function ItemNote({ note }) {

  const dispatch = useDispatch();

  return (
    <div className="goal">
      <button type="button" onClick={() => dispatch(deleteNote(note._id))} className="close">X</button>
      <h2>{note.title}</h2> 
      <h3>{note.description}</h3>
      <div>
        {new Date(note.createdAt).toLocaleString('en-US')}
      </div>
    </div>
  )
}

export default ItemNote
