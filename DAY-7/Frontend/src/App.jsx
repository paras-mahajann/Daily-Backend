import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  
  

  const [notes, setNotes] = useState([
    {
      title: "title 1",
      description: "description 1"
    },
    {
      title: "title 2",
      description: "description 2"
    },
    {
      title: "title 3",
      description: "description 3"
    },
    {
      title: "title 4",
      description: "description 4"
    },
  ])

  axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
    setNotes(res.data.notes);
  })


  return (
    <>
      <div className="notes">
        {
          notes.map((note,idx) => {
            return <div key={idx} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
            </div>
          })
        }
      </div>
    </>
  )
}

export default App
