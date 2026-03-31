import { useEffect, useState } from 'react'
import axios from 'axios'



 function App() {
   const [notes, setnotes] = useState([]);

   function fetchNotes(){
     axios
       .get(
         "https://backend-learning-day-02-server-deploy.onrender.com/api/notes",
       )
       .then((res) => {
         console.log(res.data);
         setnotes(res.data.NotesData);
       })
       .catch((err) => {
         console.log(err);
       });
  }

  useEffect(()=>{
    fetchNotes()
  },[])
  


   function handleSubmit(e){
    e.preventDefault()

    const {title, description} = e.target.elements

    console.log(e.target.elements)

    console.log(title.value,description.value)

    axios
      .post(
        "https://backend-learning-day-02-server-deploy.onrender.com/api/notes",
        {
          title: title.value,
          description: description.value,
        },
      )
      .then((res) => {
        console.log(res.data);

        fetchNotes();
      });
   }

   function handleDelete(noteId){
    console.log(noteId)

    axios
      .delete(
        "https://backend-learning-day-02-server-deploy.onrender.com/api/notes/" +
          noteId,
      )
      .then((res) => {
        console.log(res.data);
        fetchNotes(); // to render or dispaly all notes after deletion
      });
   }



   return (
     <>

     <form action="" className='note-create-form' onSubmit={handleSubmit} >
      <input name='title' type="text" placeholder='enter title' />
      <input name='description' type="text" placeholder='enter description' />
      <button>Create Note</button>
     </form>

       <div className="notes">
         {notes.map((note,idx) => {
           return (
             <div key={note._id} className="note">
               <h1>{note.title}</h1>
               <p>{note.description}</p>
               <button onClick={()=>{
                handleDelete(note._id)
               }}>Delete</button>
             </div>
           );
         })}
       </div>
     </>
   );
 }

export default App
