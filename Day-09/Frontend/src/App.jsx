import { useState } from 'react'



function App() {

  const [notes, setnotes] = useState([
    {
      title: "test title 1",
      description: "test description",
    },
    {
      title: "test title 2",
      description: "test description",
    },
    {
      title: "test title 3",
      description: "test description",
    },
    {
      title: "test title 4",
      description: "test description",
    },
  ]);

  return (
    <>
    <div className='notes'>
      {notes.map((note)=>{
        return <div className='note'>
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
