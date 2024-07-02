import { createContext } from "react";

const noteContext = createContext(); //created new Context
// Context will hold all states related to notes
// we will hold state of note here so that no matter how much drilled down components are we can make these states available to them

export default noteContext;
// we could have written this in NoteState.js, but we wrote this here because we may separately need to export noteContext and NoteState.