import React from 'react';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { createNote } from "../features/notes/noteSlice";

function NoteForm() {

  const [data, setData] = useState({
    title: "",
    content: "",
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote(data));
    setData({ title: "", content: "" });
  }

  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="">Title</label>
          <input type="text" name='title' id="title" value={data.title} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="">Content</label>
          <input type="text" name='content' id="content" value={data.content} onChange={onChange} />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type='submit'>Add Note</button>
        </div>
      </form>
    </section>
  )
}

export default NoteForm