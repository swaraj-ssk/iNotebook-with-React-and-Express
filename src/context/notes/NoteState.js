//We want state which is accesible for all.
import { useState } from "react";
import NoteContext from "./noteContext"; //imported Note context

 const NoteState = (props)=>{
    const s1= {
        "name" :"Harry",
        "class" : "5b"
    }
    const [state, setState] = useState(s1);
    const update = ()=>{
        setTimeout(()=>{
            setState({
                "name" : "Swaraj",
                "class" : "10B"
            })
        }, 2000)
    }

    return (
        //whenever we wrap anything inside this context then automatically all children of props inside them can be accessed
        // here we are sending State and Update both in JS object
        <NoteContext.Provider value = {{state : state, update : update}}> 
            {props.children}
        </NoteContext.Provider>
    ) 
 }

 export default NoteState;