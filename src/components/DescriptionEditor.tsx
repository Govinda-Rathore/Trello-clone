"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import Placeholder from "@tiptap/extension-placeholder"
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Underline from "@tiptap/extension-underline"
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { useRoom } from "@liveblocks/react";
// import { useRoom } from "@/liveblocks.config";/
import { useEffect, useState } from "react";
import { Toolbar } from "./Toolbar";
import { useSelf } from "@/app/liveblocks.config";


// Collaborative text editor with simple rich text, live cursors, and live avatars
export default function CollaborativeEditor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();


  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return <TiptapEditor doc={doc} provider={provider} />;
}

type EditorProps = {
  doc: Y.Doc;
  provider: any;
};
function TiptapEditor({ doc, provider }: EditorProps) {
  const room = useRoom();
  const cardId = room.id;
  const userInfo = useSelf((me) => me.info);

  // Always call hook — pass null when data isn't ready
  const editor = useEditor(
    userInfo
      ? {
          extensions: [
            StarterKit.configure({ history: false }),
            Placeholder.configure({
              emptyEditorClass: "is-editor-empty",
              placeholder: "Task description...",
            }),
            Collaboration.configure({
              document: doc,
              field: cardId,
            }),
            CollaborationCursor.configure({
              provider,
              user: userInfo,
            }),
            Underline.configure(),
          ],
        }
      : undefined // tells Tiptap to skip editor init
  );

  // Show loader until everything is ready
  if (!userInfo || !editor) {
    return null;
  }

  return (
    <div className="m-2">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
