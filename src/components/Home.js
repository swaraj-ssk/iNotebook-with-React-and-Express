import React from 'react'

const Home = () => {
  return (
    <div>
      <div className="container my-3">
        <h1>Add your Notes</h1>
        <form className="my-3" action="">
          <div className="mb-3">
            <label for="exampleFormControlInput1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
          </div>
          <div className="mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
        </form>
      </div>

      <div className="container my-3">
        <h1>Your Notes</h1>
      </div>
    </div>
  )
}

export default Home
