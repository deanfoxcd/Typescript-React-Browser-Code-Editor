import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { StrictMode, useState } from 'react';
import ReactDOM from 'react-dom/client';
import CodeEditor from './code-editor';
import Preview from './Preview';
import bundle from '../bundler';
import Resizable from './resizable';

// const el = document.getElementById('root');

// const root = ReactDOM.createRoot(el!);

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const handleClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <Resizable direction='vertical'>
      <div>
        <CodeEditor
          initialValue='console.log(123)'
          onChange={(value) => setInput(value)}
        />
        <div>
          <button onClick={handleClick}>Submit</button>
        </div>
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;

//
