//We want state which is accesible for all.
import { useState } from "react";
import NoteContext from "./noteContext"; //imported Note context

const NoteState = (props) => {

  const host = "http://localhost:7789"

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
          'auth-token': localStorage.getItem("token")
        }
      }
      )
      const json = await response.json();
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
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    })

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  //Delete note function
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("token")
      }
    });
    const json = response.json();
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
        'auth-token': localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    })

    const json = await response.json();
    //Logic to edit in client
    const newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        setNotes(newNotes);
        break;
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