"use client";

import CreateNoteDialog from "@/components/CreateNoteDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserButton, auth } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { NoteType } from "@/lib/db/schema";
import axios from "axios";

type Props = {};

const DashboardPage = (props: Props) => {
  const [notes, setNotes] = React.useState([] as NoteType[]);
  useEffect(() => {
    const fetchNotes = async () => {
      const notesResponse = await axios.get("/api/getNotes/");
      const fetchedNotes = notesResponse.data;
      setNotes(fetchedNotes);
    };
    fetchNotes();
  }, []);
  return (
    <>
      <div className="bg-gradient-to-r from-rose-50 to-teal-50 min-h-screen">
        <div className="max-w-7xl mx-auto p-10">
          <div className="h-14"></div>
          <div className="flex justify-between items-center md:flex-row flex-col">
            <div className="flex items-center">
              <Link href="/">
                <Button className="bg-green-600" size="sm">
                  <ArrowLeft className="mr-1 w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div className="w-4"></div>
              <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
              <div className="w-4"></div>
              <UserButton />
            </div>
          </div>

          <div className="h-8"></div>
          <Separator />
          <div className="h-8"></div>
          {/* list all the notes */}
          {/* if no notes, display this */}
          {notes.length === 0 && (
            <div className="text-center">
              <h2 className="text-xl text-gray-500">You have no notes yet.</h2>
            </div>
          )}

          {/* display all the notes */}
          <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3">
            <CreateNoteDialog />
            {notes.map((note) => {
              return (
                <Link href={`/notebook/${note.id}`} key={note.id}>
                  <div className="border border-stone-300 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1">
                    <Image
                      width={400}
                      height={200}
                      alt={note.name}
                      src={note.imageUrl || ""}
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {note.name}
                      </h3>
                      <div className="h-1"></div>
                      <p className="text-sm text-gray-500">
                        {note.createdAt
                          ? new Date(note.createdAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
