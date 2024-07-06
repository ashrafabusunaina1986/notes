import { NextRequest, NextResponse } from "next/server";
import joi from "joi";

import db from "@/dbConfig/db";
import Note from "@/models/note";

const AddNewNote = joi.object({
  title: joi.string().required(),
  text1: joi.string().required(),
});
export const POST = async (req: NextRequest) => {
  try {
    const argsReq = await req.json();
    const { title, text1 } = argsReq;
    await db();
    const { error } = AddNewNote.validate({
      title,
      text1,
    });
    if (error)
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });

    const New_note = await Note.create({ title: title, text: text1 });

    if (New_note)
      return NextResponse.json({
        success: true,
        message: "New note is added  ",
      });
    else
      return NextResponse.json({
        success: false,
        message: "new note is not added",
      });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
