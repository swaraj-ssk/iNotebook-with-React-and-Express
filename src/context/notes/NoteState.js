//We want state which is accesible for all.
// import { useState } from "react";
import NoteContext from "./noteContext"; //imported Note context

 const NoteState = (props)=>{
    
    return (
        //whenever we wrap anything inside this context then automatically all children of props inside them can be accessed
        // here we are sending State and Update both in JS object
        <NoteContext.Provider> 
            {props.children}
        </NoteContext.Provider>
    ) 
 }

 export default NoteState;