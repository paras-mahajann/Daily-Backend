import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const App = () => {



  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editId,setEditId] = useState(null);
  const [btnValue,setBtnValue] = useState('Create Note');

  console.log('app is running');

  function fetchNotes() {
    axios.get('https://day-7-e1bv.onrender.com/api/notes')
      .then((res) => {
        setNotes(res.data.notes);
      })
  }

  useEffect(() => {
    fetchNotes();
  }, [])

  function submitHandler(e) {
    e.preventDefault();

    if(editId){
      axios.patch(`https://day-7-e1bv.onrender.com/api/notes/${editId}`,{description})
      .then(res=>{
        console.log(res.data);
        fetchNotes();
        setEditId(null);
        setTitle('');
        setDescription('');
        setBtnValue("Create Note")
      }); 
    }
    else{
      console.log(title, description);
    axios.post('https://day-7-e1bv.onrender.com/api/notes', {
      title, description
    })
      .then(res => {
        console.log(res.data);
        fetchNotes()
      })
    }
  }

  function editHandler(note){
      setTitle(note.title);
      setDescription(note.description);
      setEditId(note._id);
      setBtnValue("Update Desc");
      
  }
  function handleDelete(noteId) {
    console.log(noteId);
    axios.delete(`https://day-7-e1bv.onrender.com/api/notes/${noteId}`)
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
        <input 
        name='title' 
        onChange={(e) => {
          setTitle(e.target.value)
        }} 
        disabled = {editId!==null}
        value={title} 
        type="text" 
        placeholder='Enter Title' />

        <input name='description' onChange={(e) => {
          setDescription(e.target.value)
        }} value={description} type="text" placeholder='Enter Description' />
        <button>{btnValue}</button>
      </form>

      <div className="notes">
        {
          notes.map((note) => {
            return <div key={note.id} className="note">
              <h1>{note.title}</h1>
              <p>{note.description} <button onClick={()=>editHandler(note)} className='editBtn'>edit</button></p>
              
              <br />
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
