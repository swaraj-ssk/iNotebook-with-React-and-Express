//We want state which is accesible for all.
import { useState } from "react";
import NoteContext from "./noteContext"; //imported Note context

const NoteState = (props) => {

  const host = "http://localhost:7789"

  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ZTAyMGQzZjgxOGE0ODQ1M2IzOWM2In0sImlhdCI6MTcxOTY0ODY3MX0.OcS9-tDoiqIKGFVrxAB84GcXcQ89Xut9KBBSCP3IptI"

  const data = [];

  const [notes, setNotes] = useState(data)

  //Get all notes function
  const getNotes = async () => {
    // Api call to add note
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': authToken
        }
      }
      )
      const json = await response.json();
      console.log(json);
      setNotes(json)
    } catch (error) {
      console.log("Error in app")
    }

  }

  //Add note function
  const addNote = async (title, description, tag) => {
    // Api call to add note
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ZTAyMGQzZjgxOGE0ODQ1M2IzOWM2In0sImlhdCI6MTcxOTcyMDcyOH0.0NFitg562s9FC1Gc6HvpWY9BPZQtSukFCOGRg1ECvZA'
      },
      body: JSON.stringify({ title, description, tag })
    })

    const json = await response.json();

    const note = await {
      "_id": json.id,
      "user": json.user,
      "title": title,
      "description": description,
      "tag": tag,
      "date": json.date,
      "__v": json.__v
    }
    setNotes(notes.concat(note))
  }

  //Delete note function
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ZTAyMGQzZjgxOGE0ODQ1M2IzOWM2In0sImlhdCI6MTcxOTcyMDcyOH0.0NFitg562s9FC1Gc6HvpWY9BPZQtSukFCOGRg1ECvZA'
      }
    });
    const json = response.json();
    console.log(json);

    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  //Edit a note function
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY3ZTAyMGQzZjgxOGE0ODQ1M2IzOWM2In0sImlhdCI6MTcxOTcyMDcyOH0.0NFitg562s9FC1Gc6HvpWY9BPZQtSukFCOGRg1ECvZA'
      },
      body: JSON.stringify({ title, description, tag })
    })

    const json = await response.json();
    console.log(json);
    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }

  }

  return (
    //whenever we wrap anything inside this context then automatically all children of props inside them can be accessed
    // here we are sending State and Update both in JS object
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;