"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Add_Note from "../add-note";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { any } from "joi";
import { useRouter } from "next/navigation";

export const init = { title: "", text1: "" };
function Note_overview({ notes }: any) {
  const router = useRouter();
  const [dataNote, setDataNote] = useState(init);
  const [openDailog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  async function AddNoteHandler() {
    setLoading(true);
    const res =
      currentNoteId === null
        ? await fetch("/api/add-notes", {
            method: "POST",
            body: JSON.stringify(dataNote),
          })
        : await fetch("/api/update-notes?id=" + currentNoteId, {
            method: "PUT",
            body: JSON.stringify(dataNote),
          });
    if (!res.ok) {
      const er = await res.json();
      setErrors(er.message);
      setLoading(false);
      return;
    }
    const result = await res.json();
    if (result.esuccess) {
      setDataNote(init);
      setOpenDialog(false);
      setLoading(false);
      setErrors(null);
      router.refresh();
    } else {
      setLoading(false);
      setErrors(result.message);
    }
  }
  const DelHandlerNote = async (id: any) => {
    try {
      const delRes = await fetch(`/api/del-note?id=${id}`, {
        method: "DELETE",
      });
      const result = await delRes.json();
      if (result.success) router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  const EditHandlerNote = (note: any) => {
    setCurrentNoteId(note._id);
    setDataNote({ title: note.title, text1: note.text });
    setOpenDialog(true);
  };
  
  useEffect(() => {
    router.refresh();
  }, [router]);
  return (
    <div className="flex flex-col bg-gradient-to-r from-purple-500 to-blue-500 min-h-screen">
      <div className="flex flex-col gap-5 p-6">
        <div className="">
          <Button onClick={() => setOpenDialog(true)}>Add New Note</Button>
          <Add_Note
            openDialog={openDailog}
            setOpenDialog={setOpenDialog}
            dataNote={dataNote}
            setDataNote={setDataNote}
            loading={loading}
            setLoading={setLoading}
            errors={errors}
            setErrors={setErrors}
            AddNoteHandler={AddNoteHandler}
            currentNoteId={currentNoteId}
            setCurrentNoteId={setCurrentNoteId}
          />
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl text-white font-extrabold">Notes list</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {notes && notes.length > 0
              ? notes.map((note: any) => (
                  <Card
                    key={note._id}
                    className="p-6 pb-1 m-2 transition-all hover:scale-[1.05]"
                  >
                    <CardContent className="flex flex-col gap-5">
                      <CardTitle>{note.title}</CardTitle>
                      <CardDescription>{note.text}</CardDescription>
                      <CardFooter className="flex gap-5">
                        <Button onClick={() => DelHandlerNote(note._id)}>
                          Delete
                        </Button>
                        <Button onClick={() => EditHandlerNote(note)}>
                          Edit
                        </Button>
                      </CardFooter>
                    </CardContent>
                  </Card>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Note_overview;
