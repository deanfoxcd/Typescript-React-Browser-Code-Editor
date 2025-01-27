import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import * as esbuild from 'esbuild-wasm';

import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const el = document.getElementById('root');

const root = ReactDOM.createRoot(el!);

const App = () => {
  const ref = useRef<any>();
  const iframe = useRef<any>();
  const [input, setInput] = useState('');

  const startService = async function () {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
  }, []);

  async function handleClick() {
    if (!ref.current) return;

    // const result = await ref.current.transform(input, {
    //   loader: 'jsx',
    //   target: 'es2015',
    // });

    iframe.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });

    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  }

  const html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener(
            'message',
            (e) => {
              try {
                eval(e.data);
              } catch (err) {
                const root = document.getElementById('root');
                root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
                console.error(err)
              }
            },
            false
          );
        </script>
      </body>
    </html>
  `;

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <iframe
        title='preview'
        ref={iframe}
        srcDoc={html}
        sandbox='allow-scripts'
      />
    </div>
  );
};

root.render(<App />);
