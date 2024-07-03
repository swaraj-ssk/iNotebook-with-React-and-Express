//We want state which is accesible for all.
import { useState } from "react";
import NoteContext from "./noteContext"; //imported Note context

const NoteState = (props) => {
  const data = [
    {
      "_id": "6680e1fc10eb6abd8d8c3e79",
      "user": "667e020d3f818a48453b39c6",
      "title": "My new list",
      "description": "Do some work",
      "tag": "todo",
      "date": "1719722492510",
      "__v": 0
    },
    {
      "_id": "6680e1fc10eb6abd8d8c3e80",
      "user": "667e020d3f818a48453b39c6",
      "title": "My new Title",
      "description": "Do damn work",
      "tag": "ok",
      "date": "1719722492511",
      "__v": 0
    },
    {
      "_id": "6680e1fc10eb6abd8d8c3e801",
      "user": "667e020d3f818a48453b39c6",
      "title": "My new Title",
      "description": "Do damn work",
      "tag": "ok",
      "date": "1719722492511",
      "__v": 0
    },
    {
      "_id": "6680e1fc10eb6abd8d8c3e802",
      "user": "667e020d3f818a48453b39c6",
      "title": "My new Title",
      "description": "Do damn work",
      "tag": "ok",
      "date": "1719722492511",
      "__v": 0
    },
    {
      "_id": "6680e1fc10eb6abd8d8c3e803",
      "user": "667e020d3f818a48453b39c6",
      "title": "My new Title",
      "description": "Do damn work",
      "tag": "ok",
      "date": "1719722492511",
      "__v": 0
    },
    {
      "_id": "6680e1fc10eb6abd8d8c3e804",
      "user": "667e020d3f818a48453b39c6",
      "title": "My new Title",
      "description": "Do damn work",
      "tag": "ok",
      "date": "1719722492511",
      "__v": 0
    },
    {
      "_id": "6680e1fc10eb6abd8d8c3e805",
      "user": "667e020d3f818a48453b39c6",
      "title": "My new Title",
      "description": "Do damn work",
      "tag": "ok",
      "date": "1719722492511",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(data)

  //Add note function
  const addNote = (title, description, tag)=>{
    // TODO: API Call
    let note = {
      "_id": "6680e1fc10eb6abd8d8c3e809",
      "user": "667e020d3f818a48453b39c6",
      "title": title, 
      "description": description,
      "tag": tag,
      "date": "1719722492511",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  //Delete note function
  const deleteNote = (id)=>{
    const newNotes = notes.filter((note)=>{ return note._id!==id});
    setNotes(newNotes);
  }

  //Edit a note function
  const editNote = ()=>{
    
  }

  return (
    //whenever we wrap anything inside this context then automatically all children of props inside them can be accessed
    // here we are sending State and Update both in JS object
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;