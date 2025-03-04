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
import styles from "@/app/Editor.module.css";
import { Toolbar } from "./Toolbar";
import { useSelf } from "@/app/liveblocks.config";


// Collaborative text editor with simple rich text, live cursors, and live avatars
export function CollaborativeEditor() {
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
  // Set up editor with plugins
  const room=useRoom()
  const cardId=room.id;
  const userInfo = useSelf((me) => me.info);

  if(!userInfo){return;}

  const editor = useEditor({
    editorProps: {
      attributes: {
        // Add styles to editor element
        class: styles.editor,
      },
    },
    extensions: [
      StarterKit.configure({
        // The Collaboration extension comes with its own history handling
        history: false,
      }),
      Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
        placeholder: 'Task description...'
      }),
      // Register the document with Tiptap
      Collaboration.configure({
        document: doc,
        field:cardId,
      }),
      // Attach provider and user info
      CollaborationCursor.configure({
        provider: provider,
        user:userInfo,
      }),
      Underline.configure(),
    ],
  });

  return (
    <div className={styles.container}>
      <div className={styles.editorHeader}>
        <Toolbar editor={editor} />
      </div>
      <EditorContent editor={editor} className={styles.editorContainer} />
    </div>
  );
}