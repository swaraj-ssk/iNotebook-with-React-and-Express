import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import alertContext from '../context/notes/alertContext';


const AddNote = () => {

    const context = useContext(noteContext);
    const contextAlert = useContext(alertContext);
    const { addNote } = context;
    const {showAlert} = contextAlert;
    const [note, setNote] = useState ({title:"", description:"", tag:""});

    const textAdder = (e) =>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title:"", description:"", tag:""});
        showAlert("Added Successfully", "success")
    }
    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value})
    }
    return (
        <div className='container mt-4'>
            <h1>Add a Note</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required value={note.title}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required value={note.description}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} />
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary my-2" onClick={textAdder}>Add Note</button>
            </form>
 
        </div>
    ) 
}

export default AddNote
