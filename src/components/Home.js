import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Home = () => {
  const context = useContext(noteContext);
  const {notes, setNotes}= context;
  return (
    <div>
      <div className="container my-3">
        <h1>Add your Notes</h1>
        <form className="my-3" action="">
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
        </form>
      </div>

      <div className="container my-3">
        <h1>Your Notes</h1>
        {
          notes.map((note) => {
            return note.title;
          })
        }
      </div>
    </div>
  )
}

export default Home
