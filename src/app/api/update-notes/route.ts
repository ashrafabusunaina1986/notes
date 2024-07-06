import { NextRequest, NextResponse } from "next/server";
import joi from "joi";

import db from "@/dbConfig/db";
import Note from "@/models/note";

const AddNewNote = joi.object({
  title: joi.string().required(),
  text1: joi.string().required(),
});
export const PUT = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const getId = searchParams.get("id");
    if (!getId)
      return NextResponse.json({
        success: false,
        message: "Note id is required",
      });
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

    const update_note = await Note.updateOne(
      { _id: getId },
      { title: title, text: text1 },
      { new: true }
    );

    if (update_note)
      return NextResponse.json({
        success: true,
        message: "Note is updated  ",
      });
    else
      return NextResponse.json({
        success: false,
        message: "Note is not updated",
      });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
