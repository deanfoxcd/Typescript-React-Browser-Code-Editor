import MDEditor from '@uiw/react-md-editor';
import './text-editor.css';
import { editor } from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';

const TextEditor: React.FC = function () {
  const [editing, setEditing] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (
        editorRef.current &&
        e.target &&
        editorRef.current.contains(e.target as Node)
      ) {
        e.stopPropagation();
      } else setEditing(false);
    };

    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className='text-editor' ref={editorRef}>
        <MDEditor />
      </div>
    );
  }

  return (
    <div className='text-editor' onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={'# Header'} />
    </div>
  );
};

export default TextEditor;
