import Note_overview from "@/components/note-overview";
import React from "react";
async function getNotes() {
  try {
    const apires = await fetch("http://localhost:3000/api/get-note",{
      method:'GET',
      cache:'no-store'
    });
    const result = await apires.json();
    return result.notes;
  } catch (error) {
    console.log(error);
  }
}
async function Notes() {
  const notes=await getNotes()
  return <Note_overview notes={notes}/>;
}

export default Notes;
