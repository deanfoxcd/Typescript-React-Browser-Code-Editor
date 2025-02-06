import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { useEffect } from 'react';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { Cell } from '../state';
import CodeEditor from './code-editor';
import Preview from './Preview';
import Resizable from './resizable';
import './code-cell.css';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  const cumulativeCode = useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const totalCode = [
      `
        function show(value) {
          if (typeof value === 'object') {
            document.querySelector('#root').innerHTML = JSON.stringify(value);
          } else {
            document.querySelector('#root').innerHTML = value;
          }
        };
      `,
    ];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        totalCode.push(c.content);
      }
      if (c.id === cell.id) {
        console.log('break');
        break;
      }
    }

    // const codeCells = orderedCells.filter((cell) => cell.type === 'code');
    // const codeStrings = codeCells.map((cell) => cell.content);

    return totalCode;
  });
  console.log(cumulativeCode);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join('\n'));
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join('\n'));
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.id, cumulativeCode.join('\n')]);

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>

        <div className='progress-wrapper'>
          {!bundle || bundle.loading ? (
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max='100'>
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;

//
