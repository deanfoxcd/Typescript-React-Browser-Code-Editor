import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { StrictMode, useState } from 'react';
import ReactDOM from 'react-dom/client';
import CodeEditor from './components/code-editor';
import Preview from './components/Preview';
import bundle from './bundler';

const el = document.getElementById('root');

const root = ReactDOM.createRoot(el!);

const App = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const handleClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
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
  );
};

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
