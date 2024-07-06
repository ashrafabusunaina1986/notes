"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { init } from "../note-overview";

function Add_Note({
  openDialog,
  setOpenDialog,
  loading,
  setLoading,
  dataNote,
  setDataNote,
  errors,
  setErrors,
  AddNoteHandler,
  currentNoteId,
  setCurrentNoteId,
}: any) {
  return (
    <Dialog
      open={openDialog}
      onOpenChange={() => {
        setOpenDialog(false);
        setDataNote(init);
        setCurrentNoteId(null);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentNoteId === null ? "Add New Note" : "Edit Note"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-5">
          {errors !== null && (
            <div className="bg-red-200 px-5 py-3 rounded-lg w-max shadow-sm shadow-red-500 ">
              {errors}
            </div>
          )}
          <Input
            name="title"
            id="title"
            value={dataNote.title}
            onChange={(e) =>
              setDataNote({ ...dataNote, title: e.target.value })
            }
            placeholder="Enter title"
          />
          <Textarea
            name="text"
            id="text"
            value={dataNote.text1}
            onChange={(e) =>
              setDataNote({ ...dataNote, text1: e.target.value })
            }
            placeholder="Enter Text"
            className=" resize-none"
          ></Textarea>
        </DialogDescription>
        <DialogFooter>
          <Button
            onClick={() => setOpenDialog(false)}
            className="bg-white border border-gray-950 text-blue-950 hover:text-white"
          >
            Cancel
          </Button>
          <Button onClick={AddNoteHandler}>
            {loading ? (
              <div className="w-6 h-6 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
            ) : (
              "Add"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Add_Note;
