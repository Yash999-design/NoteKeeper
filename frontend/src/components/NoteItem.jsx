import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteNote } from '../features/notes/noteSlice'

function NoteItem({ note }) {
  const dispatch = useDispatch();

  return (
    <div className='goal'>
      <div>{new Date(note.createdAt).toLocaleDateString("en-US")}</div>
      <h6>{note.title}</h6>
      <p>{note.content}</p>
      <button onClick={() => dispatch(deleteNote(note._id))} className='close'>X</button>
    </div>
  )
}

export default NoteItem