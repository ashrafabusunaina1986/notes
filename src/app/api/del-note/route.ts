import db from "@/dbConfig/db";
import Note from "@/models/note";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const GetId = searchParams.get("id");
    if (GetId) {
      await db();
      const del = await Note.findByIdAndDelete({ _id: GetId });
      if (del)
        return NextResponse.json({ success: true, message: "note is deleted" });
      else return NextResponse.json({ success: false, message: "try again" });
    } else
      return NextResponse.json({
        success: false,
        message: "Node Id is required",
      });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message });
  }
};
