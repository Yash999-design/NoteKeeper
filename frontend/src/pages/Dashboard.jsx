import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import NoteForm from '../components/NoteForm';
import NoteItem from '../components/NoteItem';
import Spinner from "../components/Spinner";
import { getNotes } from '../features/notes/noteSlice';
import { reset } from '../features/auth/autSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { notes, isLoading, isError, message } = useSelector(
    (state) => state.notes
  )

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getNotes());

    return () => {
      dispatch(reset());
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Notes Dashboard</p>
        <NoteForm />
        <section className="content">
          {notes.length > 0 ? (
            <div className="notes">
              {notes.map((note) => (
                <NoteItem key={note._id} note={note} />
              ))}
            </div>
          ) : (
            <h3>You have note set any notes</h3>
          )}
        </section>
      </section>
    </>
  )
}

export default Dashboard