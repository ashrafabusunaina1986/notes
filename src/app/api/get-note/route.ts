import db from "@/dbConfig/db";
import Note from "@/models/note";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    await db();
    const notes = await Note.find();
    if (notes) return NextResponse.json({ success: true, notes:notes.reverse() });
    else return NextResponse.json({ success: false, message: "try again" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
