import React from 'react'
import Note from "./Note.js"

const Home = () => {
  return (
    <div>
      <div className="container my-3">
        <h1>Add your Notes</h1>
        <form className="my-3" action="">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
        </form>
      </div>

      <Note/>

    </div>
  )
}

export default Home
