import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const App = () => {



  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  console.log('app is running');

  function fetchNotes() {
    axios.get('http://localhost:3000/api/notes')
      .then((res) => {
        setNotes(res.data.notes);
      })
  }

  useEffect(() => {
    fetchNotes();
  }, [])

  function submitHandler(e) {
    e.preventDefault();

    console.log(title, description);
    axios.post('http://localhost:3000/api/notes', {
      title, description
    })
      .then(res => {
        console.log(res.data);
        fetchNotes()
      })
  }

  function handleDelete(noteId) {
    console.log(noteId);
    axios.delete(`http://localhost:3000/api/notes/${noteId}`)
    .then(res=>{
      console.log(res.data);
      fetchNotes()
      
    })
    
  }

  return (
    <>
      <form className='note-create-form' onSubmit={(e) => {
        submitHandler(e)
      }}>
        <input name='title' onChange={(e) => {
          setTitle(e.target.value)
        }} value={title} type="text" placeholder='Enter Title' />
        <input name='description' onChange={(e) => {
          setDescription(e.target.value)
        }} value={description} type="text" placeholder='Enter Description' />
        <button>Create Note</button>
      </form>

      <div className="notes">
        {
          notes.map((note) => {
            return <div key={note.id} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button onClick={() => {
                handleDelete(note._id)
              }} className='delete'>delete</button>
            </div>
          })
        }
      </div>
    </>
  )
}

export default App
