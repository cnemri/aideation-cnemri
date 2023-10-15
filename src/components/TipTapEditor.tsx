"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TipTapMenuBar from "./TipTapMenuBar";
import { Button } from "./ui/button";
import { useDebounce } from "@/lib/useDebounce";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Text from "@tiptap/extension-text";
import { NoteType } from "@/lib/db/schema";
import { useCompletion } from "ai/react";

type Props = { note: NoteType };

const TipTapEditor = ({ note }: Props) => {
  const [editorState, setEditorState] = useState(
    note.editorState || `<h1>${note.name}</h1>`
  );
  const { mutate: saveNote, isLoading: isSavingNote } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/saveNote", {
        noteId: note.id,
        editorState: editorState,
      });
      return response.data;
    },
  });
  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });
  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-a": () => {
          // take last 30 words
          const prompt = this.editor.getHTML().split(" ").slice(-30).join(" ");
          complete(prompt);
          return true;
        },
      };
    },
  });
  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  const debounceEditorState = useDebounce(editorState, 500);

  useEffect(() => {
    if (debounceEditorState === "") return;
    saveNote(undefined, {
      onSuccess: () => {
        console.log("saved");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }, [debounceEditorState, saveNote]);

  const lastCompletion = useRef("");

  useEffect(() => {
    if (!completion || !editor) return;
    const diff = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;
    editor.commands.insertContent(diff);
  }, [completion, editor]);

  return (
    <>
      <div className="flex">
        {editor && <TipTapMenuBar editor={editor} />}
        <Button disabled variant={"outline"}>
          {isSavingNote ? "Saving..." : "Saved"}
        </Button>
      </div>
      <div className="prose prose-sm">
        <EditorContent editor={editor} />
      </div>
      <span className="text-sm">
        Tip: Press{"  "}
        <kbd className="px-2 py-1.5 text-xs text-semibold text-gray-800 bg-gray-200 rounded-lg">
          Shift + A
        </kbd>
        {"  "}
        for AI autocomplete
      </span>
    </>
  );
};

export default TipTapEditor;
