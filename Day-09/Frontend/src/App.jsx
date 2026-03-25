import { useEffect, useState } from 'react'
import axios from 'axios'



 function App() {
   const [notes, setnotes] = useState([]);

   useEffect(() => {
     axios
       .get("http://localhost:3000/api/notes")
       .then((res) => {
         console.log(res.data);
         setnotes(res.data.NotesData);
       })
       .catch((err) => {
         console.log(err);
       });
   }, []); // VERY IMPORTANT



   return (
     <>
       <div className="notes">
         {notes.map((note,idx) => {
           return (
             <div key={note._id} className="note">
               <h1>{note.title}</h1>
               <p>{note.description}</p>
             </div>
           );
         })}
       </div>
     </>
   );
 }

export default App
