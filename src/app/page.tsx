import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
<main className="flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 min-h-screen">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-3xl font-extrabold text-white">Explorer Notes</h1>
        <Link
          href={"/notes"}
          className="bg-white px-5 py-3 text-xl font-bold text-blue-800 shadow-slate-500 shadow-lg  rounded-lg"
        >
          Notes
        </Link>
        <div className=""></div>
      </div>
    </main>
  );
}
