import Note_overview from "@/components/note-overview";
import React from "react";
async function getNotes() {
  try {
    const apires = await fetch("https://notes-murex-ten.vercele.app/api/get-note",{
      method:'GET',
      cache:'no-cache'
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
