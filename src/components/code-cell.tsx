import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useEffect, useState } from 'react';
import bundle from '../bundler';
import CodeEditor from './code-editor';
import Preview from './Preview';
import Resizable from './resizable';

// const el = document.getElementById('root');

// const root = ReactDOM.createRoot(el!);

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue='console.log(123)'
            onChange={(value) => setInput(value)}
          />
        </Resizable>

        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;

//
