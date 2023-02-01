import React from 'react'

function ItemNote({ note }) {
  return (
    <div className="goal">
      <h2>{note.title}</h2> 
      <h3>{note.description}</h3>
      <div>
        {new Date(note.createdAt).toLocaleString('en-US')}
      </div>
    </div>
  )
}

export default ItemNote
