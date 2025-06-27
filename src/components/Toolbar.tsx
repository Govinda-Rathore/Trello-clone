import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBold, faHeading, faItalic, faS, faUnderline } from "@fortawesome/free-solid-svg-icons";

type Props = {
  editor: Editor | null;
};

export function Toolbar({editor}:Props) {
  if (!editor) {
    return null;
  }

  return (
    <div className={"flex gap-1 mb-1 mt-2 toolbar-buttons" }>
      <button
        className={editor?.isActive('bold')? 'active':''}
        onClick={() => editor?.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        data-active={editor.isActive("bold") ? "is-active" : undefined}
        aria-label="bold"
      >
        <FontAwesomeIcon icon={faBold}/>
      </button>
      <button
        className={editor?.isActive('italic')? 'active':''}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        data-active={editor.isActive("italic") ? "is-active" : undefined}
        aria-label="italic"
      >
        <FontAwesomeIcon icon={faItalic}/>
      </button>
      <button
        className={editor?.isActive('underline')? 'active':''}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        data-active={editor.isActive("underline") ? "is-active" : undefined}
        aria-label="underlinethrough"
      >
        <FontAwesomeIcon icon={faUnderline}/>
        </button>
      <button
        className={editor?.isActive('strike')? 'active':''}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        data-active={editor.isActive("strike") ? "is-active" : undefined}
        aria-label="strikethrough"
      >
        <FontAwesomeIcon icon={faS}/>
      </button>
      <button
        className={editor?.isActive('heading')? 'active':''}
        onClick={() => editor.chain().focus().toggleHeading({level:2}).run()}
        disabled={!editor.can().chain().focus().toggleHeading({level:2}).run()}
        data-active={editor.isActive("heading") ? "is-active" : undefined}
        aria-label="headingthrough"
      >
        <FontAwesomeIcon icon={faHeading}/>
      </button>
    </div>
  );
}